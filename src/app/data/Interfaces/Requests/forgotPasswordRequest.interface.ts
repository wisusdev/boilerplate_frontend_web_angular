export interface ForgotPasswordRequestInterface {
	data: {
		type: string,
		attributes: {
			email: string
		}
	}
}
