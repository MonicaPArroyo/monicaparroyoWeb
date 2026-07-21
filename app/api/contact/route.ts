import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
	let body: Record<string, unknown>;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
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

	const apiKey = process.env.RESEND_API_KEY;

	// No key yet → succeed without delivering so the form works end-to-end in dev.
	if (!apiKey) {
		console.warn('[contact] RESEND_API_KEY not set — message received but not sent:', {
			name,
			email,
			title,
		});
		return NextResponse.json({ ok: true, delivered: false });
	}

	try {
		const { Resend } = await import('resend');
		const resend = new Resend(apiKey);
		await resend.emails.send({
			from: process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>',
			to: process.env.CONTACT_TO ?? 'monicaparroyo7@gmail.com',
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
