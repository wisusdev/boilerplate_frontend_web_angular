export interface LogoutDeviceAuthResponseInterface {
	data: {
		type: string;
		attributes: {
			status: boolean;
			message: string;
		}
	}
}

