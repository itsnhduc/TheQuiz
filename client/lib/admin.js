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
		}
	});

	Template.admin.helpers({
		'questions': function() {
			return Questions.find({}, {sort: {index: 1}});
		},
		'answerChains': function() {
			return AnswerChains.find({}, {sort: {createdAt: 1}});
		},
		'numOfAnswers': function() {
			return AnswerChains.find().count();
		},
		'numOfUsers': function() {
			return Meteor.users.find().count();
		},
		'userName': function() {
			return Meteor.users.findOne(this.userId).profile.name;
		},
		'numOfQuestions': function() {
			return Questions.find().count();
		},
		'match': function() {
			return Meteor.users.findOne(this.matchId).profile.name;
		},
		'percentage': function() {
			return Percentages.findOne({userId: this.userId}).percentage;
		}
	});
}