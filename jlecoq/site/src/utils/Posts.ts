import type { IFrontmatter, MarkdownInstance } from 'astro-boilerplate-components';

export const sortByDate = (
	posts: Array<MarkdownInstance<IFrontmatter>>,
): Array<MarkdownInstance<IFrontmatter>> => {
	return posts.sort(
		(a, b) => new Date(b.frontmatter.pubDate).valueOf() - new Date(a.frontmatter.pubDate).valueOf(),
	);
};
