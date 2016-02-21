if (Meteor.isClient) {

	Session.set('answerChain', '');

	Template.quiz.events({
		'click #quiz-start': function(event) {
			event.preventDefault();
			$('#ready').hide();
		},
		'click #q-ans0': function(event) {
			event.preventDefault();
			Session.set('answerChain', Session.get('answerChain') + '0');
		},
		'click #q-ans1': function(event) {
			event.preventDefault();
			Session.set('answerChain', Session.get('answerChain') + '1');
		}
	});

    Template.quiz.helpers({
        'questions': function() {
            return Questions.find({}, {sort: {'index': 1}});
        },
        'answerChain': function() {
        	return Session.get('answerChain');
        }
    });

}