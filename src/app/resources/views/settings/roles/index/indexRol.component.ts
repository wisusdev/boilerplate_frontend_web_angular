import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../settings.service';
import {catchError, of, tap} from 'rxjs';
import {NgFor} from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgbModal, NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from "@ng-bootstrap/ng-bootstrap";
import {RouterLink} from "@angular/router";
import { Toast, ToastService } from 'src/app/data/Services/Toast.service';
import {ConfirmationDialogComponent} from "../../../../components/confirmation-dialog/confirmation-dialog.component";

interface RoleResponse {
	data: Role[];
	links: Links;
	meta: Meta;
}

interface Role {
	type: string;
	id: string;
	name: string;
	permissions: Permission[];
}

interface Permission {
	id: string;
	name: string;
}

interface Links {
	first: string;
	last: string;
	prev: null | string;
	next: null | string;
}

interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	links: MetaLink[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}

interface MetaLink {
	url: null | string;
	label: string;
	active: boolean;
}

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
	) {}

	ngOnInit() {
		this.getRoles();
	}

	getRoles() {
		this.settings.indexRoles().pipe(
			tap((data: RoleResponse) => {
				this.roles = data.data;
				this.lastPage = data.meta.last_page;
				this.totalPages = data.meta.last_page;
				this.pageNumber = data.meta.current_page;
				this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
			}),
			catchError((error: any) => {
				console.error(error);
				return of(null);
			})
		).subscribe();
	}

	deleteRole(role: any) {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, {centered: true});
		modalRef.componentInstance.title = this.translate.instant('logout');
		modalRef.componentInstance.message = this.translate.instant('confirmAction');
		modalRef.componentInstance.confirmText = this.translate.instant('yesConfirm');
		modalRef.componentInstance.cancelText = this.translate.instant('noCancel');
		modalRef.result.then((result) => {
			if (result) {
				this.settings.destroyRole(role.id).pipe(
					tap(() => {
						this.getRoles();
						this.toast.show({message: 'Role deleted successfully', className: 'bg-warning text-light'});
					}),
					catchError((error: any) => {
						console.error(error);
						return of(null);
					})
				).subscribe();
			}
		}, (reason) => {});

	}

	setPage(pageNumber: number): void {
		this.pageNumber = pageNumber;
		this.getRoles();
	}

	formatFormRole(rolName: string, SelectedPermissions: string[]) {
		return {
			"data": {
				"type": "roles",
				"attributes": {
					"role": {
						"name": rolName,
					},
					"permissions": SelectedPermissions
				}
			}
		}
	}
}
