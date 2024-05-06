export interface ProfileUpdateRequestInterface {
	data: {
		type: string;
		id: string;
		attributes: {
			first_name: string;
			last_name: string;
			email: string;
			avatar: string;
			language: string;
		};
	};
}
