if (Meteor.isClient) {

    Template.login.events({
        'click #logout': function(event) {
            event.preventDefault();
            Meteor.logout(function(err){
                if (err) {
                    throw new Meteor.Error("Logout failed");
                }
                Router.go('/');
            })
        }
    });

}