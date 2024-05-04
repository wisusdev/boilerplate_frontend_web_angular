import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, Renderer2, OnInit } from '@angular/core';
import { app } from '../../../config/App';
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [
		TranslateModule,
		RouterLink,
		RouterLinkActive
	],
	templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

	userName: string = '';
	userAvatar: string = '';
	userFullName: string = '';

	constructor(private el: ElementRef, private renderer: Renderer2) { }

	ngOnInit() {
		let userData = localStorage.getItem('user');
		if (userData) {
			let dataProfile = JSON.parse(userData);
			this.userAvatar = dataProfile.avatar || app.placeholderImage;
			this.userName = dataProfile.username;
			this.userFullName = dataProfile.first_name + ' ' + dataProfile.last_name;
		}
	}

	toggleTreeView(event: Event) {
		event.preventDefault();
		let target = event.target as HTMLElement;

		while (target && !target.classList.contains('treeview')) {
			target = target.parentElement!;
		}

		if (!target) return;

		const isExpanded = target.classList.contains('is-expanded');

		const treeviewParents = this.el.nativeElement.querySelectorAll('.treeview');
		treeviewParents.forEach((parent: HTMLElement) => {
			this.renderer.removeClass(parent, 'is-expanded');
		});

		if (!isExpanded) {
			this.renderer.addClass(target, 'is-expanded');
		} else {
			this.renderer.removeClass(target, 'is-expanded');
		}
	}
}

