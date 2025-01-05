import {Component, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DecimalPipe, LowerCasePipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {SettingsService} from "@views/settings/settings.service";
import {catchError, of, tap} from "rxjs";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Package} from "@data/interfaces/requests/indexPackageRequest.interface";
import {ServicesService} from "@views/services/services.service";
import {itemsRequest} from "@data/requests/items-request";
import {Auth} from "@data/providers/auth";
import {ToastService} from "@data/services/toast.service";

@Component({
	selector: 'app-create-subscription',
	standalone: true,
	imports: [
		TranslateModule,
		NgForOf,
		DecimalPipe,
		NgSelectModule,
		FormsModule,
		ReactiveFormsModule,
		LowerCasePipe,
		TitleCasePipe,
		NgIf
	],
	templateUrl: './createSubscription.component.html'
})
export class CreateSubscriptionComponent implements OnInit {

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
		private toast: ToastService,
		private translate: TranslateService,
	) {
	}

	ngOnInit() {
		const today = new Date().toISOString().split('T')[0];
		const dueDate = new Date();
		dueDate.setDate(dueDate.getDate() + 15);
		const formattedDueDate = dueDate.toISOString().split('T')[0];

		this.invoiceForm = this.formBuilder.group({
			type: 'invoices',
			user_id: [null, Validators.required],
			created_by: Auth.userId(),
			invoice_date: [today, Validators.required],
			due_date: [formattedDueDate, Validators.required],
			total_amount: 0,
			status: ['unpaid', Validators.required],

			payment_method: ['', Validators.required],
			order_confirmation: [false, Validators.required],
			generate_invoice: [false, Validators.required],
			send_email: [false, Validators.required],
			items: [this.items, itemsRequest()],
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
		this.invoiceForm.patchValue({items: this.items});
		this.services.storeInvoice(this.invoiceForm.value).pipe(
			tap(response => {
				this.invoiceForm.reset();
				this.items = [];
				this.toast.success(this.translate.instant('recordCreated'));
			}),
			catchError(error => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
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
			item_id: '',
			type: 'package',
			name: '',
			description: '',
			quantity: 1,
			unit_price: 0,
			total_price: 0,

			interval: '',
		});
		this.calculateTotalPrice();
	}

	getPackages() {
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
			this.items[index].item_id = selectedPackage.id;
			this.items[index].type = selectedPackage.type;
			this.items[index].name = selectedPackage.attributes.name;
			this.items[index].description = selectedPackage.attributes.description;
			this.items[index].quantity = selectedPackage.attributes.interval_count;
			this.items[index].interval = selectedPackage.attributes.interval;
			this.items[index].unit_price = parseFloat(selectedPackage.attributes.price);

			const price = parseFloat(selectedPackage.attributes.price);
			const intervalCount = parseInt(selectedPackage.attributes.interval_count.toString(), 10);

			if (!isNaN(price) && !isNaN(intervalCount)) {
				this.items[index].total_price = price * intervalCount;
			} else {
				this.items[index].total_price = 0;
			}
		} else {
			this.items.splice(index, 1);
		}

		this.calculateTotalPrice();
		this.generateItems();
	}

	calculateTotalPrice() {
		this.totalPrice = this.items.reduce((total, item) => {
			const price = parseFloat(item.total_price);
			return total + (isNaN(price) ? 0 : price);
		}, 0);

		this.invoiceForm.patchValue({total_amount: this.totalPrice});
	}

	removeItem(index: number) {
		this.items.splice(index, 1);
		this.calculateTotalPrice();
	}

	private fetchPackage(pageSize: number = 15, pageNumber: number = 1, filterType: string = 'name', filterValue: string = '', order: string = '-', sort: string = 'id') {
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

	private generateItems() {
		this.invoiceForm.patchValue({items: this.items});
	}
}
