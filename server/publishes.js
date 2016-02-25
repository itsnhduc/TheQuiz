if (Meteor.isServer) {
	Meteor.publish('questions', function() {
		return Questions.find();
	});
	Meteor.publish('answerChains', function() {
		return AnswerChains.find();
	});
	Meteor.publish('users', function() {
		return Meteor.users.find({}, {fields: {
			'services.facebook.first_name': 1,
			'services.facebook.last_name': 1,
			'services.facebook.name': 1
		}});
	});
}