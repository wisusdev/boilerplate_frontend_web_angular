import {Component, OnInit} from '@angular/core';
import {ServicesService} from "@views/admin/services/services.service";
import {catchError, of, tap} from "rxjs";
import {ToastService} from "@data/Services/Toast.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {InvoiceData} from "@data/Interfaces/Responses/indexInvoicesResponse.interface";
import {DatePipe, NgForOf} from "@angular/common";
import {NgbModal, NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationDialogComponent} from "@views/shared/confirmation-dialog/confirmation-dialog.component";

@Component({
	selector: 'app-index-invoices',
	standalone: true,
	imports: [
		TranslateModule,
		NgForOf,
		DatePipe,
		NgbPagination,
		NgbPaginationNext,
		NgbPaginationPrevious
	],
	templateUrl: './indexInvoice.component.html'
})
export class IndexInvoiceComponent implements OnInit {
	lastPage: number = 0;
	totalPages: number = 0;
	pageNumber: number = 1;
	pages: number[] = [];
	invoices: InvoiceData[] = [];

	constructor(
		private toast: ToastService,
		protected translate: TranslateService,
		private services: ServicesService,
		private modalService: NgbModal,
	) {}

	ngOnInit() {
		this.getInvoices();
	}

	setPage(pageNumber: number): void {
		this.pageNumber = pageNumber;
		this.getInvoices();
	}

	getInvoices() {
		this.services.indexInvoices().pipe(
			tap((response) => {
				this.invoices = response.data;

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

	deleteInvoice(id: string) {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, {centered: true});
		modalRef.componentInstance.title = this.translate.instant('deleteRecord');

		modalRef.result.then((result) => {
			if (result['status']) {

				this.services.destroyInvoice(id).pipe(
					tap(() => {
						this.getInvoices();
						this.toast.success(this.translate.instant('recordDeleted'));
					}),
					catchError((error) => {
						this.toast.danger(this.translate.instant('errorAsOccurred'));
						return of(null);
					})
				).subscribe();
			}
		});
	}
}
