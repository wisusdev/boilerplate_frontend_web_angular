export interface Territorio {
	id: string;
	nombre: string;
}

export interface Pais {
	id: string;
	nombre: string;
	territorios: Territorio[];
}

export interface WompiPaisesResponse {
	[key: string]: Pais;
}
