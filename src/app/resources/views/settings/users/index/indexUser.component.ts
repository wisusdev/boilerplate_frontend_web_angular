import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../settings.service';
import {DatePipe, NgFor} from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {ToastService} from "../../../../../data/Services/Toast.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationDialogComponent} from "../../../../components/confirmation-dialog/confirmation-dialog.component";

@Component({
	selector: 'app-index-users',
	standalone: true,
	imports: [
		NgFor,
		TranslateModule,
		RouterLink,
		DatePipe,

	],
	templateUrl: './indexUser.component.html',
})
export class IndexUserComponent implements OnInit {
	users: Array<any> = [];

	lastPage: number = 0;
	totalPages: number = 0;
	pageNumber: number = 1;
	pages: number[] = [];

	constructor(
		private settingsService: SettingsService,
		private toast: ToastService,
		private translate: TranslateService,
		private modalService: NgbModal
	) {
	}

	ngOnInit(): void {
		this.getUsers();
	}

	getUsers() {
		this.settingsService.indexUsers().subscribe(
			(response: any) => {
				this.users = response.data;
				this.lastPage = response.meta.last_page;
				this.totalPages = response.meta.last_page;
				this.pageNumber = response.meta.current_page;
				this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
			},
			(error: any) => {
				console.error(error);
			}
		);
	}

	deleteUser(id: string) {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, {centered: true});
		modalRef.componentInstance.title = this.translate.instant('deleteRecord');

		modalRef.result.then((result) => {
			if (result) {
				this.settingsService.destroyUser(id).subscribe(
					(response: any) => {
						this.getUsers();
						this.toast.show({message: this.translate.instant('recordDeleted'), className: 'bg-warning text-white'})
					},
					(error: any) => {
						console.error(error);
						this.toast.show({message: this.translate.instant('errorAsOccurred'), className: 'bg-danger text-white'})
					}
				);
			}
		}, (reason) => {});
	}
}
