import {Component, input, Input, InputSignal, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Auth} from "../../../../data/Providers/Auth";

@Component({
	selector: 'app-form-packages',
	standalone: true,
	imports: [
		TranslateModule,
		ReactiveFormsModule
	],
	templateUrl: './formPackage.component.html'
})
export class FormPackageComponent implements OnInit {

	typeAction = input<string>();

	confirmText: string = this.translate.instant('save');
	cancelText: string = this.translate.instant('cancel');

	constructor(
		private formBuilder: FormBuilder,
		public activeModal: NgbActiveModal,
		private translate: TranslateService,
	) {}

	formPackage!: FormGroup;

	ngOnInit() {
		if(this.typeAction.toString() === 'create') {
			this.initForm();
		}
	}

	initForm() {
		this.formPackage = this.formBuilder.group({
			type: 'packages',
			name: ['', Validators.required],
			max_users: ['', Validators.required],
			interval: ['', Validators.required],
			interval_count: [1, Validators.required],
			price: ['', Validators.required],
			trial_days: [0, Validators.required],
			active: ['', Validators.required],
			description: ['', Validators.min(10)],
			created_by: Auth.userId(),
		});

		if (this.formPackage !== undefined) {
			this.formPackage.patchValue(this.formPackage);
		}
	}

	public submit() {
		if(this.typeAction.toString() === 'create') {
			this.activeModal.close({
				type: 'create',
				data: this.formPackage.value
			});
		} else {
			console.log('update');
		}
	}

	public confirm() {
		this.activeModal.close(true);
	}

	public cancel() {
		this.activeModal.dismiss(false);
	}
}
