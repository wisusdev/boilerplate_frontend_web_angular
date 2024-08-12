const api_url: string = 'https://backend.wisus.dev/api';
const api_version: string = '/v1';

export const environment = {
    /* Application Name */
	name: 'Web Care',

	/* Application Version */
	version: '1.0.0',

	/* Lang */
	lang: 'en',

	/* Application URl */
	app_url: 'https://frontend.wisus.dev',

	/* Redirect after login */
	redirectToHome: '/home',

	/* Redirect after logout */
	redirectToLogin: '/auth/login',

	placeholderImage: '/assets/images/profile.png',

	/* Stripe Publishable Key */
	stripeKey: 'pk_test_514mTJgJ4njti3TekWucEp5V5ejDQz7PtW7SNDoBLMt2fLBlFkszWzniNq5eWZunAch7HLOyDmQETF4uvVGEtzyLs00GsAftRIk',

    api_url: api_url,
    api_version: api_version,
    api_url_v1: `${api_url}${api_version}`,
    headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
    },

    availableLang: {
		'es': {
			'name': 'Español',
			'default': true,
			'dir': 'ltr'
		},
		'en': {
			'name': 'English',
			'default': false,
			'dir': 'ltr',
		}
	},

	allowImageTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
	allowImageSize: 1048576, // 1MB
};