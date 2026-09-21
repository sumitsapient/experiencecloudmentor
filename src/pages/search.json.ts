import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const [posts, courses] = await Promise.all([getCollection('blog'), getCollection('courses')]);

  const items = [
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
