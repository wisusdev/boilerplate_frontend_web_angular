import {Component, OnInit} from '@angular/core';
import {AccountService} from "../account.service";
import {catchError, of, tap} from "rxjs";
import {NgbModal, NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from "@ng-bootstrap/ng-bootstrap";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Handle} from "../../../data/Exceptions/Handle";
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog/confirmation-dialog.component";
import {AccountMenuListComponent} from "../account-menu-list/account-menu-list.component";
import {NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../data/Services/Toast.service";


@Component({
	selector: 'app-device-connected',
	standalone: true,
	imports: [
		AccountMenuListComponent,
		NgbPagination,
		NgbPaginationPrevious,
		TranslateModule,
		NgbPaginationNext,
		NgForOf
	],
	templateUrl: './device-connected.component.html',
})
export class DeviceConnectedComponent implements OnInit {

	devices: Array<any> = [];
	lastPage: number = 0;
	totalPages: number = 0;
	pageNumber: number = 1;
	pages: number[] = [];

	formDevice!: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private accountService: AccountService,
		private translate: TranslateService,
		private handleMessage: Handle,
		private modalService: NgbModal,
		private toast: ToastService
	) {}

	ngOnInit(): void {
		this.formDevice = this.formBuilder.group({
			type: 'logout-device',
			id: '',
			device_id: ''
		});
		this.getDevices();
	}

	getDevices() {
		let data = {
			page: this.pageNumber
		}

		this.accountService.getDeviceAuthList(data).pipe(
			tap((dataResponse) => {
				this.devices = dataResponse.data;
				this.lastPage = dataResponse.meta.last_page;
				this.totalPages = dataResponse.meta.last_page;
				this.pageNumber = dataResponse.meta.current_page;
				this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
			}),
			catchError(this.handleMessage.errorHandle)
		).subscribe();
	}

	openConfirmationModal(deviceId: number) {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, {centered: true});
		modalRef.result.then((result) => {
			if (result) {
				this.logoutDevice(deviceId);
			}
		}, (reason) => {});
	}

	logoutDevice(deviceId: number) {
		this.formDevice.patchValue({
			id: deviceId,
			device_id: deviceId
		} );

		this.accountService.logoutDeviceAuth(this.formDevice.value).pipe(
			tap(() => {
				this.toast.success(this.translate.instant('recordDeleted'));
				this.getDevices();
			}),
			catchError(() => {
				this.toast.danger(this.translate.instant('errorAsOccurred'));
				return of(null);
			})
		).subscribe();

	}

	setPage(pageNumber: number): void {
		this.pageNumber = pageNumber;
		this.getDevices();
	}
}
