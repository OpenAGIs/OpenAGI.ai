import { getCollection } from 'astro:content';
import { conceptSeries } from '../data/concepts';
import { resources } from '../data/resources';
import { getFeedItems } from '../data/feed';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const feedItems = await getFeedItems();

  const blogItems = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    url: `/blog/${post.slug}/`,
    category: 'Blog',
    tags: post.data.tags || [],
  }));

  const conceptItems = conceptSeries.flatMap((series) =>
    series.topics.map((topic) => ({
      title: topic.title,
      description: topic.summary,
      url: `/concepts#${series.id}-${topic.id}`,
      category: `Concepts · ${series.title}`,
      tags: topic.tags || [],
    }))
  );

  const resourceItems = resources.map((resource) => ({
    title: resource.name,
    description: resource.description,
    url: `/resources#${resource.id}`,
    category: 'Resources',
    tags: resource.tags,
  }));

  const feed = feedItems.map((item) => ({
    title: item.title,
    description: item.summary,
    url: item.link,
    category: `Feed · ${item.source}`,
    tags: [item.source],
  }));

  const payload = [...blogItems, ...conceptItems, ...resourceItems, ...feed];

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
