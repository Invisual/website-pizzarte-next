import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    // Cada JSON tem uma chave de topo com o próprio nome (ex: home.json ->
    // { "home": {...} }, herdado tal e qual dos locales/ do Gatsby). Sem o
    // ".home"/".menu"/... aqui, o namespace ficaria com dupla imbricação
    // (t("home.seo.title") em vez de t("seo.title")) — o mesmo bug que já
    // existia no starter com "global.global.menu".
    return {
        locale,
        messages: {
            home: (await import(`../messages/${locale}/home.json`)).default.home,
            menu: (await import(`../messages/${locale}/menu.json`)).default.menu,
            pizzarte: (await import(`../messages/${locale}/pizzarte.json`)).default.pizzarte,
            contact: (await import(`../messages/${locale}/contact.json`)).default.contact,
            legal: (await import(`../messages/${locale}/legal.json`)).default.legal,
        }
    };
});
