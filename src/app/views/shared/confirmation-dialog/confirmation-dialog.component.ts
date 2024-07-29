import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-confirmation-dialog',
	standalone: true,
	imports: [
		NgIf,
		ReactiveFormsModule,
	],
	templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent implements OnInit{
	@Input() title: string = this.translate.instant('logout');
	@Input() message: string = this.translate.instant('confirmAction');
	@Input() confirmText: string = this.translate.instant('yesConfirm');
	@Input() cancelText: string = this.translate.instant('noCancel');
	@Input() reason: boolean = false;

	data: any = {
		status: false
	};

	constructor(
		public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder,
		protected translate: TranslateService,
	) { }

	formModal!: FormGroup;

	ngOnInit() {
		if (this.reason) {
			this.formModal = this.formBuilder.group({
				reasonTextarea: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]]
			});

			if (this.formModal !== undefined) {
				this.formModal.patchValue(this.formModal);
			}
		}
	}

	public confirm() {
		this.data['status'] = true;

		if (this.reason) {
			this.data['reason'] = this.formModal.value.reasonTextarea;
		}

		this.activeModal.close(this.data);
	}

	public cancel() {
		this.activeModal.close(this.data);
	}
}
