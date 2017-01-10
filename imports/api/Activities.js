import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const UserActivities = new Mongo.Collection('userActivities');

// Defining schema for userActivities collection
const userActivity = new SimpleSchema({
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

if (Meteor.isServer) {
  Meteor.publish('userActivities', function() {
    return UserActivities.find({ user_id: this.userId });
  });

  Meteor.methods({
    'userActivities.addActivity'(userId, activity) {
      UserActivities.insert({
        user_id: userId,
        activity_name: activity.name,
        ticking: false,
        total_time: activity.totalTime,
        createdAt: Date.now()
      }, (err, result) => {
        Meteor.users.update({ _id: userId }, { $push: { activities: result } });
      });
    },

    'userActivities.startActivity'(userId, activityId) {
      UserActivities.update({ user_id: userId }, {
        $set: {
          started_at: Date.now(),
          last_active: Date.now(),
          ticking: true
        }
      }, (err, result) => {
        Meteor.users.update({ _id: userId }, { $set: { 'timer.current_activity': activityId } });
      });
    },

    'userActivities.switchActivity'(activityId, ticking) {
      // update ticking state
      UserActivities.update({ _id: activityId }, {
        $set: {
          ticking
        }
      });
    },

    'userActivity.trackTime'(activityId, ms) {
      UserActivities.update({ _id: activityId }, {
        $set: {
          total_time: ms,
          last_active: Date.now()
        }
      });
      if (ms === 0) {
        UserActivities.update({ _id: activityId }, {
          $set: {
            started_at: Date.now()
          }
        });
      }
    }
  });
}
