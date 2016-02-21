if (Meteor.isClient) {
    
    Template.admin.events({
        'click #submit': function(event) {
            event.preventDefault();
            var question = $('#ques').val();
            var answer1 = $('#ans1').val();
            var answer2 = $('#ans2').val();
            Questions.insert({
                question: question,
                answer: [answer1, answer2],
                createdAt: new Date()
            });
            $('#ques').val('');
            $('#ans1').val('');
            $('#ans2').val('');
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