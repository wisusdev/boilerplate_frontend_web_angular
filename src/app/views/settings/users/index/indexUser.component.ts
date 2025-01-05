import {Component, OnInit, PipeTransform} from '@angular/core';
import {SettingsService} from '../../settings.service';
import {AsyncPipe, DatePipe, DecimalPipe, NgFor} from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {NgbModal, NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from "@ng-bootstrap/ng-bootstrap";
import {catchError, map, Observable, of, startWith, tap} from "rxjs";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserData} from "@data/interfaces/responses/indexUserResponse.interface";
import {ToastService} from "@data/services/toast.service";
import {ConfirmationDialogComponent} from "@views/shared/confirmation-dialog/confirmation-dialog.component";

@Component({
	selector: 'app-index-users',
	standalone: true,
	imports: [
		NgFor,
		TranslateModule,
		RouterLink,
		DatePipe,
		FormsModule,
		AsyncPipe,
		ReactiveFormsModule,
		NgbPagination,
		NgbPaginationNext,
		NgbPaginationPrevious
	],
	providers: [
		DecimalPipe
	],
	templateUrl: './indexUser.component.html',
})
export class IndexUserComponent implements OnInit {

	lastPage: number = 0;
	totalPages: number = 0;
	pageNumber: number = 1;
	pages: number[] = [];

	users: UserData[] = [];
	filteredUsers$!: Observable<UserData[]>;
	filter = new FormControl('', {nonNullable: true});

	constructor(
		private settingsService: SettingsService,
		private toast: ToastService,
		private translate: TranslateService,
		private modalService: NgbModal,
		private pipe: DecimalPipe,
	) {
	}

	ngOnInit(): void {
		this.getUsers();
	}

	search(text: string, pipe: PipeTransform, users: UserData[]): UserData[] {
		return users.filter(user => {
			const term = text.toLowerCase();
			return (
				user.attributes.first_name.toLowerCase().includes(term) ||
				user.attributes.last_name.toLowerCase().includes(term) ||
				user.attributes.username.toLowerCase().includes(term) ||
				user.attributes.email.toLowerCase().includes(term)
			);
		});
	}

	getUsers() {
		this.settingsService.indexUsers().pipe(
			tap((response) => {
				this.users = response.data;
				this.filteredUsers$ = this.filter.valueChanges.pipe(
					startWith(''),
					map(text => this.search(text, this.pipe, this.users))
				);

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


	deleteUser(id: string) {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, {centered: true});
		modalRef.componentInstance.title = this.translate.instant('deleteRecord');

		modalRef.result.then((result) => {
			if (result['status']) {
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

	setPage(pageNumber: number): void {
		this.pageNumber = pageNumber;
		this.getUsers();
	}
}
