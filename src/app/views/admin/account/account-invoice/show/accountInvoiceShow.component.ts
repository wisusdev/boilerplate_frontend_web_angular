import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ServicesService} from "@views/admin/services/services.service";
import {catchError, of, tap} from "rxjs";
import {ToastService} from "@data/Services/toast.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {InvoiceShowBodyComponent} from "@views/shared/invoice-show-body/invoice-show-body.component";
import {InvoiceAttributes, InvoiceItem, InvoiceUser} from "@data/Interfaces/Responses/showInvoiceResponse.interface";
import {TitleCasePipe} from "@angular/common";

@Component({
	selector: 'app-account-invoice-show',
	standalone: true,
	imports: [
		InvoiceShowBodyComponent,
		TranslateModule,
		TitleCasePipe
	],
	templateUrl: './accountInvoiceShow.component.html'
})
export class AccountInvoiceShowComponent implements OnInit {
	invoiceId: string = '';
	invoice: InvoiceAttributes = {} as InvoiceAttributes;
	invoiceUser: InvoiceUser = {} as InvoiceUser;
	invoiceItems: InvoiceItem[] = [];

	constructor(
		protected translate: TranslateService,
		private toast: ToastService,
		private route: ActivatedRoute,
		private services: ServicesService,
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
				this.invoiceId = response.data.id;
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

	payInvoice() {
		console.log(this.invoiceId);
	}
}
