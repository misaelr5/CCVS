import type { APIRoute, GetStaticPaths } from 'astro';
import { site } from '../data/site';
// Sin dominio aprobado no se emite un sitemap con URLs ficticias.
export const getStaticPaths: GetStaticPaths = () => import.meta.env.SITE_URL ? [{ params: { sitemap: 'sitemap' } }] : [];
export const GET: APIRoute = ({ site: origin }) => {
  if (!origin) return new Response('Configurar SITE_URL con el dominio aprobado.', { status: 404 });
  const routes = [...site.nav.map(item => item.href), '/links/'];
  const urls = routes.map(path => `<url><loc>${new URL(path, origin).href.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
