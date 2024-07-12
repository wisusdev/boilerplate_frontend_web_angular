import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
	selector: 'app-payment-status',
	standalone: true,
	imports: [],
	templateUrl: './payment-status.component.html'
})
export class PaymentStatusComponent implements OnInit {

	statusPayment: string = 'success';

	constructor(
		private route: ActivatedRoute,
	) {}

	ngOnInit() {
		this.route.url.subscribe(urlSegment => {
			const statusSegment = urlSegment[0].path;
			if(statusSegment === 'payment-success') {
				this.statusPayment = 'success';
			} else {
				this.statusPayment = 'cancelled';
			}
		})

		this.route.queryParams.subscribe(params => {
			const subscriptionId = params['subscription_id'];
			if (subscriptionId) {
				const data = {
					subscriptionId: subscriptionId,
					status: this.statusPayment
				};
				this.updateStatusPayment(data);
			}
		});
	}

	updateStatusPayment(data: object) {

	}

}
