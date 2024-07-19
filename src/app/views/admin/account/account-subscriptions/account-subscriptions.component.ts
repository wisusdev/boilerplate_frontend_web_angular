import {Component, OnInit} from '@angular/core';
import {AccountMenuListComponent} from "@views/admin/account/account-menu-list/account-menu-list.component";
import {AccountService} from "@views/admin/account/account.service";
import {ToastService} from "@data/Services/Toast.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {catchError, of, tap} from "rxjs";
import {SubscriptionData} from "@data/Interfaces/Responses/indexSubscriptionsResponse.interface";
import {DatePipe, NgForOf} from "@angular/common";
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationDialogComponent} from "@views/shared/confirmation-dialog/confirmation-dialog.component";

@Component({
	selector: 'app-subscriptions',
	standalone: true,
	imports: [
		AccountMenuListComponent,
		TranslateModule,
		DatePipe,
		NgForOf,
		NgbDropdown,
		NgbDropdownMenu,
		NgbDropdownToggle
	],
	templateUrl: './account-subscriptions.component.html'
})
export class AccountSubscriptionsComponent implements OnInit {

	constructor(
		private accountService: AccountService,
		private toast: ToastService,
		private translate: TranslateService,
		private modalService: NgbModal
	) {}

	lastPage: number = 0;
	totalPages: number = 0;
	pageNumber: number = 1;
	pages: number[] = [];
	userSubscriptions: SubscriptionData[] = [];

	ngOnInit() {
		this.getAccountServices();
	}

	getAccountServices() {
		this.accountService.getAccountSubscriptions().pipe(
			tap((response: any) => {
				this.userSubscriptions = response.data;

				this.lastPage = response.meta.last_page;
				this.totalPages = response.meta.last_page;
				this.pageNumber = response.meta.current_page;
				this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	downloadInvoice(subscriptionID: string) {
		this.accountService.downloadInvoice(subscriptionID).pipe(
			tap((response: any) => {
				const url = window.URL.createObjectURL(response);
				const a = document.createElement('a');

				const currentDate = new Date();
				const year = currentDate.getFullYear().toString();
				const month = (`0${currentDate.getMonth() + 1}`).slice(-2);
				const day = (`0${currentDate.getDate()}`).slice(-2);
				const hours = (`0${currentDate.getHours()}`).slice(-2);
				const minutes = (`0${currentDate.getMinutes()}`).slice(-2);
				const seconds = (`0${currentDate.getSeconds()}`).slice(-2);

				a.href = url;
				a.download = `invoice-${year}${month}${day}${hours}${minutes}${seconds}.pdf`;
				document.body.appendChild(a);

				a.click();
				window.URL.revokeObjectURL(url);
				document.body.removeChild(a);
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	cancelSubscription(subscriptionID: string) {

		const modalRef = this.modalService.open(ConfirmationDialogComponent, {centered: true});

		modalRef.componentInstance.title = this.translate.instant('cancelSubscription');
		modalRef.componentInstance.reason = true;

		modalRef.result.then((result) => {
			if (result['status']) {

				const data = {
					"type": "subscriptions",
					"id": subscriptionID,
					"reason": result['reason']
				}

				this.accountService.cancelSubscription(subscriptionID, data).pipe(
					tap((response: any) => {
						this.toast.success(this.translate.instant('recordUpdated'));
						this.getAccountServices();
					}),
					catchError((error) => {
						this.toast.danger(this.translate.instant('errorAsOccurred'));
						return of(null);
					})
				).subscribe();
			}
		});
	}

}
