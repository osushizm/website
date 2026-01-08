import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { siteConfig } from '../utils/site';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog', ({ data }) => !data.draft);

  const sortedPosts = blog.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: `${siteConfig.name} - ブログ`,
    description: 'フルスタックエンジニアの技術ブログ',
    site: context.site || siteConfig.url,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: `<language>ja</language>`,
  });
}
