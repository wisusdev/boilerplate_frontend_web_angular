import {Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {DecimalPipe, NgForOf} from "@angular/common";
import {ItemFormComponent} from "@views/admin/services/invoices/item/item-form.component";

@Component({
	selector: 'app-create-invoice',
	standalone: true,
	imports: [
		TranslateModule,
		NgForOf,
		ItemFormComponent,
		DecimalPipe
	],
	templateUrl: './createInvoice.component.html'
})
export class CreateInvoiceComponent {
	items = [0];
	quantities: number[] = [];
	totalQuantity: number = 0;

	addItem() {
		this.items.push(this.items.length);
		this.quantities.push(0);
	}

	updateTotalQuantity(quantity: number, index: number) {
		this.quantities[index] = quantity;
		this.totalQuantity = this.quantities.reduce((total, qty) => total + qty, 0);
	}

	getUsers() {
		
	}
}
