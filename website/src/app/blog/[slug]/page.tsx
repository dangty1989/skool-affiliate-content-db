import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Markdown from 'react-markdown';
import Link from 'next/link';
import matter from 'gray-matter';

const BASE_URL = 'https://skool-machine.vercel.app';

// Function to get post content by slug
const getPostContent = (slug: string) => {
    const folder = path.join(process.cwd(), 'content', 'blog');
    const file = `${folder}/${slug}.md`;

    if (!fs.existsSync(file)) {
        return null;
    }

    const content = fs.readFileSync(file, 'utf-8');
    const matterResult = matter(content);
    return matterResult;
};

// Generate static params for Vercel static export
export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), 'content', 'blog');

    if (!fs.existsSync(postsDirectory)) return [];

    const filenames = fs.readdirSync(postsDirectory);
    return filenames.map((filename) => ({
        slug: filename.replace('.md', ''),
    }));
}

// Dynamic metadata for SEO
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await props.params;
    const post = getPostContent(slug);
    const title = post?.data?.title || slug.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ');
    const description = post?.data?.description || `AI affiliate marketing insights: ${title}`;
    const date = post?.data?.date || slug.substring(0, 10);
    const dateStr = typeof date === 'string' ? date : new Date(date).toISOString();

    return {
        title: `${title} | AI Affiliate Hub`,
        description,
        authors: [{ name: 'Dang Ty', url: BASE_URL }],
        metadataBase: new URL(BASE_URL),
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
            type: 'article',
            url: `${BASE_URL}/blog/${slug}`,
            title,
            description,
            siteName: 'AI Affiliate Hub',
            publishedTime: dateStr,
            authors: ['Dang Ty'],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;
    const post = getPostContent(slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404 - Post Not Found</h1>
                    <Link href="/blog" className="text-primary hover:underline">← Back to Blog</Link>
                </div>
            </div>
        );
    }

    const title = post.data?.title || slug.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ');
    const description = post.data?.description || '';
    const date = post.data?.date || slug.substring(0, 10);
    const dateStr = typeof date === 'string' ? date : new Date(date).toISOString();

    // BlogPosting Schema for AI crawlers
    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${BASE_URL}/blog/${slug}`,
        "headline": title,
        "description": description,
        "datePublished": dateStr,
        "dateModified": dateStr,
        "url": `${BASE_URL}/blog/${slug}`,
        "author": {
            "@type": "Person",
            "@id": `${BASE_URL}/#person`,
            "name": "Dang Ty",
            "jobTitle": "AI Affiliate Marketing Expert",
            "url": BASE_URL
        },
        "publisher": {
            "@type": "Organization",
            "@id": `${BASE_URL}/#organization`,
            "name": "AI Affiliate Hub",
            "url": BASE_URL
        },
        "isPartOf": {
            "@type": "Blog",
            "@id": `${BASE_URL}/blog`,
            "name": "AI Affiliate Hub Blog",
            "url": `${BASE_URL}/blog`
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${BASE_URL}/blog/${slug}`
        },
        "inLanguage": "en-US",
        "keywords": [
            "AI affiliate marketing",
            "Skool affiliate",
            "AI automation",
            "affiliate marketing strategies",
            "HeyGen",
            "ElevenLabs",
            "Make automation"
        ]
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4">
            {/* BlogPosting Schema - "Mắt Thần" cho AI crawlers */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />

            <article className="max-w-3xl mx-auto">
                <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    ← Back to all posts
                </Link>

                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight capitalize">
                    {title}
                </h1>

                {dateStr && (
                    <p className="text-blue-400 font-mono text-sm mb-8">
                        <time dateTime={dateStr}>{dateStr}</time>
                    </p>
                )}

                {/* Markdown Content Wrapper */}
                <div className="prose prose-invert prose-lg max-w-none 
                    prose-headings:text-white prose-a:text-primary hover:prose-a:text-blue-400
                    prose-strong:text-white prose-code:text-yellow-400 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-gray-800">
                    <Markdown>{post.content}</Markdown>
                </div>

                {/* Footer CTA */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="bg-secondary p-6 rounded-xl border border-gray-800 text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Ready to master AI SEO?</h3>
                        <p className="text-gray-400 mb-4">Join the Skool community and start building your empire today.</p>
                        <a
                            href="https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
                        >
                            Join Skool Now →
                        </a>
                    </div>
                </div>
            </article>
        </div>
    );
}
