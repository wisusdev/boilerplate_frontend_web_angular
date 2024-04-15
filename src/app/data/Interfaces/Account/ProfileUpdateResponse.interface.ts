export interface profileUpdateResponse {
	data: {
		type: string;
		id: string;
		attributes: {
			first_name: string;
			last_name: string;
			username: string;
			email: string;
			avatar: string;
			language: string;
		};
	};
}
