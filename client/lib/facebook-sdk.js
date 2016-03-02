if (Meteor.isClient) {

	window.fbAsyncInit = function() {
		FB.init({
			appId: '746753788758571',
			status: true,
		});
	};

}