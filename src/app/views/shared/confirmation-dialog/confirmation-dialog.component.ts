import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'app-confirmation-dialog',
	standalone: true,
	templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
	constructor(
		public activeModal: NgbActiveModal,
		private translate: TranslateService,
	) { }

	@Input() title: string = this.translate.instant('logout');
	@Input() message: string = this.translate.instant('confirmAction');
	@Input() confirmText: string = this.translate.instant('yesConfirm');
	@Input() cancelText: string = this.translate.instant('noCancel');

	public confirm() {
		this.activeModal.close(true);
	}

	public cancel() {
		this.activeModal.dismiss(false);
	}
}
