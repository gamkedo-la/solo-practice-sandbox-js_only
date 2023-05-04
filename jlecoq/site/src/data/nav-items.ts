export interface NavItemDescriptor {
	title: string;
	href: string;
}

const navItems: NavItemDescriptor[] = [
	{
		title: 'Blogs',
		href: '/posts',
	},
	{
		title: 'GitHub',
		href: 'https://github.com/lecoqjacob',
	},
];

export { navItems };
