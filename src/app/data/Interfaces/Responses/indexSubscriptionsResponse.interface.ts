export interface IndexSubscriptionsResponseInterface {
    data: SubscriptionData[];
    links: Links;
    meta: Meta;
}

export interface SubscriptionData {
	type: string;
	id: string;
	attributes: SubscriptionAttributes;
	relationships: Relationships;
}

export interface SubscriptionAttributes {
	start_date: string;
	end_date: string;
	trial_ends_at: string | null;
	package_price: string;
	package_details: string;
	payment_method: string;
	payment_transaction_id: string;
	status: string;
}

export interface Relationships {
	user: User;
	createBy: User;
	package: Package | null;
}

export interface User {
	type: string;
	id: string;
	attributes: UserAttributes;
}

export interface UserAttributes {
	username: string;
	first_name: string;
	last_name: string;
	email: string;
}

export interface Package {
	type: string;
	id: string;
	attributes: PackageAttributes;
}

export interface PackageAttributes {
	name: string;
	description: string;
	max_users: number;
	interval: string;
	interval_count: number;
	price: string;
	trial_days: number;
	active: number;
	created_by: string;
	created_at: string;
	updated_at: string;
}

export interface Links {
	first: string;
	last: string;
	prev: string | null;
	next: string | null;
}

export interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	links: MetaLink[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}

export interface MetaLink {
	url: string | null;
	label: string;
	active: boolean;
}
