import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class Auth {
	private isLoggedIn = new BehaviorSubject<boolean>(false);

	status() {
		if (typeof localStorage !== 'undefined') {
			const access_token: string | null = localStorage.getItem('access_token');

			if (!access_token || access_token === 'undefined') {
				this.isLoggedIn.next(false);
				console.log('No token or expires_at found');
			} else {
				this.isLoggedIn.next(true);
				console.log('Token found');
			}
		}

		return this.isLoggedIn.asObservable();
	}
}
