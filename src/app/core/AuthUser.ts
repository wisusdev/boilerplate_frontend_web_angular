import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthUser {
    private isLoggedIn = new BehaviorSubject<boolean>(false);

    status() {
        if (typeof localStorage !== 'undefined') {
            const token: string | null = localStorage.getItem('token');
            const expiresAt: string | null = localStorage.getItem('expires_at');

            if (!token || !expiresAt) {
                this.isLoggedIn.next(false);
                console.log('No token or expires_at found');
            } else {
                const expiresAtDate = new Date(expiresAt);
                const currentDate = new Date();

                if (currentDate > expiresAtDate) {
                    this.isLoggedIn.next(false);
                    console.log('Token expired');
                } else {
                    this.isLoggedIn.next(true);
                    console.log('Token valid');
                }
            }
        }

        return this.isLoggedIn.asObservable();
    }
}