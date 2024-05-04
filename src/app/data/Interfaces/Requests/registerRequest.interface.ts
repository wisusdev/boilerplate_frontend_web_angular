export interface RegisterRequestInterface {
	data: {
		type: string | 'users';
		attributes: {
			username: string;
			first_name: string;
			last_name: string;
			email: string;
			password: string;
			password_confirmation: string;
		};
	};
}
