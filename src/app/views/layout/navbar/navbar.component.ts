import { Component, EventEmitter, Inject, OnInit, Output, Renderer2 } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AuthService } from '../../auth/auth.service';
import {
	NgbCollapse,
	NgbDropdown,
	NgbDropdownItem,
	NgbDropdownMenu,
	NgbDropdownToggle
} from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT, NgForOf } from "@angular/common";
import {catchError, of, tap} from "rxjs";
import {app} from "../../../config/App";
import {Auth} from "../../../data/Providers/Auth";
import {Lang} from "../../../config/Lang";

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

		const language: string | null = localStorage.getItem('language') || app.lang;
		if (language) {
			this.translate.use(language);
		} else {
			this.translate.use(this.translate.getDefaultLang());
		}
	}

	logout($event: MouseEvent) {
		$event.preventDefault();
		this.authService.logout().pipe(
			tap(() => {
				this.loggedIn = false;
				localStorage.clear();
				this.router.navigate([app.redirectToLogin]).then();
			}),
			catchError((error) => {
				if (error[0].status == 401) {
					localStorage.clear();
					this.router.navigate([app.redirectToLogin]).then();
				}
				return of(false);
			})
		).subscribe();
	}

	switchLanguage(language: string, $event: MouseEvent) {
		$event.preventDefault();
		this.translate.use(language);
		localStorage.setItem('language', language);
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
