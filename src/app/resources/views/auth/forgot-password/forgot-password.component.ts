import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { ToastService } from "../../../../services/toast.service";

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {

	constructor(private formBuilder: FormBuilder, private authService: AuthService, private toast: ToastService) { }

	formForgotPassword!: FormGroup;

	ngOnInit() {
		this.formForgotPassword = this.formBuilder.group({
			email: ['', Validators.required]
		});

		if (this.formForgotPassword !== undefined) {
			this.formForgotPassword.patchValue(this.formForgotPassword);
		}
	}

	onSubmit() {
		this.authService.forgotPassword(this.formForgotPassword.value).subscribe(
			(response) => {
				console.log(response);
				this.formForgotPassword.reset();
				this.toast.show({ message: 'We have emailed your password reset link!', classname: 'bg-success text-light', delay: 5000 });
			},
			(error) => {
				console.log(error);
				this.toast.show({ message: 'Error resetting password', classname: 'bg-danger text-light', delay: 5000 });
			}
		);
	}
}
