import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../settings.service';
import {DatePipe, NgFor} from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "../../../../data/Services/Toast.service";
import {ConfirmationDialogComponent} from "../../../shared/confirmation-dialog/confirmation-dialog.component";
import {catchError, of, tap} from "rxjs";
import {FormsModule} from "@angular/forms";

@Component({
	selector: 'app-index-users',
	standalone: true,
	imports: [
		NgFor,
		TranslateModule,
		RouterLink,
		DatePipe,
		FormsModule
	],
	templateUrl: './indexUser.component.html',
})
export class IndexUserComponent implements OnInit {
	users: Array<any> = [];
	filteredUsers: Array<any> = [];
	searchText: string = '';

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
		this.settingsService.indexUsers().pipe(
			tap((response) => {
				this.users = response.data;
				this.filteredUsers = [...this.users];
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

	filterUsers() {
		if (this.searchText) {
			this.filteredUsers = this.users.filter(user =>
				user.attributes.first_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
				user.attributes.last_name.toLowerCase().includes(this.searchText.toLowerCase())
			);
		} else {
			this.filteredUsers = [...this.users];
		}
	}

	deleteUser(id: string) {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, {centered: true});
		modalRef.componentInstance.title = this.translate.instant('deleteRecord');

		modalRef.result.then((result) => {
			if (result) {
				this.settingsService.destroyUser(id).subscribe(
					(response: any) => {
						this.getUsers();
						this.toast.success(this.translate.instant('recordDeleted'));
					},
					(error: any) => {
						console.error(error);
						this.toast.danger(this.translate.instant('errorAsOccurred'));
					}
				);
			}
		});
	}
}
