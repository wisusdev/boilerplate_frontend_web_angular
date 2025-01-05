import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, of, tap} from "rxjs";
import {ToastService} from "@data/services/toast.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ServicesService} from "@views/services/services.service";

@Component({
	selector: 'app-payment-status',
	standalone: true,
	imports: [
		TranslateModule
	],
	templateUrl: './payment-status.component.html'
})
export class PaymentStatusComponent implements OnInit {

	statusPayment: string = 'success';
	subscriptionId: string = '';
	packageId: string = '';

	constructor(
		private route: ActivatedRoute,
		private services: ServicesService,
		private toast: ToastService,
		private translate: TranslateService
	) {}

	ngOnInit() {
		this.route.url.subscribe(urlSegment => {
			const statusSegment = urlSegment[0].path;
			this.packageId = urlSegment[1].path;
			if(statusSegment === 'payment-success') {
				this.statusPayment = 'success';
			} else {
				this.statusPayment = 'cancelled';
			}
		})

		this.route.queryParams.subscribe(params => {
			const subscriptionId = params['subscription_id'];
			if (subscriptionId) {
				this.subscriptionId = subscriptionId;
			}
		});

		if(this.subscriptionId){
			this.updateStatusPayment();
		}

	}

	updateStatusPayment() {
		const data = {
			type: 'subscriptions',
			id: this.packageId,
			subscription_id: this.subscriptionId,
		};

		this.services.publicUpdateSubscription(this.packageId, data).pipe(
			tap(() => {
				if (this.statusPayment === 'success') {
					this.toast.success(this.translate.instant('recordCreated'));
				}
			}),
			catchError(() => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

}
