import {Component, OnInit} from '@angular/core';
import {BackendService} from "../../../service/backend.service";
import {NgForm} from "@angular/forms";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {

	public form = {
		name: null,
		email: null,
		password: null,
		password_confirmation: null
	}

	public error: any = [];
	public message: null|string = null;

	constructor(private backend: BackendService) {}

	ngOnInit(): void {

	}

	submitRegister(registrationForm: NgForm){
		return this.backend.register(this.form).subscribe({
			next: (data) => this.handleResponse(data, registrationForm),
			error: (error) => this.handleError(error),
		});
	}

	handleResponse(data: any, registrationForm: any){
		if (data.statusCode === 200){
			registrationForm.resetForm();
			this.message = 'success';
		}
	}

	handleError(error: any){
		this.error = error.error.error;
	}
}
