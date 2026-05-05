import { Request, Response } from "express";
import sgMail from '@sendgrid/mail';
import expandOnNews from '../services/expandedNews.service.js';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const formatEmailHtml = (content: string): string => {
  const paragraphs = content
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      // Style label lines like "Title:", "Summary:", etc.
      if (/^Title:/i.test(line.trim())) {
        return `<p style="margin: 24px 0 8px 0; font-family: 'Courier New', monospace; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #00ff9d; border-left: 2px solid #00ff9d; padding-left: 10px; font-weight: 700;">${line}</p>`;
      }
      if (/^(Summary|For a non-technical audience):/i.test(line.trim())) {
        return `<p style="margin: 16px 0 8px 0; font-family: 'Courier New', monospace; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #00ff9d; border-left: 2px solid #00ff9d; padding-left: 10px;">${line}</p>`;
      }
      return `<p style="margin: 0 0 16px 0; line-height: 1.8; color: #cbd5e1; font-family: Georgia, serif; font-size: 15px;">${line}</p>`;
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin:0; padding:0; background:#060c18; font-family: Georgia, serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(160deg, #060c18 0%, #0a1628 100%); padding: 48px 0;">
          <tr>
            <td align="center">
              <table width="620" cellpadding="0" cellspacing="0" style="border-radius:2px; overflow:hidden; border: 1px solid #1e3a5f; box-shadow: 0 0 40px rgba(0,255,157,0.07), 0 0 80px rgba(0,120,255,0.05);">

                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #020b18 0%, #071428 100%); padding: 32px 40px; border-bottom: 1px solid #0f2a4a; position: relative;">
                    <!-- Top accent bar -->
                    <div style="position:absolute; top:0; left:0; right:0; height:3px; background: linear-gradient(90deg, #00ff9d, #0078ff, #7c3aed);"></div>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin:0 0 4px 0; font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 4px; color: #00ff9d; text-transform: uppercase;">// DAILY BRIEFING</p>
                          <h1 style="margin:0 0 4px 0; color:#e2f0ff; font-family: 'Courier New', monospace; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">The Latest in Tech from Rayat</h1>
                          <p style="margin:0; color:#4a7098; font-size:12px; font-family: 'Courier New', monospace; letter-spacing: 2px;">YOUR DAILY TECH SUMMARY</p>
                        </td>
                        <td align="right" valign="top">
                          <p style="margin:0; font-family:'Courier New', monospace; font-size:10px; color:#1e4a6e; letter-spacing:1px;">${new Date().toISOString().split('T')[0]}</p>
                          <p style="margin:4px 0 0 0; font-family:'Courier New', monospace; font-size:10px; color:#00ff9d; opacity:0.5;">◉ LIVE</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Divider row with circuit effect -->
                <tr>
                  <td style="background:#04101e; padding: 0 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #0f2a4a;">
                          <p style="margin:0; font-family:'Courier New', monospace; font-size:9px; color:#1e3a5f; letter-spacing:3px;">━━━ SIGNAL ACQUIRED ━━━ PROCESSING ━━━</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="background: linear-gradient(180deg, #04101e 0%, #060c18 100%); padding: 36px 40px;">
                    ${paragraphs}
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="background:#04101e; padding: 0 40px;">
                    <div style="height:1px; background: linear-gradient(90deg, transparent, #0f2a4a 20%, #0f2a4a 80%, transparent);"></div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#020b18; padding: 20px 40px; border-top: 1px solid #0a1e33;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin:0; font-family:'Courier New', monospace; font-size:10px; color:#1e4a6e; letter-spacing:2px;">The Latest in Tech from Rayat © ${new Date().getFullYear()}</p>
                        </td>
                        <td align="right">
                          <p style="margin:0; font-family:'Courier New', monospace; font-size:10px; color:#1e4a6e; letter-spacing:1px;">UNSUBSCRIBE</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Bottom accent bar -->
                <tr>
                  <td style="height:3px; background: linear-gradient(90deg, #7c3aed, #0078ff, #00ff9d);"></td>
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
      subject: 'Latest Tech Updates from Ray',
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
