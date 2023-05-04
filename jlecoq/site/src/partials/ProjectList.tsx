import { GradientText, Project, Section, Tags } from 'astro-boilerplate-components';

import { projects } from '@/data/projects';

const ProjectList = (): JSX.Element => (
	<Section
		title={
			<>
				Recent <GradientText>Projects</GradientText>
			</>
		}
	>
		<div className="flex flex-col gap-6">
			{projects.map((project, i) => (
				<Project
					key={i}
					img={project.img}
					link={project.link}
					name={project.title}
					description={project.description}
					category={
						<>
							{project.tags.map((tag, j) => (
								<Tags key={j} color={tag.color}>
									{tag.title}
								</Tags>
							))}
						</>
					}
				/>
			))}
		</div>
	</Section>
);

export { ProjectList };
