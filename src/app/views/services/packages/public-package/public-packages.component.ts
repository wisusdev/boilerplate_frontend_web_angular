import { Component, OnInit } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Package } from '@data/interfaces/requests/indexPackageRequest.interface';
import { NgFor } from '@angular/common';
import {RouterLink} from '@angular/router';
import {ToastService} from "@data/services/toast.service";
import {ServicesService} from "@views/services/services.service";

@Component({
	selector: 'app-public-services',
	standalone: true,
	imports: [
		NgFor,
		RouterLink,
		TranslateModule
	],
	templateUrl: './public-packages.component.html'
})
export class PublicPackagesComponent implements OnInit {

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
		this.services.publicIndexPackage().pipe(
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
