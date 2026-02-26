import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Allow all good AI & search crawlers
            {
                userAgent: '*',
                allow: '/',
            },
            // Explicitly allow major AI crawlers for GEO
            {
                userAgent: 'GPTBot',
                allow: '/',
            },
            {
                userAgent: 'Claude-Web',
                allow: '/',
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
            {
                userAgent: 'bingbot',
                allow: '/',
            },
            {
                userAgent: 'Applebot',
                allow: '/',
            },
        ],
        sitemap: 'https://skool-machine.vercel.app/sitemap.xml',
        host: 'https://skool-machine.vercel.app',
    };
}
