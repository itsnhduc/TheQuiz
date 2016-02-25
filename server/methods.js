Meteor.methods({
	'insertQuestion': function(index, question, answer0, answer1) {
		Questions.insert({
			index: index,
			question: question,
			answer: [answer0, answer1],
			createdAt: new Date()
		});
	},
	'insertAnswerChain': function(userId, answerChain, matchId, gender) {
		AnswerChains.insert({
			userId: userId,
			answerChain: answerChain,
			matchId: matchId,
			gender: gender,
			createdAt: new Date()
		});
	}
});