export function formatDate(date?: string, locale = 'es') {
	if (!date) return '';
	try {
		return new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}).format(new Date(date));
	} catch {
		return date;
	}
}
