import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";
import { ToastService } from "../../../../services/toast.service";
import { UserModel } from "../../../../models/user.model";
import { authUserModel } from '../../../../models/token.model';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	constructor(private formBuilder: FormBuilder, private authService: AuthService, private toast: ToastService, private router: Router) { }

	formUser!: FormGroup;

	@Input()
	userModel!: UserModel;

	ngOnInit() {
		this.formUser = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});

		if (this.formUser !== undefined) {
			this.formUser.patchValue(this.formUser);
		}
	}

	onSubmit() {
		this.authService.login(this.formUser.value).subscribe(
			(response: authUserModel) => {
				console.log(response);
				if (response && response.token) {
					localStorage.setItem('token', response.token);
					localStorage.setItem('expires_at', response.expires_at);
				}
				this.formUser.reset();
				this.router.navigate(['/profile']);
				this.toast.show({ message: response['message'], classname: 'bg-success text-light', delay: 5000 });
			},
			(error) => {
				this.toast.show({ message: 'Error logging in user', classname: 'bg-danger text-light', delay: 5000 });
			}
		);
	}
}
