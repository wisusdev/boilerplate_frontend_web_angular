export interface IndexUserResponseInterface {
    data: UserData[];
    links: Links;
    meta: Meta;
}

export interface UserData {
    type: string;
    id: string;
    attributes: Attributes;
    relationships: Relationships;
}

export interface Attributes {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string | null;
	password: string | null;
	password_confirmation: string | null;
    created_at: string;
    updated_at: string;
}

export interface Relationships {
    roles: string[];
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
