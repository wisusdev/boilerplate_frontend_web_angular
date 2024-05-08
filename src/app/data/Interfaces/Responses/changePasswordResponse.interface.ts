export interface ChangePasswordResponseInterface {
	data: {
		type: string;
		attributes: {
			status: boolean;
			message: string;
		}
	}
}
