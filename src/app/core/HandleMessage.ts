import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { ToastService } from "../services/toast.service";
import { FormGroup } from "@angular/forms";

@Injectable({
	providedIn: 'root'
})
export abstract class HandleMessage {

	constructor(private router: Router, private toast: ToastService) { }

	errorHandle(error: HttpErrorResponse): Observable<never> {
		let errorMessage: string = '';

		if (error.error instanceof ErrorEvent) {
			errorMessage = error.error.message;
		} else {
			if (error.status === 422) {
				errorMessage = error.error.errors.detail;
			} else if (error.status === 400 || error.status === 422) {
				errorMessage = error.error.errors.detail;
			} else {
				errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
			}
		}

		return throwError(() => errorMessage);
	}

	handleResponse(response: any, form: FormGroup, route: string = '/profile') {
		if (response && response.token) {
			localStorage.setItem('token', response.token);
			localStorage.setItem('expires_at', response.expires_at);
		}
		form.reset();
		this.router.navigate([route]);
		this.toast.show({ message: response['message'], classname: 'bg-success text-light', delay: 5000 });
	}

	handleError(error: any, errorMessages: any) {
		if (typeof error === 'object') {
			for (let key in error) {
				errorMessages[key] = error[key];
				this.toast.show({ message: error[key], classname: 'bg-danger text-light', delay: 5000 });
			}
		} else {
			this.toast.show({ message: error, classname: 'bg-danger text-light', delay: 5000 });
		}
	}
}