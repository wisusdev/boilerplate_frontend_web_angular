import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf} from "@angular/common";
import {SettingsService} from "../../settings.service";
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet} from "@ng-bootstrap/ng-bootstrap";
import {PermissionService} from "../../../../../data/Services/permission.service";

@Component({
	selector: 'app-index-config',
	standalone: true,
	imports: [
		RouterLink,
		TranslateModule,
		NgIf,
		NgbNavOutlet,
		NgbNav,
		NgbNavItem,
		NgbNavContent,
		NgbNavLinkButton
	],
	templateUrl: './indexConfig.component.html'
})
export class IndexConfigComponent {
	constructor(
		protected permissions: PermissionService,
		private settings: SettingsService,
	) {}

	active = 'top';
}
