import { ColorTags } from 'astro-boilerplate-components';
import { type Values } from 'astro-boilerplate-components/dist/esm/types/types/TypeUnion';

export interface TagDescriptor {
	title: string;
	color: Values<typeof ColorTags>;
}

export interface ProjectDescriptor {
	title: string;
	link: string;
	description: string;
	tags: TagDescriptor[];
	img: { src: string; alt: string };
}

const projects: ProjectDescriptor[] = [
	{
		tags: [
			{
				title: 'Astro.js',
				color: ColorTags.FUCHSIA,
			},
			{
				title: 'Web design',
				color: ColorTags.LIME,
			},
			{
				title: 'Tailwind.css',
				color: ColorTags.SKY,
			},
			{
				title: 'TypeScript',
				color: ColorTags.ROSE,
			},
		],
		link: '/',
		description: ``,
		title: 'Test Project',
		img: { src: '/assets/images/project-web-design.png', alt: 'Project Web Design' },
	},
];

export { projects };
