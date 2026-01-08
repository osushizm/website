export function getAllTags(posts: Array<{ data: { tags: string[] } }>): string[] {
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.data.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getPostsByTag(posts: Array<{ data: { tags: string[] } }>, tag: string) {
  return posts.filter((post) => post.data.tags.includes(tag));
}

export function getTagCounts(posts: Array<{ data: { tags: string[] } }>): Record<string, number> {
  const counts: Record<string, number> = {};
  posts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return counts;
}

export function getRelatedPosts<T extends { data: { tags: string[] } }>(
  currentPost: T,
  allPosts: T[],
  limit: number = 3
): T[] {
  const currentTags = currentPost.data.tags;
  
  const scored = allPosts
    .filter((post) => post !== currentPost)
    .map((post) => {
      const commonTags = post.data.tags.filter((tag) => currentTags.includes(tag));
      return { post, score: commonTags.length };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
  
  return scored.slice(0, limit).map(({ post }) => post);
}
