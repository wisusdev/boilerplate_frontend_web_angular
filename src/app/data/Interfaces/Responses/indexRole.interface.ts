export interface IndexRoleInterface {
	data: Role[];
	links: Links;
	meta: Meta;
}

interface Role {
	type: string;
	id: string;
	name: string;
	permissions: Permission[];
}

interface Permission {
	name: string;
}

interface Links {
	first: string;
	last: string;
	prev: null | string;
	next: null | string;
}

interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	links: MetaLink[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}

interface MetaLink {
	url: null | string;
	label: string;
	active: boolean;
}
