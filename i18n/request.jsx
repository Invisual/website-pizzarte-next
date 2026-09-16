import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return {
        locale,
        messages: {
            home: (await import(`../messages/${locale}/home.json`)).default,
            menu: (await import(`../messages/${locale}/menu.json`)).default,
            pizzarte: (await import(`../messages/${locale}/pizzarte.json`)).default,
            contact: (await import(`../messages/${locale}/contact.json`)).default,
        }
    };
});
