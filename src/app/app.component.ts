import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Auth } from './data/Providers/Auth';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	public loggedIn: boolean = false;
	title = 'angular-app';

	constructor(private authUser: Auth) { }

	ngOnInit() {
		this.authUser.status().pipe().subscribe((status: boolean) => {
			this.loggedIn = status;
		});
	}
}
