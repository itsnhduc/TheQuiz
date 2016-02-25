if (Meteor.isClient) {

	Template.home.helpers({
		'isFemale': function() {
			return Meteor.user().services.facebook.gender == 'female';
		},
		'completed': function() {
			return AnswerChains.findOne({userId: Meteor.userId()}) != null;
		}
	});

	Template.home.events({
        'click #facebook-login': function(event) {
        	event.preventDefault();
            Meteor.loginWithFacebook({}, function(err){
                if (err) {
                    throw new Meteor.Error("Facebook login failed");
                }
                if (AnswerChains.findOne({userId: Meteor.userId()}) == null) {
                	Router.go('/quiz');
            	}
            });
            
        },
		'click #take-quiz': function(event) {
			event.preventDefault();
			Router.go('/quiz');
		},
		'click #view-result': function(event) {
			event.preventDefault();
			Router.go('/result');
		}
	});

}