import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  return rss({
    title: 'ExperienceCloudMentor Blog',
    description: 'Practical write-ups on AEM, EDS, RTCDP, AJO, and Adobe Target from certified practitioners.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      author: post.data.author,
      categories: post.data.tags,
      link: `/blog/${post.data.slug}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
