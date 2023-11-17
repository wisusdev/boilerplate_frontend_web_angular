import {Injectable} from '@angular/core';

const urlBase: string = 'http://todoist.test/api';

@Injectable({
	providedIn: 'root'
})
export class TokenService {

	constructor() {
	}

	handle(token: any) {
		this.set(token);
	}

	set(token: any) {
		return localStorage.setItem('token', token);
	}

	get() {
		return localStorage.getItem('token');
	}

	remove() {
		return localStorage.removeItem('token');
	}

	isValid() {
		const token = this.get();
		if (token) {
			const payload = this.payload(token);
			if (payload) {
				return (payload.iss === urlBase + '/auth/login');
			}
		}

		return false;
	}

	payload(token: any) {
		return token.split('.')[1];
	}

	loggedIn(){
		return this.isValid();
	}

}
