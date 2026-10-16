import type { APIRoute, GetStaticPaths } from 'astro';
import { navigation } from '../data/links';
export const getStaticPaths: GetStaticPaths = () => import.meta.env.SITE_URL ? [{ params: { sitemap: 'sitemap' } }] : [];
export const GET: APIRoute = ({ site }) => {
  if (!site) return new Response(null, { status: 404 });
  const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const urls = [...navigation.map(item => item.href), '/lo-que-creemos/', '/links/'].map(path => `<url><loc>${escape(new URL(path, site).href)}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
