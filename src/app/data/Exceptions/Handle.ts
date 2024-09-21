import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, pipe, throwError} from "rxjs";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {environment} from "@env/environment";
import {ToastService} from "@data/Services/toast.service";

@Injectable({
	providedIn: 'root'
})
export abstract class Handle {

	protected constructor(
		private router: Router,
		private toast: ToastService
	) {}

	errorHandle(error: HttpErrorResponse): Observable<never> {
		let errorMessage: string = '';

		if (error.error instanceof ErrorEvent) {
			errorMessage = error.error.message;
		} else {
			errorMessage = error.error.errors;
		}

		return throwError(() => errorMessage);
	}

	handleResponse(response: any, form: FormGroup, route: string = environment.redirectToHome) {
		form.reset();
		this.router.navigate([route]).then(responseRoute => {
			this.toast.success(response);
		});
	}

	handleError(error: any) {
		if (typeof error === 'object') {
			for (let key in error) {
				this.toast.danger(error[key]['detail']);
			}
		} else {
			this.toast.danger(error);
		}
	}
}
