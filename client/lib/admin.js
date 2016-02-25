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
			Questions.remove(this._id);
		}
	});

	Template.admin.helpers({
		'questions': function() {
			return Questions.find({});
		},
		'numOfQuestions': function() {
			return Questions.find().count();
		}
	});
}