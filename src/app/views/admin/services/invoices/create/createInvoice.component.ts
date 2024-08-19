import {Component, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {DecimalPipe, NgForOf} from "@angular/common";
import {ItemFormComponent} from "@views/admin/services/invoices/item/item-form.component";
import {SettingsService} from "@views/admin/settings/settings.service";
import {catchError, of, tap} from "rxjs";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
	selector: 'app-create-invoice',
	standalone: true,
	imports: [
		TranslateModule,
		NgForOf,
		ItemFormComponent,
		DecimalPipe,
		NgSelectModule,
		FormsModule,
		ReactiveFormsModule
	],
	templateUrl: './createInvoice.component.html'
})
export class CreateInvoiceComponent implements OnInit {
	items = [0];
	quantities: number[] = [];
	totalQuantity: number = 0;
	users: { id: string, first_name: string }[] = [];
	selectedUser: string = '';

	invoiceForm!: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private settingsService: SettingsService,
	) {}

	ngOnInit() {
		this.invoiceForm = this.formBuilder.group({
			type: 'invoice',
			user_id: null,
		});
	}

	addItem() {
		this.items.push(this.items.length);
		this.quantities.push(0);
	}

	removeItem(index: number) {
		this.items.splice(index, 1);
		this.quantities.splice(index, 1);
		this.updateTotalQuantity(0, index);
	}

	updateTotalQuantity(quantity: number, index: number) {
		this.quantities[index] = quantity;
		this.totalQuantity = this.quantities.reduce((total, qty) => total + qty, 0);
	}

	getUsers() {
		if (!this.users.length) {
			this.searchUsers();
		}
	}

	searchUsers(searchTerm: string = '') {
		const filteredUsers = this.users.filter(user =>
			user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		if (filteredUsers.length) {
			this.users = filteredUsers;
		} else {
			this.fetchUsers(15, 1, 'first_name', searchTerm);
		}
	}

	createInvoice() {
		console.log(this.invoiceForm.value);
	}

	private fetchUsers(pageSize: number = 15, pageNumber: number = 1, filterType: string = 'first_name', filterValue: string = '', order: string = '-', sort: string = 'id') {
		this.settingsService.indexUsers(pageSize, pageNumber, filterType, filterValue, order, sort).pipe(
			tap(response => {
				this.users = response.data.map(user => ({
					id: user.id,
					first_name: user.attributes.first_name + ' ' + user.attributes.last_name + ' (' + user.attributes.email + ')'
				}));
			}),
			catchError(error => {
				console.error(error);
				return of(null);
			})
		).subscribe();
	}
}
