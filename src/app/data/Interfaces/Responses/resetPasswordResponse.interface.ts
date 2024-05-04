export interface ResetPasswordResponseInterface {
	data: {
		type: string;
		attributes: {
			status: boolean;
			message: string;
		};
	};
}
