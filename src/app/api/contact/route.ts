import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Simple in-memory rate limiter per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5; // max requests per window
const buckets = new Map<string, number[]>();

function getIP(req: NextRequest) {
  const xf = req.headers.get('x-forwarded-for');
  if (xf) return xf.split(',')[0].trim();
  const xr = req.headers.get('x-real-ip');
  if (xr) return xr.trim();
  return '0.0.0.0';
}

function rateLimit(ip: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const arr = buckets.get(ip) || [];
  const fresh = arr.filter((t) => t > windowStart);
  if (fresh.length >= RATE_LIMIT_MAX) return false;
  fresh.push(now);
  buckets.set(ip, fresh);
  return true;
}

async function verifyRecaptcha(token: string | undefined, ip: string) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return { ok: true } as const; // not enforced if not configured
  if (!token) return { ok: false, reason: 'missing_token' } as const;
  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);
  body.set('remoteip', ip);
  const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!resp.ok) return { ok: false, reason: 'recaptcha_http_error' } as const;
  const json = (await resp.json()) as any;
  const min = Number(process.env.RECAPTCHA_MIN_SCORE || '0.5');
  if (json.success !== true) return { ok: false, reason: 'recaptcha_failed' } as const;
  if (typeof json.score === 'number' && json.score < min) return { ok: false, reason: 'low_score', score: json.score } as const;
  return { ok: true } as const;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, message, website, captchaToken } = body || {};

    // Basic size limits to avoid abuse
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return Response.json({ error: 'invalid_payload' }, { status: 400 });
    }
    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return Response.json({ error: 'payload_too_large' }, { status: 413 });
    }

    // Rate limit per IP
    const ip = getIP(req);
    if (!rateLimit(ip)) {
      return Response.json({ error: 'rate_limited' }, { status: 429 });
    }

    // Honeypot
    if (website) {
      return Response.json({ ok: true }, { status: 200 });
    }

    if (!name || !email || !message) {
      return Response.json({ error: 'missing_fields' }, { status: 400 });
    }
    if (!isValidEmail(String(email))) {
      return Response.json({ error: 'invalid_email' }, { status: 400 });
    }
    if (String(message).trim().length < 10) {
      return Response.json({ error: 'message_too_short' }, { status: 400 });
    }

    // Verify reCAPTCHA (mandatory in production)
    const recaptchaConfigured = !!process.env.RECAPTCHA_SECRET;
    const cap = await verifyRecaptcha(captchaToken, ip);
    if (!cap.ok || (process.env.NODE_ENV === 'production' && !recaptchaConfigured)) {
      return Response.json({ error: 'captcha_failed' }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO = process.env.CONTACT_TO_EMAIL || 'tshitshob@gmail.com';
    const subject = `Nouveau message portfolio — ${name}`;
    const html = `
      <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height:1.6;">
        <h2 style="margin:0 0 12px;">Nouveau message de contact</h2>
        <p style="margin:0 0 8px;"><strong>Nom:</strong> ${escapeHtml(String(name))}</p>
        <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(String(email))}</p>
        <p style="margin:12px 0 8px;"><strong>Message:</strong></p>
        <div style="white-space:pre-wrap;background:#f6f7f9;border:1px solid #e5e7eb;padding:12px;border-radius:8px;color:#111827;">${escapeHtml(String(message))}</div>
      </div>
    `;
    
    // Prefer Resend if configured; otherwise try SMTP (Nodemailer)
    if (RESEND_API_KEY) {
      const FROM = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM,
          to: [TO],
          subject,
          html,
          reply_to: String(email),
        }),
      });
      if (!resp.ok) {
        // Hide provider error details in production
        if (process.env.NODE_ENV === 'production') {
          return Response.json({ error: 'send_failed' }, { status: 502 });
        }
        const text = await resp.text();
        return Response.json({ error: 'resend_failed', detail: text }, { status: 502 });
      }
      return Response.json({ ok: true });
    } else {
      // SMTP using Nodemailer — env mapping supports Laravel-style vars
      const SMTP_HOST = process.env.SMTP_HOST || process.env.MAIL_HOST;
      const SMTP_PORT = Number(process.env.SMTP_PORT || process.env.MAIL_PORT || 587);
      const SMTP_USER = process.env.SMTP_USER || process.env.MAIL_USERNAME;
      const SMTP_PASS = process.env.SMTP_PASS || process.env.MAIL_PASSWORD;
      const MAIL_ENCRYPTION = String(process.env.MAIL_ENCRYPTION || '').toLowerCase();
      const SMTP_SECURE = process.env.SMTP_SECURE
        ? String(process.env.SMTP_SECURE).toLowerCase() === 'true'
        : (MAIL_ENCRYPTION === 'ssl' || SMTP_PORT === 465);
      const VERIFY_PEER = (process.env.MAIL_STREAM_SSL_VERIFY_PEER ?? 'true') !== 'false';
      const FROM_NAME = process.env.MAIL_FROM_NAME || 'Portfolio';
      const FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS || SMTP_USER || 'no-reply@example.com';
      const FROM = `${FROM_NAME} <${FROM_ADDRESS}>`;

      if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        return Response.json(
          { error: 'missing_email_config', detail: 'Configure RESEND_API_KEY or SMTP (MAIL_HOST, MAIL_USERNAME, MAIL_PASSWORD).' },
          { status: 500 }
        );
      }

      let nodemailer: any = null;
      try {
        nodemailer = (await import('nodemailer')).default ?? (await import('nodemailer'));
      } catch (_) {
        return Response.json(
          { error: 'nodemailer_not_installed', detail: 'Run: npm i nodemailer' },
          { status: 500 }
        );
      }

      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE, // true for 465, false for 587
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        requireTLS: MAIL_ENCRYPTION === 'tls' || SMTP_PORT === 587,
        tls: {
          // honor Laravel-style SSL flags
          rejectUnauthorized: VERIFY_PEER,
        },
        logger: process.env.NODE_ENV !== 'production' && String(process.env.SMTP_DEBUG || '').toLowerCase() === 'true',
        debug: process.env.NODE_ENV !== 'production' && String(process.env.SMTP_DEBUG || '').toLowerCase() === 'true',
      });

      try {
        // Optional verify to catch auth/TLS issues early
        await transporter.verify();
        await transporter.sendMail({
          from: FROM,
          to: TO,
          subject,
          html,
          replyTo: String(email),
        });
        return Response.json({ ok: true });
      } catch (e) {
        if (process.env.NODE_ENV === 'production') {
          return Response.json({ error: 'send_failed' }, { status: 502 });
        }
        return Response.json({ error: 'smtp_failed', detail: String(e) }, { status: 502 });
      }
    }
  } catch (e) {
    return Response.json({ error: 'unknown', detail: String(e) }, { status: 500 });
  }
}
