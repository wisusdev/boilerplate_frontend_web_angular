export interface ResetPasswordRequestInterface {
    data: {
		type: string;
		attributes: {
			token: string;
			password: string;
			password_confirmation: string;
		}
    }
}
