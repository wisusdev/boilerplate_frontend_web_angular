export interface ShowRoleResponseInterface {
	data: {
		type: string;
		id: string;
		name: string;
		permissions: Permission[];
	};
}

export interface Permission {
	name: string;
}
