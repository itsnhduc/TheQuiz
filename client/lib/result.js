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

	Template.result.events({
		'click #share': function(event) {
			event.preventDefault();
			var matchId = AnswerChains.findOne({userId: Meteor.userId()}).matchId;
			var matchFacebookId = Meteor.users.findOne({_id: matchId}).services.facebook.id;
			var matchName = Meteor.users.findOne({_id: matchId}).profile.name;
			var percentage = Percentages.findOne({userId: Meteor.userId()}).percentage;
			FB.ui({
				method: 'share_open_graph',
				display: 'popup',
				href: 'http://vnntuthequiz.herokuapp.com',
				redirect_url: 'http://vnntuthequiz.herokuapp.com',
				action_type: 'thequiz_t:complete',
				action_properties: JSON.stringify({
					quiz: {
						title: matchName + ' chính là nửa kia mà bạn đang tìm kiếm!',
						description: 'Câu trả lời của hai bạn hợp nhau đến ' + percentage + '%.',
						url: 'http://vnntuthequiz.herokuapp.com',
						image: 'http://graph.facebook.com/' + matchFacebookId + '/picture/?type=large'
					},
					tags: {
						profile_id: matchFacebookId
					}
				})
			});
		}
	});

}