import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from '../../auth/auth.service';
import { Auth } from '../../../../data/Providers/Auth';
import { app } from "../../../../config/App";
import { Lang } from "../../../../config/Lang";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
	collapsed: boolean = true;
	public loggedIn: boolean = false;
	public isMenuCollapsed: boolean = true;
	public appName: string = app.name;
	public availableLangNavbarArray: any[] = [];

	constructor(private router: Router, public translate: TranslateService, private authService: AuthService, private authUser: Auth) {
		this.availableLangNavbarArray = Object.entries(Lang.availableLang).map(([key, value]) => ({ key, ...value }));
		translate.addLangs(Object.keys(Lang.availableLang));
		for (let lang of this.availableLangNavbarArray) {
			if (lang.default) {
				translate.setDefaultLang(lang.key);
			}
		}
	}

	ngOnInit() {
		this.authUser.status().subscribe((response) => {
				this.loggedIn = response;
			}, (error) => {
				console.log(error);
			}
		);
	}

	logout($event: MouseEvent) {
		$event.preventDefault();
		this.authService.logout().subscribe(
			(response) => {
				this.loggedIn = false;
				localStorage.removeItem('access_token');
				localStorage.removeItem('user');
				localStorage.removeItem('user_key');
				this.router.navigateByUrl(app.redirectLogout);
			},
			(error) => {
				if (error[0].status == 401) {
					localStorage.removeItem('access_token');
					localStorage.removeItem('user');
					localStorage.removeItem('user_key');
					this.router.navigateByUrl(app.redirectLogout);
				}
			}
		);
	}

	switchLanguage(language: string, $event: MouseEvent) {
		$event.preventDefault();
		this.translate.use(language);
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('language', language);
		}
	}
}
