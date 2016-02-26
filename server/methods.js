Meteor.methods({
	'insertQuestion': function(index, question, answer0, answer1) {
		Questions.insert({
			index: index,
			question: question,
			answer: [answer0, answer1],
			createdAt: new Date()
		});
	},
	'removeQuestion': function(questionId) {
		var deletedIndex = Questions.findOne(questionId).index;
		var numOfQuestion = Questions.find().count();
		var lastQuestion = Questions.findOne({index: numOfQuestion});
		if (lastQuestion) {
			Questions.update(lastQuestion._id, {$set: {index: deletedIndex}});
		}
		Questions.remove(questionId);
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