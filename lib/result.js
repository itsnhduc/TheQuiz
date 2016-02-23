if (Meteor.isClient) {

	Template.result.helpers({
		'profilePicUrl': function() {
			return 'http://graph.facebook.com/' + Meteor.user().services.facebook.id + '/picture/?type=large';
		}
	});

}