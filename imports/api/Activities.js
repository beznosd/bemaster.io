import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { Accounts } from 'meteor/accounts-base';

if( Meteor.isServer ) {

	Meteor.publish('userActivities', function (userId) {
		console.log("userId",userId);
		console.log("result", userActivities.findOne({user_id: userId}));
		return userActivities.find({user_id: userId});
	});

	Meteor.methods({
    'userActivities.addActivity'(userId, activity) {
			userActivities.insert({
        user_id: userId,
        activity_name: activity.name,
        total_time: activity.totalTime,
        createdAt: Date.now()
      }, function (err, result) {
				console.log("Me the result", result);
      	Meteor.users.update({_id: userId}, {$push: {activities: result}})
      });

		},
    'userActivities.startActivity'(userId) {
			userActivities.update({user_id: userId}, {
        started_at: Date.now(),
        last_active: Date.now()
      });
		},
    'userActivity.updateTime'(userId, activityId) {
      userActivities.update({user_id: userId, _id: activityId}, {
        $inc: {
          total_time: 1000,
          last_active: 1000
        },
      });
    }
	});

	// Defining schema for userActivities collection

	let userActivities = new Meteor.Collection( 'userActivities' );

	let userActivity = new SimpleSchema({
		user_id: {
  		type: String,
      optional: false,
    },
    activity_name: {
  		type: String,
      optional: false
    },
    total_time: {
  		type: Number,
      optional: true
    },
    started_at: {
  		type: Date,
      optional: true
    },
    last_active: {
  		type: Date,
      optional: true
    },
    avards: {
    	type: [String],
      optional: true
    },

    createdAt: {
    	type: Date,
      optional: false
    },

    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
    	type: Date,
    	optional: true
    }
	});


	userActivities.attachSchema(userActivity);

}
