import '../globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from '../../i18n/routing';
import { notFound } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next";
import { getCachedMessages } from "../../lib/cache";
import { buildOrganizationSchema, buildRestaurantSchema, buildWebSiteSchema } from "../../lib/jsonld";
import StyledRegistry from "../../lib/StyledRegistry";
import { montserrat, britishRegular, chunkyRosie } from "../fonts";

// Mesmos dois sistemas de analytics do site Gatsby (GTM + gtag.js GA4
// direto — redundantes entre si, mas mantidos tal como estavam em produção
// para não perder histórico de nenhum dos dois dashboards).
const GTM_ID = "GTM-5H4V228";
const GA_MEASUREMENT_ID = "G-EJNDSQMG4C";
const COOKIEYES_SRC =
  "https://cdn-cookieyes.com/client_data/31310dca5b10a15079bcadff/script.js";

// Enumera os 4 locales para o segmento [locale] — sem isto nenhuma rota
// desta árvore pode ser pré-renderizada estaticamente (o Gatsby original
// era 100% estático; o starter não tinha generateStaticParams nenhum).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getCachedMessages(locale);

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${britishRegular.variable} ${chunkyRosie.variable}`}
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildRestaurantSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteSchema()) }} />

        {/* Consent Mode tem de existir ANTES do GTM/gtag carregarem, por
            isso corre inline e cedo (beforeInteractive), tal como no site
            antigo. Default: tudo negado até o CookieYes atualizar o consentimento. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied'});
            gtag('set', 'ads_data_redaction', true);`}
        </Script>
        {/* GTM e gtag.js (~500KB entre ambos + tags do GTM: Meta Pixel, Ads)
            passam a lazyOnload — arrancam quando o browser está idle depois
            do evento load, em vez de competirem com a hidratação (eram a
            maior parte das "tarefas longas" e do TBT no Lighthouse). O
            dataLayer e o Consent Mode acima já existem, por isso nenhum
            evento se perde; só chegam ~1-3s mais tarde. O snippet é o
            oficial do GTM (o <GoogleTagManager> de @next/third-parties
            só suporta afterInteractive). */}
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
        <Script id="cookieyes" src={COOKIEYES_SRC} strategy="afterInteractive" />

        <StyledRegistry>
          <NuqsAdapter>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
          </NuqsAdapter>
        </StyledRegistry>
      </body>
    </html>
  );
}
