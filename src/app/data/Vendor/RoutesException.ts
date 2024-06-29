export const routesException = {
	exceptionRoutes: [
		'/',
		'/auth/login',
	],

	exceptionRoute(): boolean {
		return routesException.exceptionRoutes.includes(window.location.pathname)
	}
}

