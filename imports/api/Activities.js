import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { Accounts } from 'meteor/accounts-base';

if( Meteor.isServer ) {

	Meteor.publish('userActivities', () => {
		return Activities.find({user_id: this.userId});
	});

	Meteor.methods({
    'activities.addActivity'(userId, activity) {
			Activities.insert({
        user_id: userId,
        activity_name: activity.name,
        time_spent: activity.timeSpent,
        createdAt: Date.now()
      });
		},
    'activities.startActivity'(userId) {
			Activities.update({user_id: userId}, {
        started_at: Date.now(),
        last_active: Date.now()
      });
		},
    'activity.updateTime'(userId, activityId) {
      Activities.update({user_id: userId, _id: activityId}, {
        $inc: {
          time_spent: 1000,
          last_active: 1000
        },
      });
    }
	});

	// Defining schema for Meteor.activities collection

	let Activities = new Meteor.Collection( 'Activities' );

	let Activity = new SimpleSchema({
		user_id: {
  		type: String,
      optional: false,
    },
    activity_name: {
  		type: String,
      optional: false
    },
    time_spent: {
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


	Activities.attachSchema(Activity);

}
