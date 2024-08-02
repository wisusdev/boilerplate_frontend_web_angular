import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PublicService} from "@views/public/services/public.service";
import {catchError, of, tap} from "rxjs";
import {ToastService} from "@data/Services/Toast.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'app-payment-status',
	standalone: true,
	imports: [],
	templateUrl: './payment-status.component.html'
})
export class PaymentStatusComponent implements OnInit {

	statusPayment: string = 'success';
	subscriptionId: string = '';
	packageId: string = '';

	constructor(
		private route: ActivatedRoute,
		private publicService: PublicService,
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

		this.publicService.publicUpdateSubscription(this.packageId, data).pipe(
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
