const api_url: string = 'http://localhost:8000/api';
const api_version: string = '/v1';

export const Api = {
	api_url: api_url,
	api_version: api_version,
	api_url_v1: `${api_url}${api_version}`,
	headers: {
		'Content-Type': 'application/vnd.api+json',
		'Accept': 'application/vnd.api+json',
	},
}
