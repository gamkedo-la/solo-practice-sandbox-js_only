import { FooterCopyright, Section } from 'astro-boilerplate-components';

import { AppConfig } from '@/utils/AppConfig';

const Footer = (): JSX.Element => (
	<Section>
		<FooterCopyright site_name={AppConfig.site_name} />
	</Section>
);

export { Footer };
