import { GradientText, HeroAvatar, HeroSocial, Section } from 'astro-boilerplate-components';

const Hero = (): JSX.Element => (
	<Section>
		<HeroAvatar
			title={
				<>
					Hi there, I am <GradientText>Yendor</GradientText> 👋
				</>
			}
			description={
				<>
					My passion is programming and I absolutely love the challenge that game design presents.
					As long as it is challenging, and I am learning and improving, I will always be on board.
					<br />
					<br />
					You can find my blog at{' '}
					<a className="text-cyan-400 hover:underline" href="https://lecoqjacob.github.io/">
						lecoqjacob.github.io
					</a>
				</>
			}
			avatar={
				<img
					className="h-80 w-64"
					src="/assets/images/avatar.svg"
					alt="Avatar image"
					loading="lazy"
				/>
			}
			socialButtons={
				<>
					<a href="https://www.linkedin.com/in/jacob-lecoq/">
						<HeroSocial src="/assets/images/linkedin-icon.png" alt="Linkedin icon" />
					</a>
				</>
			}
		/>
	</Section>
);

export { Hero };
