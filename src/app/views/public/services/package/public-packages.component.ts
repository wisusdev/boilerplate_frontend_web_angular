import { Component, OnInit } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Package } from '@data/Interfaces/Requests/indexPackageRequest.interface';
import { NgFor } from '@angular/common';
import {RouterLink} from '@angular/router';
import {ToastService} from "@data/Services/Toast.service";
import {PublicService} from "@views/public/services/public.service";

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
		private services: PublicService,
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
