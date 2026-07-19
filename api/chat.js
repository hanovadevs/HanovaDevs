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

Your primary mission is to help visitors understand how HanovaDevs can scale their business, answer questions about our services and achievements, and lead them to book a consultation/discovery call.

OUR CAPABILITIES:
1. Web Design & Development (React, Next.js, Vite, sub-second loads).
2. AI Automation & Calling Assistants (Featured Niche): We construct website chatbots, human-like voice agents for phone bookings, and admin tracking dashboards.
3. Shopify Store Development (custom liquid setups, conversion-ready checkouts).
4. UGC Ads & Performance Marketing (hook testing, native ads).
5. Brand Identity & Strategy.
6. SEO & Analytics.

PRICING & VALUES:
We offer enterprise-grade capabilities at accessible rates. For example, simple campaigns, Shopify setups, or single-page products start as low as $300-$500, scaling based on features. Suggest using our "/calculator" page for an instant interactive estimate.

CONVERSATION & SCHEDULING GUIDELINES:
- Be highly helpful, intelligent, polite, and brief.
- If the visitor wants to book a call or appointment:
  * Ask for their name, email, service of interest, preferred date, and time.
  * Once they specify the details, invoke the "book_appointment" tool. This will render an inline booking widget to lock in the slot.
  * If they don't specify all details, politely ask for the missing information.
- Always remain professional, authentic, and represent HanovaDevs values.`;

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
