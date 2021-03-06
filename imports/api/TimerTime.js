import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const TimerTime = new Mongo.Collection('timerTime');

if (Meteor.isServer) {
  Meteor.publish('timerTime', function() {
    return TimerTime.find({ userId: 1 });
  });
}

Meteor.methods({
  'timerTime.insert'(ms, ticking) {
    // console.log(Meteor.userId());
    // to do
    // update collection Activities, instead of total time
    TimerTime.upsert({ userId: 1 }, { ms: ms, userId: 1, ticking: ticking });
  }
});
