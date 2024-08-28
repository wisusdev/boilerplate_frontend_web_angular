import {Component, OnInit} from '@angular/core';
import {ToastService} from "@data/Services/Toast.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ServicesService} from "@views/admin/services/services.service";
import {catchError, of, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
	selector: 'app-show-invoices',
	standalone: true,
	imports: [
		TranslateModule
	],
	templateUrl: './showInvoice.component.html',
	styleUrl: './showInvoice.component.css'
})
export class ShowInvoiceComponent implements OnInit {
	invoiceId: string = '';

	constructor(
		private toast: ToastService,
		protected translate: TranslateService,
		private services: ServicesService,
		private route: ActivatedRoute,
	) {
	}

	ngOnInit() {

		this.route.params.subscribe(params => {
			this.invoiceId = params['id'];
			console.log(this.invoiceId);
		});

		this.getInvoice(this.invoiceId);
	}

	getInvoice(invoiceId: string) {
		this.services.showInvoice(invoiceId).pipe(
			tap((response) => {
				console.log(response);
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}
}
