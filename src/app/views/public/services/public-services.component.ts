import { Component, OnInit } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Package } from 'src/app/data/Interfaces/Requests/indexPackageRequest.interface';
import { NgFor } from '@angular/common';
import {ServicesService} from "../../admin/services/services.service";
import {RouterLink} from '@angular/router';
import { ToastService } from 'src/app/data/Services/Toast.service';

@Component({
	selector: 'app-public-services',
	standalone: true,
	imports: [
		NgFor,
		RouterLink,
		TranslateModule
	],
	templateUrl: './public-services.component.html'
})
export class PublicServicesComponent implements OnInit {

	constructor(
		private toast: ToastService,
		protected translate: TranslateService,
		private services: ServicesService,
	) {}

	packages: Package[] = [];

	ngOnInit() {
		this.getPackages();
	}

	getPackages() {
		this.services.publicIndexServices().pipe(
			tap((response) => {
				this.packages = response.data;
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}
}
