import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.pt";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Site";

// Ficheiro AIO (llmstxt.org) servido como route handler em vez de estático
// (public/llms.txt no starter apontava para "Ponto Urbano" e "example.pt" —
// nunca lia NEXT_PUBLIC_SITE_URL por ser um ficheiro estático). Assim lê o
// domínio real em runtime — ver .repowiki/SEO, GEO & AIO/Sitemap, Robots & llms.txt.md.
export function GET() {
  const body = `# ${SITE_NAME}

> Restaurante de pizza e cozinha italiana em Aveiro, Portugal, desde 1989. Bar, esplanada e espaço para eventos.

A Pizzarte é uma pizzaria em Aveiro com três décadas de existência, conhecida pelas suas pizzas, massas, saladas, crepes e sobremesas, e por um bar com cocktails de autor. O espaço tem capacidade para 200 pessoas e é também usado para eventos (torneios de xadrez, concertos, teatro).

## Facts
- Morada: R. Engº Von Haff, 27, 3800-177 Aveiro
- Telefone: +351 234 427 103
- Horário: Dom a Qui 12h00-01h00; Sex e Sáb 12h00-01h30
- Reservas: só para grupos de 10 ou mais pessoas, por telefone
- Takeaway: por telefone, app Pizzarte Takeaway (iOS/Android) ou shop.pizzarte.pt
- Categorias do menu: entradas, saladas, massas, crepes salgados, crepes wrap, pizzas, panne di pizza, sobremesas, bebidas
- Xadrez: presente desde 1988, tabuleiro do artista Pedro Andrade
- Bar: aberto desde 1989, cocktails e gins de autor

## Main sections
- [Homepage](${BASE_URL}/): Apresentação do restaurante e destaques do menu
- [Menu](${BASE_URL}/menu): Ementa completa por categoria (entradas, saladas, massas, pizzas, crepes, sobremesas, bebidas)
- [A Pizzarte](${BASE_URL}/pizzarte): História, espaço e torneios de xadrez
- [Galeria](${BASE_URL}/galeria): Fotos do espaço, bar e eventos
- [Contactos](${BASE_URL}/contactos): Morada, telefone, horário, localização e perguntas frequentes (FAQ)

## Languages
- Português (padrão): ${BASE_URL}/
- English: ${BASE_URL}/en/
- Français: ${BASE_URL}/fr/
- Español: ${BASE_URL}/es/

## Optional
- [Sitemap](${BASE_URL}/sitemap.xml)
`;

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
