'use client';

import {
	Button,
	FieldError,
	Form,
	Input,
	Label,
	TextArea,
	TextField,
} from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
	const t = useTranslations('contact.form');
	const [status, setStatus] = useState<Status>('idle');

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = e.currentTarget; // capture before await (event is pooled)
		const fd = new FormData(form);
		const payload = {
			name: fd.get('name'),
			email: fd.get('email'),
			title: fd.get('title'),
			message: fd.get('message'),
		};

		setStatus('sending');
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			if (!res.ok) throw new Error('request failed');
			form.reset();
			setStatus('success');
		} catch {
			setStatus('error');
		}
	}

	return (
		<Form className="flex flex-col gap-4" onSubmit={onSubmit}>
			<div className="grid gap-4 sm:grid-cols-2">
				<TextField isRequired name="name">
					<Label>{t('name')}</Label>
					<Input placeholder={t('namePlaceholder')} />
					<FieldError />
				</TextField>

				<TextField
					isRequired
					name="email"
					type="email"
					validate={(value) => (EMAIL_RE.test(value) ? null : t('invalidEmail'))}
				>
					<Label>{t('email')}</Label>
					<Input placeholder="tu@correo.com" />
					<FieldError />
				</TextField>
			</div>

			<TextField isRequired name="title">
				<Label>{t('title')}</Label>
				<Input placeholder={t('titlePlaceholder')} />
				<FieldError />
			</TextField>

			<TextField isRequired name="message">
				<Label>{t('message')}</Label>
				<TextArea className="min-h-32" placeholder={t('messagePlaceholder')} />
				<FieldError />
			</TextField>

			<div className="flex items-center gap-3">
				<Button
					type="submit"
					isDisabled={status === 'sending'}
					className="bg-accent-solid text-accent-solid-foreground"
				>
					{status === 'sending' ? t('sending') : t('send')}
				</Button>
				{status === 'success' && (
					<span className="text-sm text-success">{t('success')}</span>
				)}
				{status === 'error' && (
					<span className="text-sm text-danger">{t('error')}</span>
				)}
			</div>
		</Form>
	);
}
