import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import {Observable, pipe, throwError} from "rxjs";
import { Router } from "@angular/router";
import { ToastService } from "../Services/Toast.service";
import { FormGroup } from "@angular/forms";

@Injectable({
	providedIn: 'root'
})
export abstract class Handle {

	protected constructor(private router: Router, private toast: ToastService) { }

	errorHandle(error: HttpErrorResponse): Observable<never> {
		let errorMessage: string = '';

		if (error.error instanceof ErrorEvent) {
			errorMessage = error.error.message;
		} else {
			errorMessage = error.error.errors;
		}

		return throwError(() => errorMessage);
	}

	handleResponse(response: any, form: FormGroup, route: string = '/profile') {
		form.reset();
		this.router.navigate([route]);
		this.toast.show({ message: response, className: 'bg-success text-light', delay: 5000 });
	}

	handleError(error: any) {
		if (typeof error === 'object') {
			for (let key in error) {
				this.toast.show({ message: error[key]['detail'], className: 'bg-danger text-light', delay: 5000 });
			}
		} else {
			this.toast.show({ message: error, className: 'bg-danger text-light', delay: 5000 });
		}
	}
}
