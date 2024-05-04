export interface RegisterResponseInterface {
	data: {
		type: string;
		attributes: {
			status: boolean;
			message: string;
		};
	};
}
