import {Component, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {ServicesService} from "../../services.service";
import {catchError, of, tap} from "rxjs";
import {DatePipe, NgForOf} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormPackageComponent} from "../form/formPackage.component";
import {Package} from "@data/Interfaces/Requests/indexPackageRequest.interface";
import {ToastService} from "@data/Services/toast.service";
import {ConfirmationDialogComponent} from "@views/shared/confirmation-dialog/confirmation-dialog.component";

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
		protected translate: TranslateService,
		private services: ServicesService,
		private modalService: NgbModal,
	) {
	}

	ngOnInit() {
		this.getPackages();
	}

	getPackages() {
		this.services.indexPackage().pipe(
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

	showFormPackageModal(packageId?: string) {
		const modalRef = this.modalService.open(FormPackageComponent, {
			size: 'lg',
			centered: true,
			backdrop: 'static',
			keyboard: false
		});

		modalRef.componentInstance.typeAction = packageId ? 'edit' : 'create';

		if (packageId) {
			modalRef.componentInstance.packageId = packageId;
		}

		modalRef.result.then((result) => {
			if (result.type === 'create') {
				this.createPackage(result);
			}

			if (result.type === 'edit') {
				result.data.id = packageId;
				this.editPackage(packageId!, result);
			}
		}, (reason) => {});
	}

	createPackage(result: any) {
		this.services.createPackage(result.data).pipe(
			tap(() => {
				this.toast.success(this.translate.instant('recordCreated'));
				this.getPackages();
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	editPackage(id:string, result: any) {
		this.services.updatePackage(id, result.data).pipe(
			tap(() => {
				this.toast.success(this.translate.instant('recordUpdated'));
				this.getPackages();
			}),
			catchError((error) => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();
	}

	deletePackage(packageId: string) {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, {centered: true});
		modalRef.componentInstance.title = this.translate.instant('deleteRecord');

		modalRef.result.then((result) => {
			if (result['status']) {
				this.services.deletePackage(packageId).pipe(
					tap(() => {
						this.toast.success(this.translate.instant('recordDeleted'));
						this.getPackages();
					}),
					catchError((error) => {
						this.toast.danger(this.translate.instant('errorAsOccurred'));
						return of(null);
					})
				).subscribe();
			}
		});
	}

	setPage(pageNumber: number): void {
		this.pageNumber = pageNumber;
		this.getPackages();
	}
}
