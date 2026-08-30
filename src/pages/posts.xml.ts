import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  const publishedPosts = posts
    .filter((post) => !post.data.draft && post.data.date)
    .sort((a, b) => new Date(b.data.date!).getTime() - new Date(a.data.date!).getTime());

  return rss({
    title: 'max ostapenko',
    description: 'Data Product Management | Max Ostapenko',
    site: context.site || 'https://maxostapenko.com',
    items: publishedPosts.map((post) => {
      const slug = post.id.replace(/\/index$/, '');
      return {
        title: post.data.title,
        pubDate: new Date(post.data.date!),
        description: post.data.description || '',
        link: `/posts/${slug}/`,
        categories: post.data.categories || [],
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
