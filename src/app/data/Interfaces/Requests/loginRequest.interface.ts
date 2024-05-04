export interface LoginRequestInterface {
	data: {
		type: string | 'users';
		attributes: {
			email: string;
			password: string;
		};
	};
}
