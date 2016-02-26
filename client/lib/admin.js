if (Meteor.isClient) {

	Template.admin.events({
		'click #submit': function(event) {
			event.preventDefault();
			var index = Questions.find().count() + 1;
			var question = $('#ques').val();
			var answer0 = $('#ans0').val();
			var answer1 = $('#ans1').val();
			Meteor.call('insertQuestion', index, question, answer0, answer1);
			$('#ques').val('');
			$('#ans0').val('');
			$('#ans1').val('');
		},

		'click #q-delete': function(event) {
			event.preventDefault();
			Meteor.call('removeQuestion', this._id);
		}
	});

	Template.admin.helpers({
		'questions': function() {
			return Questions.find();
		},
		'answerChains': function() {
			return AnswerChains.find();
		},
		'numOfAnswers': function() {
			return AnswerChains.find().count();
		},
		'userName': function() {
			return Meteor.users.findOne(this.userId).profile.name;
		},
		'numOfQuestions': function() {
			return Questions.find().count();
		}
	});
}