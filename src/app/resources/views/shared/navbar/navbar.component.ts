import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../../../../../environments/environment";
import { AuthService } from '../../../../services/auth.service';
import { AuthUser } from 'src/app/core/AuthUser';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
	collapsed: boolean = true;
	public loggedIn: boolean = false;
	public isMenuCollapsed: boolean = true;
	public appName: string = environment.APP_NAME;

	constructor(private router: Router, public translate: TranslateService, private authService: AuthService, private authUser: AuthUser ) {
		translate.addLangs(['en', 'es']);
		translate.setDefaultLang('es');
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
				console.log(response);
				this.loggedIn = false;
				localStorage.removeItem('token');
				localStorage.removeItem('expires_at');
				this.router.navigateByUrl('/auth/login');
			},
			(error) => {
				console.log(error);
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
