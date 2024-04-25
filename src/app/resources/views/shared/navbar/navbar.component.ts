import { Component, EventEmitter, Inject, OnInit, Output, Renderer2 } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AuthService } from '../../auth/auth.service';
import { Auth } from '../../../../data/Providers/Auth';
import { app } from "../../../../config/App";
import { Lang } from "../../../../config/Lang";
import {
	NgbCollapse,
	NgbDropdown,
	NgbDropdownItem,
	NgbDropdownMenu,
	NgbDropdownToggle
} from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT, NgForOf } from "@angular/common";
import {catchError, of, tap} from "rxjs";

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [
		NgbCollapse,
		RouterLink,
		TranslateModule,
		NgbDropdown,
		NgbDropdownMenu,
		NgbDropdownToggle,
		NgbDropdownItem,
		NgForOf
	],
	templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
	public loggedIn: boolean = false;
	public isMenuCollapsed: boolean = true;
	public appName: string = app.name;
	public availableLangNavbarArray: any[] = [];

	constructor(
		private router: Router,
		public translate: TranslateService,
		private authService: AuthService,
		private authUser: Auth,
		private renderer: Renderer2,
		@Inject(DOCUMENT) private document: Document
	) {
		this.availableLangNavbarArray = Object.entries(Lang.availableLang).map(([key, value]) => ({ key, ...value }));
		translate.addLangs(Object.keys(Lang.availableLang));
		for (let lang of this.availableLangNavbarArray) {
			if (lang.default) {
				translate.setDefaultLang(lang.key);
			}
		}
	}

	ngOnInit() {
		this.authUser.status().pipe().subscribe((status: boolean) => {
			this.loggedIn = status;
		});
	}

	logout($event: MouseEvent) {
		$event.preventDefault();
		this.authService.logout().pipe(
			tap(() => {
				this.loggedIn = false;
				localStorage.removeItem('access_token');
				localStorage.removeItem('user');
				localStorage.removeItem('user_key');
				this.router.navigateByUrl(app.redirectLogout);
			}),
			catchError((error) => {
				if (error[0].status == 401) {
					localStorage.removeItem('access_token');
					localStorage.removeItem('user');
					localStorage.removeItem('user_key');
					this.router.navigateByUrl(app.redirectLogout);
				}
				return of(false);
			})
		).subscribe();
	}

	switchLanguage(language: string, $event: MouseEvent) {
		$event.preventDefault();
		this.translate.use(language);
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('language', language);
		}
	}

	toggleMenu() {
		const main = this.document.querySelector('main') as HTMLElement;
		if (main.classList.contains('sidenav-toggled')) {
			this.renderer.removeClass(main, 'sidenav-toggled');
		} else {
			this.renderer.addClass(main, 'sidenav-toggled');
		}
	}
}
