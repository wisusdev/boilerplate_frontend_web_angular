import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
})
export class NavbarComponent {
	public loggedIn: boolean = false;
	public isMenuCollapsed : boolean = true;

	constructor(private Auth: AuthService, private router: Router) {
	}

	ngOnInit(): void {
		this.Auth.authStatus.subscribe(
			value => {
				this.loggedIn = value;
			}
		);
	}

	logout(event: MouseEvent) {
		event.preventDefault();
		this.Auth.changeAuthStatus(false);
		this.router.navigateByUrl('/login');
	}
}
