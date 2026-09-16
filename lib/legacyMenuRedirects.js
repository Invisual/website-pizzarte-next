// Redirects 301 das URLs antigas geradas pelo Gatsby (gatsby-node.js criava
// `/{lang}/menu/{slugPT}` mesmo para en/fr/es, porque não traduzia o slug de
// categoria — só o prefixo de idioma). Preenchido em build-image-manifest-like
// step a partir de messages/{locale}/menu.json — ver Fase 4 do plano de migração.
// Formato: { source, destination, permanent: true }
module.exports = [];
