Router.route('/', {
	name: 'home',
	template: 'home'
});
Router.route('/about');
Router.route('/quiz');
Router.route('/result');

Router.configure({
	layoutTemplate: 'master'
});