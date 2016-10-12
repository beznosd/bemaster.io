import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export let UserActivities = new Mongo.Collection( 'userActivities' );

// Defining schema for userActivities collection

let userActivity = new SimpleSchema({
	user_id: {
		type: String,
		optional: false,
	},
	activity_name: {
		type: String,
		optional: false
	},
	ticking: {
		type: Boolean,
		optional: true
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


UserActivities.attachSchema(userActivity);


if( Meteor.isServer ) {

	Meteor.publish('userActivities', function (userId) {
		return UserActivities.find({user_id: userId});
	});

	Meteor.methods({

		'userActivities.addActivity' (userId, activity) {
		    UserActivities.insert({
		        user_id: userId,
		        activity_name: activity.name,
		        ticking: false,
		        total_time: activity.totalTime,
		        createdAt: Date.now()
		    }, function(err, result) {
		        console.log("Me the result", result);
		        Meteor.users.update({ _id: userId }, { $push: { activities: result } });
		    });
		},

		'userActivities.startActivity' (userId, activityId) {
			console.log("userActivities.startActivity", userId, activityId);
		    UserActivities.update({ user_id: userId }, {
				$set:{
					started_at: Date.now(),
					last_active: Date.now(),
					ticking: true
				}
		    }, function(err, result) {
		        Meteor.users.update({ _id: userId }, { $set: {"timer.current_activity": activityId }});
		    });
		},

		'userActivity.updateTime' (userId, activityId) {
		    UserActivities.update({ user_id: userId, _id: activityId }, {
		        $inc: {
		            total_time: 1000,
		            last_active: 1000
		        },
		    });
		},

	    'userActivity.insert'(ms, ticking) {
			TimerTime.upsert({user_id: Meteor.userId()}, {ms: ms, ticking: ticking});
		}

	});

}
