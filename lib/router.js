Router.route('/', {
	name: 'home',
	template: 'home',
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
}, {except: ['about'], where: 'server'});

Router.onBeforeAction(function() {
	var userId = Meteor.user().services.facebook.id
	if (userId == '901284919969633' ||
		userId == '606361569511576' ||
		userId == '991917880900741' ||
		userId == '967294070022224') {
		this.next();
	} else {
		this.render('home');
	}
}, {only: ['admin'], where: 'server'});

Router.onBeforeAction(function() {
	if (!AnswerChains.findOne({userId: Meteor.userId()})) {
		this.next();
	} else {
		this.render('home');
	}
}, {only: ['quiz'], where: 'server'});

Router.onBeforeAction(function() {
	if (Meteor.user().services.facebook.gender == 'female' && AnswerChains.findOne({userId: Meteor.userId()})) {
		this.next();
	} else {
		this.render('home');
	}
}, {only: ['result'], where: 'server'});

Router.onBeforeAction(function() {
	if (Meteor.user().services.facebook.gender == 'male' && AnswerChains.findOne({userId: Meteor.userId()})) {
		this.next();
	} else {
		this.render('home');
	}
}, {only: ['thank-you'], where: 'server'});