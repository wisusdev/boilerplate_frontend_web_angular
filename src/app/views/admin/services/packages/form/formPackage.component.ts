import {Component, input, Input, InputSignal, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ServicesService} from "../../services.service";
import {catchError, of, tap} from "rxjs";
import {ToastService} from "@data/Services/Toast.service";
import {Auth} from "@data/Providers/Auth";

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

	@Input() typeAction: string = 'create';
	@Input() packageId: string = '';

	confirmText: string = this.translate.instant('save');
	cancelText: string = this.translate.instant('cancel');

	constructor(
		private formBuilder: FormBuilder,
		public activeModal: NgbActiveModal,
		private translate: TranslateService,
		private services: ServicesService,
		private toast: ToastService,
	) {}

	formPackage!: FormGroup;

	ngOnInit() {
		this.initForm();
		if(this.typeAction === 'edit') {
			this.getPackage(this.packageId);
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
			description: ['', [Validators.required, Validators.min(10)]],
			created_by: Auth.userId(),
		});

		if (this.formPackage !== undefined) {
			this.formPackage.patchValue(this.formPackage);
		}
	}

	getPackage(packageId: string) {
		this.services.showPackage(packageId).pipe(
			tap((response) => {
				console.log(response);
				this.formPackage.patchValue(response.data.attributes);
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	public submit() {
		const actionType = this.typeAction === 'create' ? 'create' : 'edit';
		this.activeModal.close({
			type: actionType,
			data: this.formPackage.value
		});
	}

	public confirm() {
		this.activeModal.close(true);
	}

	public cancel() {
		this.activeModal.dismiss(false);
	}
}
