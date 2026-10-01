import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { isPublished } from '../utils/posts';
import { getTopicGuide, slugifyTag } from '../utils/tags';

export const GET: APIRoute = async () => {
  const [allPosts, courses] = await Promise.all([getCollection('blog'), getCollection('courses')]);
  const posts = allPosts.filter((post) => isPublished(post.data.publishDate));
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))];

  const items = [
    ...tags.map((tag) => {
      const slug = slugifyTag(tag);
      const guide = getTopicGuide(slug, tag);
      return {
        type: 'Guide',
        title: guide.title,
        description: guide.description,
        url: `/blog/tags/${slug}/`,
        tags: [tag],
      };
    }),
    ...posts.map((post) => ({
      type: 'Blog',
      title: post.data.title,
      description: post.data.description,
      url: `/blog/${post.data.slug}/`,
      tags: post.data.tags,
    })),
    ...courses.map((course) => ({
      type: 'Course',
      title: course.data.title,
      description: course.data.tagline,
      url: `/courses/${course.data.slug}/`,
      tags: [course.data.category],
    })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
};
