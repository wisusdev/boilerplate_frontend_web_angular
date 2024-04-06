import { isPlatformBrowser } from '@angular/common';
import {Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2} from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class ThemeService {

	private renderer: Renderer2;

	constructor(private rendererFactory: RendererFactory2, @Inject(PLATFORM_ID) private platformId: Object) {
		this.renderer = this.rendererFactory.createRenderer(null, null);
	}

	getTheme() {
		if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('theme') || this.getSystemTheme();
        }
        return this.getSystemTheme();
	}

	setTheme(name: string) {
		if (typeof localStorage !== 'undefined') {
            localStorage.setItem('theme', name);
        }
	}

	getSystemTheme() {
		if(isPlatformBrowser(this.platformId)){
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		return 'light'; // Add a default return value
	}

	watchSystemTheme() {
		if(isPlatformBrowser(this.platformId)){
			const darkThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
			darkThemeQuery.addEventListener('change', this.themeChangeHandler);
		}
	}

	themeChangeHandler = (event: MediaQueryListEvent) => {
		const newTheme = event.matches ? 'dark' : 'light';
		this.applyTheme(newTheme);
	};

	applyTheme(theme: string) {
		theme = (theme === 'auto') ? this.getSystemTheme() : theme;
		this.setTheme(theme);
		if(isPlatformBrowser(this.platformId)){
			this.renderer.setAttribute(document.body, 'data-bs-theme', theme);
		}
	}

}
