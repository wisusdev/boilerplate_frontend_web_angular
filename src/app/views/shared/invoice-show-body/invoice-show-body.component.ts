import {Component, Input} from '@angular/core';
import {NgForOf, SlicePipe, TitleCasePipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
	selector: 'app-invoice-show-body',
	standalone: true,
	imports: [
		NgForOf,
		SlicePipe,
		TitleCasePipe,
		TranslateModule
	],
	templateUrl: './invoice-show-body.component.html'
})
export class InvoiceShowBodyComponent {
	@Input() invoice: any;
	@Input() invoiceUser: any;
	@Input() invoiceItems: any;
}
