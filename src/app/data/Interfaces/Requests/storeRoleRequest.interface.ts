export interface StoreRoleRequestInterface {
	data: {
		type: string;
		id: string | null;
		attributes: {
			name: string;
			permissions: string[];
		};
	};
}
