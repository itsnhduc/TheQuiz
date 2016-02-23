if (Meteor.isClient) {

	var animateInOut = function(cur, next) {
		$(cur).addClass('animated zoomOut');
		setTimeout(function() {
		    $(cur).hide();
		    $(next).removeClass('hidden');
		    $(next).addClass('animated zoomIn');
		}, 600);
	}

	var addToSession = function(name, value) {
		Session.set(name, Session.get(name) + value);
	}

	var nextQuestion = function() {
	    var curIndex = Session.get('activeQuestion');
	    if (curIndex == Questions.find().count()) {
	    	AnswerChains.insert({
	    		userId: Meteor.userId(),
	    		answerChain: Session.get('answerChain')
	    	});
	    	if (Meteor.user().services.facebook.gender == 'female') {
	    		Router.go('/result');
	    	} else {
	    		Router.go('/thank-you');
	    	}
	    } else {
		    addToSession('activeQuestion', 1);
		    animateInOut('#question' + curIndex, '#question' + (curIndex + 1));
		}
	}

	Session.setDefault('answerChain', '');
	Session.setDefault('activeQuestion', 0);

	Template.quiz.events({
		'click #quiz-start': function(event) {
			event.preventDefault();
			animateInOut('#ready', '#question1');
    		animateInOut('', '#quiz-progress');
		    addToSession('activeQuestion', 1);
		},
		'click #q-ans0': function(event) {
			event.preventDefault();
			addToSession('answerChain', '0');
			nextQuestion();
		},
		'click #q-ans1': function(event) {
			event.preventDefault();
			addToSession('answerChain', '1');
		    nextQuestion();
		}
	});

    Template.quiz.helpers({
        'questions': function() {
            return Questions.find({}, {sort: {'index': 1}});
        },
        'answerChain': function() {
        	return Session.get('answerChain');
        },
        'numOfQuestion': function() {
        	return Questions.find().count();

        },
        'activeQuestion': function() {
        	return Session.get('activeQuestion');
        }
    });

}