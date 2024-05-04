import {Component, OnInit} from '@angular/core';
import {AccountService} from "../account.service";
import {catchError, tap} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import {Handle} from "../../../data/Exceptions/Handle";
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog/confirmation-dialog.component";

@Component({
	selector: 'app-device-connected',
	templateUrl: './device-connected.component.html',
})
export class DeviceConnectedComponent implements OnInit {

	constructor(
		private accountService: AccountService,
		private translate: TranslateService,
		private handleMessage: Handle,
		private modalService: NgbModal
	) {}

	devices: any = [];
	totalPages: number = 0;
	pageNumber: number = 1;
	pages: number[] = [];

	ngOnInit(): void {
		this.getDevices();
	}

	getDevices() {
		let data = {
			page: this.pageNumber
		}

		this.accountService.getDeviceAuthList(data).pipe(
			tap((data: any) => {
				this.devices = data.data;
				this.totalPages = data.last_page;
				this.pageNumber = data.current_page;
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
		let logoutDeviceData = this.formatLogoutDevice(deviceId.toString());
		this.accountService.logoutDeviceAuth(logoutDeviceData).pipe(
			tap(() => {
				this.getDevices();
			}),
			catchError(this.handleMessage.errorHandle)
		).subscribe();

	}

	setPage(pageNumber: number): void {
		this.pageNumber = pageNumber;
		this.getDevices();
	}

	formatLogoutDevice(deviceId: string) {
		return {
			"data": {
				"attributes": {
					"device_id": deviceId
				}
			}
		}
	}
}
