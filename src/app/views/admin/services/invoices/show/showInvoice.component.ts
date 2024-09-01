import {Component, OnInit} from '@angular/core';
import {ToastService} from "@data/Services/Toast.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ServicesService} from "@views/admin/services/services.service";
import {catchError, of, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {InvoiceAttributes, InvoiceItem, InvoiceUser} from "@data/Interfaces/Responses/showInvoiceResponse.interface";
import {NgForOf, SlicePipe, TitleCasePipe} from "@angular/common";

@Component({
	selector: 'app-show-invoices',
	standalone: true,
	imports: [
		TranslateModule,
		NgForOf,
		SlicePipe,
		TitleCasePipe
	],
	templateUrl: './showInvoice.component.html'
})
export class ShowInvoiceComponent implements OnInit {
	invoiceId: string = '';
	invoice: InvoiceAttributes = {} as InvoiceAttributes;
	invoiceUser: InvoiceUser = {} as InvoiceUser;
	invoiceItems: InvoiceItem[] = [];

	constructor(
		private toast: ToastService,
		protected translate: TranslateService,
		private services: ServicesService,
		private route: ActivatedRoute,
	) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.getInvoice(params['id']);
		});
	}

	getInvoice(invoiceId: string) {
		this.services.showInvoice(invoiceId).pipe(
			tap((response) => {
				this.invoice = response.data.attributes;
				this.invoiceItems = response.data.relationships.items;
				this.invoiceUser = response.data.relationships.user;
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}
}
