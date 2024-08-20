import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {ServicesService} from "@views/admin/services/services.service";
import {catchError, interval, of, tap} from "rxjs";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgIf} from "@angular/common";
import {Package} from "@data/Interfaces/Requests/indexPackageRequest.interface";

@Component({
	selector: 'app-item-form',
	standalone: true,
	imports: [
		TranslateModule,
		FormsModule,
		NgSelectModule,
		NgIf
	],
	templateUrl: './item-form.component.html'
})
export class ItemFormComponent {
	quantity: number = 0;

	packages: Package[] = [];
	selectedPackage: Package = {
		id: '',
		type: '',
		attributes: {
			name: '',
			description: '',
			limits: '',
			interval: '',
			interval_count: 0,
			price: '',
			trial_days: 0,
			active: false,
			created_at: '',
			updated_at: '',
		}
	};

	@Input() index!: number;
	@Output() quantityChange = new EventEmitter<number>();
	@Output() remove = new EventEmitter<void>();

	constructor(
		private services: ServicesService,
		private translate: TranslateService,
	) {
	}

	onQuantityChange() {
		this.quantityChange.emit(this.selectedPackage.attributes.interval_count * Number(this.selectedPackage.attributes.price));
	}

	removeItem() {
		this.remove.emit();
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

	onPackageSelect(selectedPackage: Package) {
		this.selectedPackage = selectedPackage || {};
		console.log(this.selectedPackage);
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
