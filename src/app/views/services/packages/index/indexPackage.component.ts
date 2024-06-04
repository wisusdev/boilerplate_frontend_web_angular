import {Component, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {ServicesService} from "../../services.service";
import {Package} from "../../../../data/Interfaces/Requests/indexPackageRequest.interface";
import {catchError, of, tap} from "rxjs";
import {ToastService} from "../../../../data/Services/Toast.service";
import {DatePipe, NgForOf} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormPackageComponent} from "../form/formPackage.component";

@Component({
	selector: 'app-index-package',
	standalone: true,
	imports: [
		TranslateModule,
		RouterLink,
		DatePipe,
		NgForOf
	],
	templateUrl: './indexPackage.component.html'
})
export class IndexPackageComponent implements OnInit {
	lastPage: number = 0;
	totalPages: number = 0;
	pageNumber: number = 1;
	pages: number[] = [];

	packages: Package[] = [];

	constructor(
		private toast: ToastService,
		private translate: TranslateService,
		private services: ServicesService,
		private modalService: NgbModal,
	) {}

	ngOnInit() {
		this.getPackages();
	}

	getPackages() {
		this.services.indexServices().pipe(
			tap((response) => {
				this.packages = response.data;

				this.lastPage = response.meta.last_page;
				this.totalPages = response.meta.last_page;
				this.pageNumber = response.meta.current_page;
				this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	createPackage() {
		const modalRef = this.modalService.open(FormPackageComponent, {size: 'lg', centered: true});
		modalRef.componentInstance.typeAction = 'create';

		modalRef.result.then((result) => {
			if (result.type === 'create') {
				this.services.createService(result.data).pipe(
					tap(() => {
						this.toast.success(this.translate.instant('createdSuccessfully'));
						this.getPackages();
					}),
					catchError((error) => {
						this.toast.danger(this.translate.instant('errorAsOccurred'));
						return of(null);
					})
				).subscribe();
			}
		}, (reason) => {});
	}

	editPackage(packageId: number) {
		const modalRef = this.modalService.open(FormPackageComponent, {size: 'lg', centered: true});
		modalRef.componentInstance.typeAction = 'edit';

		modalRef.result.then((result) => {
			if (result.type === 'edit') {
				this.services.updateService(result.data).pipe(
					tap(() => {
						this.toast.success(this.translate.instant('updatedSuccessfully'));
						this.getPackages();
					}),
					catchError((error) => {
						this.toast.danger(this.translate.instant('errorAsOccurred'));
						return of(null);
					})
				).subscribe();
			}
		}, (reason) => {});
	}

	setPage(pageNumber: number): void {
		this.pageNumber = pageNumber;
		this.getPackages();
	}
}
