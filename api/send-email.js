// Vercel Serverless Function: api/send-email.js
// Dispatches a highly styled HTML Google Meet invitation to client upon booking approval

import nodemailer from 'nodemailer';

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

  const { to, name, date, time, timezone, service, meetLink, type } = req.body;

  const isRequestEmail = type === 'request' || !meetLink;

  if (!to || !name || !date || !time || !service) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  if (!isRequestEmail && !meetLink) {
    return res.status(400).json({ error: 'Missing meetLink for approval email' });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn('EMAIL_USER or EMAIL_PASS not configured.');
    return res.status(500).json({ 
      error: 'SMTP credentials missing. Please configure EMAIL_USER and EMAIL_PASS in environment.' 
    });
  }

  // Set up Gmail SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  const prettyService = service.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());

  // HTML Template
  const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${isRequestEmail ? 'Discovery Call Received' : 'Consultation Confirmed'} — HanovaDevs</title>
  <style>
    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #334155;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      background-color: #f8fafc;
      padding: 40px 20px;
    }
    .container {
      max-width: 580px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
    }
    .header {
      background: linear-gradient(135deg, #1A3EE8 0%, #3B82F6 100%);
      padding: 35px 30px;
      text-align: center;
    }
    .logo-text {
      color: #ffffff;
      font-size: 24px;
      font-weight: 800;
      margin: 0 0 8px 0;
      letter-spacing: -0.02em;
    }
    .header h1 {
      color: rgba(255, 255, 255, 0.95);
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      font-size: 20px;
      color: #0f172a;
      margin-top: 0;
      font-weight: 700;
    }
    .content p {
      font-size: 15px;
      line-height: 1.6;
      color: #475569;
      margin-bottom: 20px;
    }
    .details-box {
      background-color: #f5f7ff;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #1A3EE8;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .detail-row {
      display: flex;
      margin-bottom: 12px;
      font-size: 14px;
    }
    .detail-row:last-child {
      margin-bottom: 0;
    }
    .detail-label {
      width: 110px;
      color: #64748b;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.05em;
    }
    .detail-value {
      color: #0f172a;
      font-weight: 600;
    }
    .notice-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1e40af;
      padding: 14px 18px;
      border-radius: 8px;
      font-size: 13px;
      line-height: 1.5;
      margin-top: 24px;
    }
    .btn-wrap {
      text-align: center;
      margin: 32px 0 10px 0;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #1A3EE8 0%, #3B82F6 100%);
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 36px;
      font-weight: 700;
      font-size: 14px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(26, 62, 232, 0.2);
    }
    .footer {
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
    }
    .footer p {
      margin: 0 0 8px 0;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo-text">HanovaDevs</div>
        <h1>${isRequestEmail ? 'Discovery Call Request Received ⚡' : 'Consultation Confirmed 🎉'}</h1>
      </div>
      <div class="content">
        <h2>Hello ${name},</h2>
        ${isRequestEmail ? `
          <p>Thank you for scheduling a discovery call with HanovaDevs! We have successfully registered your request.</p>
          <p>Our engineering team is reviewing your project details. <strong>A dedicated Google Meet link will be shared with you soon</strong> in a follow-up email once your slot is confirmed.</p>
        ` : `
          <p>Your discovery call with HanovaDevs has been approved! We are excited to meet you and discuss how we can partner to scale your systems and accelerate digital growth.</p>
        `}
        
        <div class="details-box">
          <div class="detail-row">
            <div class="detail-label">Service Area:</div>
            <div class="detail-value">${prettyService}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Date:</div>
            <div class="detail-value">${date}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Time Slot:</div>
            <div class="detail-value">${time} (${timezone || 'UTC'})</div>
          </div>
        </div>
        
        ${isRequestEmail ? `
          <div class="notice-box">
            📬 <strong>Spam Folder Reminder:</strong> Please check your <strong>Spam</strong> or <strong>Promotions</strong> folder just in case our emails land there! Add <code>hanovadevs@gmail.com</code> to your contacts to ensure you receive your Google Meet room link.
          </div>
        ` : `
          <p>Please click the button below to join the virtual call at your scheduled time. We recommend joining from a quiet space with your webcam enabled:</p>
          <div class="btn-wrap">
            <a href="${meetLink}" class="btn" target="_blank">Join Google Meet Call 🚀</a>
          </div>
        `}
      </div>
      <div class="footer">
        <p>This is an automated email from HanovaDevs for your requested consultation slot.<br>If you need to make changes, please reply to this email or reach us at hanovadevs@gmail.com.</p>
        <p>© 2026 HanovaDevs. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  try {
    const emailSubject = isRequestEmail
      ? `Discovery Call Request Received — HanovaDevs (${prettyService})`
      : `Confirmed: Consultation with HanovaDevs (${prettyService})`;

    await transporter.sendMail({
      from: `"HanovaDevs" <${emailUser}>`,
      to,
      subject: emailSubject,
      html: htmlTemplate
    });

    return res.status(200).json({ 
      success: true, 
      message: isRequestEmail ? 'Initial booking email sent successfully.' : 'Confirmation email dispatched successfully.' 
    });
  } catch (error) {
    console.error('SMTP sendMail error:', error);
    return res.status(502).json({ error: 'Failed to send email', details: error.message });
  }
}
