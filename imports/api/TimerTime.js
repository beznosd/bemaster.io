import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const TimerTime = new Mongo.Collection('timerTime');

if( Meteor.isServer ) {
	Meteor.publish('timerTime', () => {
		return TimerTime.find({userId: 1});
	});
}

Meteor.methods({

	'timerTime.insert'(ms, ticking) {
		// TimerTime.upsert({userId: 1}, {seconds: seconds, minutes: minutes, hours: hours, userId: 1, ticking: ticking});
		TimerTime.upsert({userId: 1}, {ms: ms, userId: 1, ticking: ticking});
	}

});
