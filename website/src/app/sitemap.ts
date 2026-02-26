import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://skool-machine.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
    // Static pages
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ];

    // Dynamic blog posts
    const blogDir = path.join(process.cwd(), 'content', 'blog');

    if (!fs.existsSync(blogDir)) {
        return staticRoutes;
    }

    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));

    const blogRoutes: MetadataRoute.Sitemap = files.map((filename) => {
        const slug = filename.replace('.md', '');
        // Parse date from filename (format: YYYY-MM-DD-slug)
        const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
        const lastModified = dateMatch ? new Date(dateMatch[1]) : new Date();

        return {
            url: `${BASE_URL}/blog/${slug}`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.7,
        };
    });

    return [...staticRoutes, ...blogRoutes];
}
