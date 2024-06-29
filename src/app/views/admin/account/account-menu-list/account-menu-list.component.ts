import {Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
	selector: 'app-account-menu-list',
	standalone: true,
	imports: [
		TranslateModule,
		RouterLink,
		RouterLinkActive
	],
	templateUrl: './account-menu-list.component.html'
})
export class AccountMenuListComponent {

}
