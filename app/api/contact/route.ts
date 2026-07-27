import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const LIMITS = { name: 120, email: 160, title: 160, message: 5000 };

export async function POST(req: Request) {
	let body: Record<string, unknown>;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
	}

	// Honeypot: `company` is a hidden field no human sees or fills. If it has
	// content the sender is a bot — pretend success and drop the message.
	if (String(body.company ?? '').trim() !== '') {
		return NextResponse.json({ ok: true, delivered: false });
	}

	const name = String(body.name ?? '').trim();
	const email = String(body.email ?? '').trim();
	const title = String(body.title ?? '').trim();
	const message = String(body.message ?? '').trim();

	if (!name || !email || !title || !message) {
		return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
	}
	if (!EMAIL_RE.test(email)) {
		return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
	}
	// Reject oversized payloads (spam / abuse / accidental giant paste).
	if (
		name.length > LIMITS.name ||
		email.length > LIMITS.email ||
		title.length > LIMITS.title ||
		message.length > LIMITS.message
	) {
		return NextResponse.json({ error: 'too_long' }, { status: 400 });
	}

	const apiKey = process.env.RESEND_API_KEY;
	const to = process.env.CONTACT_TO;

	// Not configured (no key or no destination) → accept but don't deliver, so the
	// form still works end-to-end in dev. No PII is logged.
	if (!apiKey || !to) {
		console.warn(
			'[contact] not configured (RESEND_API_KEY / CONTACT_TO) — accepted, not delivered',
		);
		return NextResponse.json({ ok: true, delivered: false });
	}

	try {
		const { Resend } = await import('resend');
		const resend = new Resend(apiKey);
		await resend.emails.send({
			from: process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>',
			to,
			replyTo: email,
			subject: `[Portfolio] ${title}`,
			text: `From: ${name} <${email}>\n\n${message}`,
		});
		return NextResponse.json({ ok: true, delivered: true });
	} catch (err) {
		console.error('[contact] send failed', err);
		return NextResponse.json({ error: 'send_failed' }, { status: 500 });
	}
}
