import {Component, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {DecimalPipe, LowerCasePipe, NgForOf, TitleCasePipe} from "@angular/common";
import {SettingsService} from "@views/admin/settings/settings.service";
import {catchError, of, tap} from "rxjs";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Package} from "@data/Interfaces/Requests/indexPackageRequest.interface";
import {ServicesService} from "@views/admin/services/services.service";

@Component({
	selector: 'app-create-invoice',
	standalone: true,
	imports: [
		TranslateModule,
		NgForOf,
		DecimalPipe,
		NgSelectModule,
		FormsModule,
		ReactiveFormsModule,
		LowerCasePipe,
		TitleCasePipe
	],
	templateUrl: './createInvoice.component.html'
})
export class CreateInvoiceComponent implements OnInit {

	users: { id: string, first_name: string }[] = [];
	invoiceForm!: FormGroup;
	items: any[] = [];
	packages: Package[] = [];
	totalPrice: number = 0;
	invoiceStatus: string[] = ['paid', 'unpaid', 'partial'];
	paymentMethods: string[] = ['paypal', 'stripe', 'wompi'];

	constructor(
		private formBuilder: FormBuilder,
		private services: ServicesService,
		private settingsService: SettingsService,
	) {}

	ngOnInit() {
		const today = new Date().toISOString().split('T')[0];
		const dueDate = new Date();
		dueDate.setDate(dueDate.getDate() + 15);
		const formattedDueDate = dueDate.toISOString().split('T')[0];

		this.invoiceForm = this.formBuilder.group({
			type: 'invoice',
			user_id: null,
			invoice_date: today,
			due_date: formattedDueDate,
		});
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

	addItem() {
		this.items.push({
			package: '',
			interval: '',
			description: '',
			interval_count: 0,
			price: 0,
			selectedPackage: null,
		});
		this.calculateTotalPrice();
	}

	getPackages(){
		if (!this.packages.length) {
			this.fetchPackage();
		}
	}

	searchPackages(searchTerm: string = '') {
		const filteredUsers = this.packages.filter(pkg =>
			pkg.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		if (filteredUsers.length) {
			this.packages = filteredUsers;
		} else {
			this.fetchPackage(15, 1, 'name', searchTerm);
		}
	}

	onPackageSelect(selectedPackage: Package | null, index: number) {
		if (selectedPackage) {
			this.items[index].selectedPackage = selectedPackage;
			this.items[index].price = selectedPackage.attributes.price;
		} else {
			this.items[index].selectedPackage = null;
			this.items[index].price = 0;
		}
		this.calculateTotalPrice();
	}

	calculateTotalPrice() {
		this.totalPrice = this.items.reduce((total, item) => {
			const price = parseFloat(item.price);
			return total + (isNaN(price) ? 0 : price);
		}, 0);
	}

	removeItem(index: number) {
		this.items.splice(index, 1);
		this.calculateTotalPrice();
	}

	private fetchPackage(pageSize: number = 15, pageNumber: number = 1, filterType: string = 'name', filterValue: string = '', order: string = '-', sort: string = 'id'){
		this.services.indexPackage(pageSize, pageNumber, filterType, filterValue, order, sort).pipe(
			tap(response => {
				this.packages = response.data;
			}),
			catchError(error => {
				console.log(error);
				return of(null);
			})
		).subscribe();
	}
}
