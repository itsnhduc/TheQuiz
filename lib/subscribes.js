if (Meteor.isClient) {
	Meteor.subscribe('questions');
	Meteor.subscribe('answerChains');
	Meteor.subscribe('users');
	Meteor.subscribe('percentages');
}