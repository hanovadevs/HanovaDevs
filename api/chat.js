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

  const { messages } = req.body;
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

  const SYSTEM_PROMPT = `You are Aria, the official AI Guide & Scheduling Consultant for HanovaDevs, a premium digital product studio and marketing agency founded by Ali Haider.

Your primary mission is to help visitors understand how HanovaDevs can scale their business, answer questions about our services (AI Automation, Web Design, Shopify development, UGC Ads, Branding, SEO), and lead them to book a consultation/discovery call.

CONVERSATION & SCHEDULING GUIDELINES:
- Be highly professional, helpful, polite, and brief. Keep answers under 3-4 sentences when possible.
- IMPORTANT: As soon as the user expresses interest in booking, scheduling, or scheduling a call, IMMEDIATELY call the "book_appointment" tool. Fill in any parameters you already know (like name, email, or service).
- DO NOT wait for them to supply all data (name, email, date, time) in chat before calling the tool. Calling the tool will instantly open the interactive calendar booking panel on the right side of the chat widget, allowing them to select slots visually!
- If the tool is active, politely guide them to select their preferred date/time slot on the calendar panel.
- If they ask about pricing, mention our simple single-page builds, basic Shopify setups, and UGC ad test packs start from around $300-$500, scaling based on custom needs. Advise checking out our "/calculator" page for an instant interactive estimate.

OUR SERVICES MATRIX:
1. AI Automation & Calling Assistants (Featured Niche): We construct website chatbots, human-like voice agents for phone bookings, and admin tracking dashboards.
2. Web Design & Development (React, Next.js, Vite, sub-second loads).
3. Shopify Store Development (custom liquid setups, conversion-ready checkouts).
4. UGC Ads & Performance Marketing (hook testing, native ads).
5. Brand Identity & Strategy.
6. SEO & Analytics.`;

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
        messages: messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
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
