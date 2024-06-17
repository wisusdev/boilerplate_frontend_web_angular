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

export interface PackageData {
	type: string;
	id: string;
	attributes: PackageAttributes;
}

export interface ShowPackageResponseInterface {
	data: PackageData;
}
