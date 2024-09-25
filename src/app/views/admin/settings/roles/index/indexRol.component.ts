import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../settings.service';
import {catchError, of, tap} from 'rxjs';
import {NgFor, NgIf} from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgbModal, NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from "@ng-bootstrap/ng-bootstrap";
import {Router, RouterLink} from "@angular/router";
import {PermissionService} from "@data/Services/permission.service";
import {ConfirmationDialogComponent} from "@views/shared/confirmation-dialog/confirmation-dialog.component";
import {IndexRoleResponseInterface} from "@data/Interfaces/Responses/indexRoleResponse.interface";
import {ToastService} from "@data/Services/toast.service";

@Component({
	selector: 'app-index-rol',
	standalone: true,
	imports: [
		NgFor,
		TranslateModule,
		NgbPagination,
		NgbPaginationPrevious,
		NgbPaginationNext,
		RouterLink,
		NgIf,
	],
	templateUrl: './indexRol.component.html'
})
export class IndexRolComponent implements OnInit {

	roles: Array<any> = [];

	lastPage: number = 0;
	totalPages: number = 0;
	pageNumber: number = 1;
	pages: number[] = [];

	constructor(
		private settings: SettingsService,
		private toast: ToastService,
		private modalService: NgbModal,
		private translate: TranslateService,
		protected permissions: PermissionService
	) {
	}

	ngOnInit() {
		this.getRoles();
	}

	getRoles() {
		this.settings.indexRoles().pipe(
			tap((data: IndexRoleResponseInterface) => {
				this.roles = data.data;
				this.lastPage = data.meta.last_page;
				this.totalPages = data.meta.last_page;
				this.pageNumber = data.meta.current_page;
				this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
			}),
			catchError((error: any) => {
				this.toast.show({
					message: this.translate.instant('errorAsOccurred'),
					className: 'bg-danger text-light'
				});
				return of(null);
			})
		).subscribe();
	}

	deleteRole(role: any) {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, {centered: true});
		modalRef.componentInstance.title = this.translate.instant('deleteRecord');
		modalRef.result.then((result) => {
			if (result['status']) {
				this.settings.destroyRole(role.id).pipe(
					tap(() => {
						this.getRoles();
						this.toast.show({
							message: this.translate.instant('recordDeleted'),
							className: 'bg-warning text-light'
						});
					}),
					catchError((error: any) => {
						console.error(error);
						return of(null);
					})
				).subscribe();
			}
		}, (reason) => {
		});

	}

	setPage(pageNumber: number): void {
		this.pageNumber = pageNumber;
		this.getRoles();
	}
}
