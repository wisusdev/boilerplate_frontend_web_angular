export interface ForgotPasswordResponseInterface {
	data: {
		type: string;
		attributes: {
			status: boolean;
			message: string;
		};
	};
}
