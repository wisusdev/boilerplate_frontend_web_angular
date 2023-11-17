import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BackendService} from "../../../shared/service/backend.service";
import {AuthService} from "../../../shared/service/auth.service";
import {NgForm} from "@angular/forms";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
	loggedIn: boolean | undefined;

	public form = {
		email: null,
		password: null
	}

	constructor(private backend: BackendService, private router: Router, private Auth: AuthService) {
		console.log("==" + this.loggedIn);
	}

	public error: any = [];
	public message: null | string = null;

	ngOnInit(): void {
	}

	Login() {
		return this.backend.login(this.form).subscribe({
				next: (data) => this.handleResponse(data),
				error: (error) => this.handleError(error),
			}
		);
	}

	handleResponse(data: any) {
		console.log(data);
		this.Auth.changeAuthStatus(true);
		this.router.navigateByUrl("/profile");
	}

	handleError(error: any) {
		this.error = error.error.error;
		this.message = 'danger';
	}

}
