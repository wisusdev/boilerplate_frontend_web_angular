import {Component} from '@angular/core';
import {AccountMenuListComponent} from "../account-menu-list/account-menu-list.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {AccountService} from "../account.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationDialogComponent} from "../../../components/confirmation-dialog/confirmation-dialog.component";
import {catchError, tap} from "rxjs";
import {Handle} from "../../../../data/Exceptions/Handle";
import {app} from "../../../../config/App";
import {Router} from "@angular/router";
import {ToastService} from "../../../../data/Services/Toast.service";

@Component({
	selector: 'app-delete-account',
	standalone: true,
	imports: [
		AccountMenuListComponent,
		TranslateModule
	],
	templateUrl: './delete-account.component.html',
})
export class DeleteAccountComponent {

	constructor(
		private accountService: AccountService,
		private translate: TranslateService,
		private modalService: NgbModal,
		private handleMessage: Handle,
		private router: Router,
		private toast: ToastService){
	}

	openConfirmationDialog() {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, {centered: true});
		modalRef.componentInstance.title = this.translate.instant('deleteAccount');
		modalRef.componentInstance.message = this.translate.instant('confirmDeleteAccount');
		modalRef.componentInstance.confirmText = this.translate.instant('yesConfirm');
		modalRef.componentInstance.cancelText = this.translate.instant('noCancel');
		modalRef.result.then((result) => {
			if (result) {
				this.deleteAccount();
			}
		}, (reason) => {
		});
	}

	deleteAccount() {
		let userId: string | null = localStorage.getItem('user_key');
		if (userId) {
			this.accountService.deleteAccount(userId).pipe(
				tap((response) => {
					this.toast.show({message: 'Account deleted successfully', className: 'bg-success text-light'});
					localStorage.clear();
					this.router.navigate([app.redirectLogout]);
				}),
				catchError(this.handleMessage.errorHandle)
			).subscribe();
		}
	}
}
