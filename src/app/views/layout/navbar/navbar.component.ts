import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgbCollapse, NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {DOCUMENT, NgForOf} from "@angular/common";
import {catchError, of, tap} from "rxjs";
import {Auth} from "@data/providers/auth";
import {AuthService} from "@views/auth/auth.service";
import {RouteExceptionService} from "@data/services/route-exception.service";
import {environment} from "@env/environment";

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
	public appName: string = environment.name;
	public availableLangNavbarArray: any[] = [];

	constructor(
		private router: Router,
		public translate: TranslateService,
		private authService: AuthService,
		private authUser: Auth,
		private routeExceptionService: RouteExceptionService,
		private renderer: Renderer2,
		@Inject(DOCUMENT) private document: Document
	) {
		this.availableLangNavbarArray = Object.entries(environment.availableLang).map(([key, value]) => ({ key, ...value }));
		translate.addLangs(Object.keys(environment.availableLang));
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

		const language: string | null = localStorage.getItem('language') || environment.lang;
		if (language) {
			this.translate.use(language);
		} else {
			this.translate.use(this.translate.getDefaultLang());
		}

		const appData = localStorage.getItem('app') || null;
		if (appData) {
			const app = JSON.parse(appData);
			this.appName = app.name;
		}
	}

	logout($event: MouseEvent) {
		$event.preventDefault();
		this.authService.logout().pipe(
			tap(() => {
				this.loggedIn = false;
				localStorage.clear();
				this.router.navigate([environment.redirectToLogin]).then();
			}),
			catchError((error) => {
				if (error[0].status == 401) {
					localStorage.clear();
					this.router.navigate([environment.redirectToLogin]).then();
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

	exceptionRoute(): boolean {
		return this.routeExceptionService.exceptionRoute();
	}
}
