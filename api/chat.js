// Vercel Serverless Function: api/chat.js
// Proxies chatbot messages securely to Anthropic's Claude API

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, bookedSlots } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages body' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn('ANTHROPIC_API_KEY not configured. Falling back to simulation mode.');
    return res.status(200).json({ 
      simulated: true,
      message: "Please configure your ANTHROPIC_API_KEY in the Vercel or local environment."
    });
  }

  // Construct active bookings context
  let bookingsContext = "";
  if (bookedSlots && Array.isArray(bookedSlots)) {
    const activeBookings = bookedSlots.filter(b => b.status !== 'cancelled');
    if (activeBookings.length > 0) {
      bookingsContext = "\n\nCURRENTLY BOOKED/UNAVAILABLE SLOTS:\n" + 
        activeBookings.map(b => `- Date: ${b.date}, Time: ${b.time}`).join('\n') +
        "\nUse this list to check slot availability in real time. If a user asks for one of these slots, politely inform them it is already booked and suggest alternatives.";
    } else {
      bookingsContext = "\n\nAll dates and times are currently available for booking.";
    }
  }

  const SYSTEM_PROMPT = `You are Aria, the official AI Guide & Scheduling Consultant for HanovaDevs, a premium digital product studio and marketing agency founded by Ali Haider.

Your primary mission is to help visitors understand how HanovaDevs can scale their business, answer questions about our services (AI Automation, Web Design, Shopify development, UGC Ads, Branding, SEO), and lead them to book a consultation/discovery call.

CONVERSATION & SCHEDULING GUIDELINES:
- Be highly professional, helpful, polite, and brief. Keep answers under 2-3 sentences.
- DO NOT display any calendar UI or tell the user to use a calendar panel. Bookings are handled 100% conversationally inside this chat by you asking questions step-by-step.
- If the user wants to book or schedule a call, ask for their details one-by-one:
  1. Full Name (e.g. "Great! Let's schedule a discovery call. May I start with your full name?")
  2. Email Address
  3. Service Area they are interested in
  4. Preferred Date (YYYY-MM-DD) and Time Slot (e.g., 09:00, 10:00, 11:00, 12:00, 14:00, 15:00, 16:00, 17:00).
- REAL-TIME AVAILABILITY: Refer to the "CURRENTLY BOOKED/UNAVAILABLE SLOTS" context provided below. If the user asks for a slot that is already in that list, state that it is taken and propose another time.
- TOOL CALLING: Once you have gathered the Name, Email, Service, Date, and Time, IMMEDIATELY call the "book_appointment" tool with these parameters to lock it in the database.
- If they ask about pricing, mention our basic web layouts, Shopify setups, and UGC ad testing packages start from around $300-$500, scaling with custom complexity. Advise checking out our "/calculator" page for an interactive estimate.${bookingsContext}

OUR SERVICES MATRIX:
1. AI Automation & Calling Assistants (Featured Niche): We construct website chatbots, human-like voice agents for phone bookings, and admin tracking dashboards.
2. Web Design & Development (React, Next.js, Vite, sub-second loads).
3. Shopify Store Development (custom liquid setups, conversion-ready checkouts).
4. UGC Ads & Performance Marketing (hook testing, native ads).
5. Brand Identity & Strategy.
6. SEO & Analytics.`;

  // Format and sanitize messages for Anthropic Claude (which mandates alternating user/assistant roles starting with a user message)
  const firstUserIdx = messages.findIndex(m => m.role === 'user');
  if (firstUserIdx === -1) {
    return res.status(400).json({ error: 'At least one user message is required to initiate conversation.' });
  }

  const rawSequence = messages.slice(firstUserIdx);
  const cleanMessages = [];

  for (const msg of rawSequence) {
    const role = msg.role === 'user' ? 'user' : 'assistant';
    const content = typeof msg.content === 'string' ? msg.content : '';

    if (cleanMessages.length > 0 && cleanMessages[cleanMessages.length - 1].role === role) {
      cleanMessages[cleanMessages.length - 1].content += '\n' + content;
    } else {
      cleanMessages.push({ role, content });
    }
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: cleanMessages,

        tools: [
          {
            name: 'book_appointment',
            description: 'Schedules a client discovery call or consultation meeting when they have provided their name, email, preferred date, time, and service.',
            input_schema: {
              type: 'object',
              properties: {
                name: { type: 'string', description: 'The client\'s full name' },
                email: { type: 'string', description: 'The client\'s email address' },
                phone: { type: 'string', description: 'The client\'s phone number (optional)' },
                service: { 
                  type: 'string', 
                  enum: ['web-design', 'shopify-development', 'social-media', 'ugc-ads', 'seo', 'branding', 'software-development', 'digital-advertising', 'graphic-design', 'ai-automation'],
                  description: 'The service they are interested in' 
                },
                date: { type: 'string', description: 'The preferred date (YYYY-MM-DD format)' },
                time: { type: 'string', description: 'The preferred time slot (HH:MM format)' },
                message: { type: 'string', description: 'Any custom requests or message notes' },
                budget: { type: 'string', description: 'The client\'s budget estimation' }
              },
              required: ['name', 'email', 'date', 'time', 'service']
            }
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API response error:', errorText);
      return res.status(502).json({ error: 'Claude API responded with an error', details: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Serverless function chat error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
