if (Meteor.isClient) {

	var getPicUrl = function(facebookId) {
		return 'http://graph.facebook.com/' + facebookId + '/picture/?type=large';
	}

	Template.result.helpers({
		'profilePicUrl': function() {
			return getPicUrl(Meteor.user().services.facebook.id);
		},
		'matchName': function() {
			var matchId = AnswerChains.findOne({userId: Meteor.userId()}).matchId;
			return Meteor.users.findOne({_id: matchId}).profile.name;
		},
		'matchPicUrl': function() {
			var matchId = AnswerChains.findOne({userId: Meteor.userId()}).matchId;
			return getPicUrl(Meteor.users.findOne({_id: matchId}).services.facebook.id);
		},
		'percentage': function() {
			return Percentages.findOne({userId: Meteor.userId()}).percentage;
		}
	});

}