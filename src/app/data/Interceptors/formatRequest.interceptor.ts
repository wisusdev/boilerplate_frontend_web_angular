import {HttpInterceptorFn} from '@angular/common/http';

export const formatRequestInterceptor: HttpInterceptorFn = (req, next) => {

	let cloneRequest = req.clone();

	if (req.body !== null && typeof req.body === 'object') {

		let requestBody = {...req.body as any};
		const requestType = requestBody.type;
		delete requestBody.type;

		if (req.method === 'POST') {
			const body = {
				data: {
					type: requestType,
					attributes: requestBody
				}
			}

			cloneRequest = req.clone({
				body: body
			});
		}

		if (req.method === 'PATCH' || req.method === 'PUT') {
			const requestId = requestBody.id;
			delete requestBody.id;

			const body = {
				data: {
					type: requestType,
					id: requestId,
					attributes: requestBody
				}
			}

			cloneRequest = req.clone({
				body: body
			});
		}
	}

	return next(cloneRequest);
};
