import type { APIRoute } from 'astro';
import { site as content } from '../data/site';
export const GET: APIRoute = ({ site }) => new Response(`User-agent: *\n${content.publicationApproved ? 'Allow: /' : 'Disallow: /'}\n${site && content.publicationApproved ? `Sitemap: ${new URL('/sitemap.xml', site).href}\n` : ''}`, { headers: { 'Content-Type': 'text/plain' } });
