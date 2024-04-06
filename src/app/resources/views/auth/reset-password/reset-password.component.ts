import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../../data/Services/Auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastService } from "../../../../data/Services/Toast.service";

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
	token: any;
	formUser!: FormGroup;

	constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService, private toast: ToastService) {
	}

	ngOnInit(): void {
		this.formUser = this.formBuilder.group({
			password: ['', Validators.required],
			password_confirmation: ['', Validators.required]
		});

		this.route.queryParams.subscribe(param => {
			this.token = param['token'];
		})
	}

	onSubmit() {
		const password = this.formUser.value.password;
		const password_confirmation = this.formUser.value.password_confirmation;

		this.authService.resetPassword(this.token, password, password_confirmation).subscribe(
			(response) => {
				console.log(response);
				this.formUser.reset();
				this.toast.show({ message: 'Your password has been reset!', classname: 'bg-success text-light', delay: 5000 });
				this.router.navigate(['auth/login']);
			},
			(error) => {
				console.log(error);
				this.toast.show({ message: 'Something went wrong!', classname: 'bg-danger text-light', delay: 5000 });
			}
		);
	}
}
