import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {

	@Input() title!: string;
	@Input() message!: string;
	@Input() confirmText!: string;
	@Input() cancelText!: string;

	constructor(public activeModal: NgbActiveModal) { }

	public confirm() {
		this.activeModal.close(true);
	}

	public cancel() {
		this.activeModal.dismiss(false);
	}
}
