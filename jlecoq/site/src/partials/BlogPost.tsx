import type { IFrontmatter } from 'astro-boilerplate-components';
import { PostContent, PostHeader, Section } from 'astro-boilerplate-components';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

interface IBlogPostProps {
	frontmatter: IFrontmatter;
	children: ReactNode;
}

const BlogPost = (props: IBlogPostProps): JSX.Element => (
	<Section>
		<PostHeader content={props.frontmatter} author={AppConfig.author} />

		<PostContent content={props.frontmatter}>{props.children}</PostContent>
	</Section>
);

export { BlogPost };
