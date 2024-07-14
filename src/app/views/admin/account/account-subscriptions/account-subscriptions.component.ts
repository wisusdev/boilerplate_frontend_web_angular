import {Component, OnInit} from '@angular/core';
import {AccountMenuListComponent} from "@views/admin/account/account-menu-list/account-menu-list.component";
import {AccountService} from "@views/admin/account/account.service";
import {ToastService} from "@data/Services/Toast.service";
import {TranslateModule} from "@ngx-translate/core";
import {catchError, of, tap} from "rxjs";
import {SubscriptionData} from "@data/Interfaces/Responses/indexSubscriptionsResponse.interface";
import {DatePipe, NgForOf} from "@angular/common";
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";

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
		private toast: ToastService
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
				console.log(response);
				this.userSubscriptions = response.data;

				this.lastPage = response.meta.last_page;
				this.totalPages = response.meta.last_page;
				this.pageNumber = response.meta.current_page;
				this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
			}),
			catchError((error) => {
				console.log(error);
				return of(null);
			})
		).subscribe();
	}

}
