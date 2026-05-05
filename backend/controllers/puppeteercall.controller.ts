import { Request, Response } from "express";
import sgMail from '@sendgrid/mail';
import expandOnNews from '../services/expandedNews.service.js';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const formatEmailHtml = (content: string): string => {
  const paragraphs = content
    .split('\n')
    .filter(line => line.trim())
    .map(line => `<p style="margin: 0 0 16px 0; line-height: 1.6;">${line}</p>`)
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /></head>
      <body style="margin:0; padding:0; background:#f4f4f4; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
                <tr>
                  <td style="background:#0f172a; padding: 24px 32px;">
                    <h1 style="margin:0; color:#ffffff; font-size:22px;">TechNews For You</h1>
                    <p style="margin:4px 0 0 0; color:#94a3b8; font-size:13px;">Your daily tech summary</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px; color:#1e293b; font-size:15px;">
                    ${paragraphs}
                  </td>
                </tr>
                <tr>
                  <td style="background:#f8fafc; padding: 16px 32px; color:#94a3b8; font-size:12px; text-align:center;">
                    You're receiving this because you subscribed to TechNews For You.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

const puppeteerControllerCall = async (req: Request, res: Response) => {
  try {
    const data = await expandOnNews();
    if (!data) {
      throw new Error('No data fetched');
    }

    const msg = {
      to: process.env.SENDGRID_TO_EMAIL!,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: 'Your Daily Tech News Summary',
      text: data,
      html: formatEmailHtml(data),
    };

    await sgMail.send(msg);

    return res.status(200).send({ message: 'Email sent successfully', TechNews: data });
  } catch (error) {
    console.error('Error in puppeteerControllerCall:', error);
    return res.status(500).send({ message: 'Failed to fetch news or send email' });
  }
};

export default puppeteerControllerCall;
