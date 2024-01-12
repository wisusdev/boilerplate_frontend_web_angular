import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { UserModel } from "../../../../models/user.model";
import { AuthService } from "../../../../services/auth.service";
import { ToastService } from "../../../../services/toast.service";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html'
})
export class RegisterComponent {
	constructor(private formBuilder: FormBuilder, private authUser: AuthService, private toast: ToastService, private router: Router) { }

	formUser!: FormGroup;

	@Input()
	userModel!: UserModel;

	ngOnInit() {
		this.formUser = this.formBuilder.group({
			username: ['', Validators.required],
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			password_confirmation: ['', Validators.required]
		});

		if (this.formUser !== undefined) {
			this.formUser.patchValue(this.formUser);
		}
	}
	onSubmit() {
		this.authUser.register(this.formUser.value).subscribe(
			(response) => {
				this.formUser.reset();
				this.toast.show({ message: 'User registered successfully', classname: 'bg-success text-light', delay: 5000 });
				this.router.navigate(['/auth/login']);
			},
			(error) => {
				this.toast.show({ message: 'Error registering user', classname: 'bg-danger text-light', delay: 5000 });
			}
		);
	}
}
