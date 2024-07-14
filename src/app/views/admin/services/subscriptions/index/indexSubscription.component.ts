import {Component, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ServicesService} from "../../services.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {catchError, of, tap} from "rxjs";
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {SubscriptionData} from "@data/Interfaces/Responses/indexSubscriptionsResponse.interface";
import {ToastService} from "@data/Services/Toast.service";

interface StatusClass {
	[key: string]: string;
}

@Component({
	selector: 'app-index-subscription',
	standalone: true,
	imports: [
		TranslateModule,
		NgForOf,
		DatePipe,
		NgClass
	],
	templateUrl: './indexSubscription.component.html',
})
export class IndexSubscriptionComponent implements OnInit {

	constructor(
		private toast: ToastService,
		protected translate: TranslateService,
		private services: ServicesService,
		private modalService: NgbModal,
	) {
	}

	lastPage: number = 0;
	totalPages: number = 0;
	pageNumber: number = 1;
	pages: number[] = [];
	subscriptions: SubscriptionData[] = [];

	status: StatusClass = {
		'approved': 'success',
		'waiting': 'warning',
		'declined': 'danger',
		'cancel': 'danger'
	};

	ngOnInit() {
		this.getSubscriptions();
	}

	getSubscriptions() {
		this.services.indexSubscriptions().pipe(
			tap((response) => {
				this.subscriptions = response.data;

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
}
