export interface authUserModel {
	data: {
		type: string;
		id: string;
		attributes: {
			user: {
				first_name: string;
				last_name: string;
				username: string;
				email: string;
				avatar: string;
				language: string;
			};
			token: string;
		};
	}
}
