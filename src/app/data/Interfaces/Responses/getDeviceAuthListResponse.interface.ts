export interface GetDeviceAuthListResponseInterface {
	data: Device[];
	links: {
		first: string;
		last: string;
		prev: string | null;
		next: string | null;
	};
	meta: Meta;
}

export interface DeviceAttributes {
	device_id: string | null;
	platform: string | null;
	platform_version: string | null;
	app_version: string | null;
	language: string | null;
	timezone: string | null;
	created_at: string | null;
	updated_at: string | null;
}

export interface Device {
	type: string;
	id: string;
	attributes: DeviceAttributes;
}

export interface Link {
	url: string | null;
	label: string;
	active: boolean;
}

export interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	links: Link[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}

