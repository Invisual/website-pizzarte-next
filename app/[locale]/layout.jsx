import '../globals.css'

import { MenuProvider } from "../../utils/menuProvider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from '../../i18n/routing';
import { notFound } from "next/navigation";
import Menu from "../../components/Menu";
import { NuqsAdapter } from "nuqs/adapters/next";
import { getCachedMessages } from "../../lib/cache";
import { buildOrganizationSchema, buildLocalBusinessSchema, buildWebSiteSchema } from "../../lib/jsonld";

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getCachedMessages(locale);

  const menu = messages.global.global.menu;

  return (
    <html lang={locale}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteSchema()) }} />
        {/* <GoogleTagManager gtmId="GTM-W4QJ8Q2L" />
        <GoogleAnalytics gaId="G-LQ5PM7CWH9" /> */}
        <NuqsAdapter>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <MenuProvider >
              {/* SEU HEAD E FOOTER AQUI */}
              <Menu
                menu={menu}
                locale={locale}
              />

              {children}
            </MenuProvider>
          </NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
