export interface Package {
	type: string;
	id: string;
	attributes: {
		name: string;
		description: string;
		limits: string;
		interval: string;
		interval_count: number;
		price: string;
		trial_days: number;
		active: boolean;
		created_at: string;
		updated_at: string;
	};
}

interface Link {
	url: string | null;
	label: string;
	active: boolean;
}

interface Links {
	first: string;
	last: string;
	prev: string | null;
	next: string | null;
}

interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	links: Link[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}

export interface IndexPackageRequestInterface {
	data: Package[];
	links: Links;
	meta: Meta;
}
