import {Component} from '@angular/core';
import {ThemeService} from "@data/services/theme.service";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {TranslateModule} from "@ngx-translate/core";

@Component({
	selector: 'app-theme',
	standalone: true,
	imports: [
		NgbDropdown,
		NgbDropdownMenu,
		NgbDropdownItem,
		NgbDropdownToggle,
		TranslateModule
	],
	templateUrl: './theme.component.html',
})
export class ThemeComponent {

	constructor(private themeService: ThemeService) {
		this.themeService.watchSystemTheme();
		this.themeService.applyTheme(this.themeService.getTheme());
	}

	toggle(theme: string, event: any) {
		this.themeService.applyTheme(theme);
		this.changueClass(event);
	}

	changueClass(event: any) {
		const clickedIcon = event.target;
		const clickedIconClasses = clickedIcon.querySelector('i')!.className;
		const changeIcon = document.getElementById('changeIcon');
		changeIcon!.className = clickedIconClasses;
	}

}
