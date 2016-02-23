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