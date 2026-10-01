import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
import {routing} from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

// Com localeDetection: false (i18n/routing.jsx), os redirects do next-intl
// são todos de normalização (/pt/contactos → /contactos, /en/contactos →
// /en/contacts) — mas saem como 307. Passam a 308 para o Google consolidar
// os sinais na URL final, tal como o redirect de trailing slash do Next.
export default function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);
  if (response.status === 307 && response.headers.has('location')) {
    return new Response(null, {status: 308, headers: response.headers});
  }
  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}
