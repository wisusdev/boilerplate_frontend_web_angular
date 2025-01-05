import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ServicesService} from "../../services.service";
import {catchError, of, tap} from "rxjs";
import {ToastService} from "@data/services/toast.service";
import {Auth} from "@data/providers/auth";

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
			description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(127)]],
			created_by: Auth.userId(),
		});

		if (this.formPackage !== undefined) {
			this.formPackage.patchValue(this.formPackage);
		}
	}

	getPackage(packageId: string) {
		this.services.showPackage(packageId).pipe(
			tap((response) => {

				const limits = response.data.attributes.limits;
				let max_users: number = 0;
				let interval: number = 0;

				if(limits !== null) {
					const limitsObj = JSON.parse(limits);
					max_users = limitsObj.max_users;
					interval = limitsObj.interval;
				}

				this.formPackage.patchValue({
					name: response.data.attributes.name,
					max_users: max_users,
					interval: response.data.attributes.interval,
					interval_count: response.data.attributes.interval_count,
					price: response.data.attributes.price,
					trial_days: response.data.attributes.trial_days,
					active: response.data.attributes.active,
					description: response.data.attributes.description,
					created_by: response.data.attributes.created_by,
				});
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	public submit() {
		// Obteniendo el valor de max_users
		const maxUsersValue = this.formPackage.value.max_users;
		// Eliminando max_users del objeto
		const {max_users, ...result} = this.formPackage.value;
		// Crear el objeto limits con el valor de max_users
		const limits = JSON.stringify({max_users: maxUsersValue});
		// Agregar limits al objeto result
		const newData = {...result, limits: limits};

		const actionType = this.typeAction === 'create' ? 'create' : 'edit';
		this.activeModal.close({
			type: actionType,
			data: newData
		});
	}

	public confirm() {
		this.activeModal.close(true);
	}

	public cancel() {
		this.activeModal.close(false);
	}
}
