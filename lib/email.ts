import { Resend } from 'resend';
import { env } from '@/lib/env';

const resend = new Resend(env.RESEND_API_KEY);

export type EmailTemplate = 'verification' | 'reset-password' | 'welcome';

interface SendEmailOptions {
  to: string;
  template: EmailTemplate;
  data: Record<string, any>;
}

const templates: Record<EmailTemplate, (data: any) => { subject: string, html: string }> = {
  verification: (data) => ({
    subject: 'Verify your email address',
    html: `
      <h1>Welcome to Garments Buying House</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${data.verificationUrl}">Verify Email</a>
      <p>Link expires in 24 hours.</p>
    `
  }),
  'reset-password': (data) => ({
    subject: 'Reset your password',
    html: `
      <h1>Reset Your Password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${data.resetUrl}">Reset Password</a>
      <p>Link expires in 1 hour.</p>
    `
  }),
  welcome: (data) => ({
    subject: 'Welcome to Garments Buying House',
    html: `
      <h1>Welcome ${data.name}!</h1>
      <p>Thank you for joining Garments Buying House.</p>
      <p>You can now:</p>
      <ul>
        <li>Browse our product catalog</li>
        <li>Request samples</li>
        <li>Place orders</li>
      </ul>
    `
  })
};

export async function sendEmail({ to, template, data }: SendEmailOptions) {
  const { subject, html } = templates[template](data);

  try {
    await resend.emails.send({
      from: 'Garments Buying House <noreply@garmentsbuyinghouse.com>',
      to,
      subject,
      html
    });
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}