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
			var answerChain = Session.get('answerChain');
			var gender = Meteor.user().services.facebook.gender;
			var userId = Meteor.userId();

			if (gender == 'female') {
				var match = findMatch(answerChain);
				var matchId = match.userId;
				Meteor.call('insertAnswerChain', userId, answerChain, matchId, gender);
				Router.go('/result');
			} else {
				Meteor.call('insertAnswerChain', userId, answerChain, '', gender);
				Router.go('/thank-you');
			}

		} else {
			addToSession('activeQuestion', 1);
			animateInOut('#question' + curIndex, '#question' + (curIndex + 1));
		}
	}

	var findMatch = function(answerChain) {
		var max = 0;
		var pool = AnswerChains.find({gender: 'male'}).fetch();
		var maleCount = AnswerChains.find({gender: 'male'}).count();
		var match;
		for (var i = 0; i < pool.length; i++)  {
			var maleChain = pool[i].answerChain;
			var femaleChain = answerChain;
			var matchScore = sumXORString(femaleChain, maleChain);
			if (matchScore > max) {
				max = matchScore;
				match = pool[i];
			}
		}
		console.log('success');
		return match;
	}

	var sumXORString = function(n, m) {
		if (n.length != m.length) {
			console.log('Size Unmatched Error.');
			return;
		}
		var result = 0;
		for (var i = 0; i < n.length; i++) {
			if (n[i] == m[i]) {
				result += 1;
			}
		}
		return result;
	}

	Template.quiz.onRendered(function() {
		Session.set('answerChain', '');
		Session.set('activeQuestion', 0);
	});

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