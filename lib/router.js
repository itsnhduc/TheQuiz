Router.route('/', {
	name: 'home',
	template: 'home'
});
Router.route('/about');
Router.route('/quiz');
Router.route('/result');
Router.route('/admin');
Router.route('/login');
Router.route('/thank-you');

Router.configure({
	layoutTemplate: 'master'
});

Router.onBeforeAction(function() {
	if (Meteor.userId()) {
		this.next();
	} else {
		this.render('home');
	}
});

Router.onBeforeAction(function() {
	if (Meteor.user().profile.name == 'Nguyen Huynh Duc') {
		this.next();
	} else {
		this.render('home');
	}
}, {only: ['admin']});