import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

const urlBase: string = 'http://todoist.test/api';

@Injectable({
	providedIn: 'root'
})
export class BackendService {

	constructor(private http: HttpClient) {
	}

	register(data: any) {
		return this.http.post(urlBase + '/auth/register', data);
	}

	login(data: any) {
		return this.http.post(urlBase + '/auth/login', data);
	}
}
