export interface loginRequestInterface {
	data: {
		type: string;
		attributes: {
			email: string;
			password: string;
		};
	};
}
