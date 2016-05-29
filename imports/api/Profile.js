import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';

if( Meteor.isServer ) {

	Meteor.publish('userData', () => {
		return Meteor.users.find({_id: this.userId});
	});

	Meteor.methods({

		'user.addAlias'(userId, alias) {
			Accounts.setUsername( userId, alias );
		}

	});

}

