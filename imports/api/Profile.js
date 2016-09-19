import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { Accounts } from 'meteor/accounts-base';

if( Meteor.isServer ) {

	Meteor.publish('userData', () => {
		return Meteor.users.find({_id: this.userId});
	});


	Meteor.methods({

		'user.addAlias'(userId, alias, email) {
			// Accounts.setUsername( userId, alias );
			Meteor.users.update(userId, {
				$set: {
					username: alias,
					'emails.0.address': email
				}
			});
		},

		'user.saveAvatar'(blob, name, path, encoding) {
			// Accounts.setUsername( userId, alias );
			// return 'result';
			var path = cleanPath(path), fs = Npm.require('fs'),
				name = cleanName(name || 'file'), encoding = encoding || 'binary',
				chroot = 'public';
			// Clean up the path. Remove any initial and final '/' -we prefix them-,
			// any sort of attempt to go to the parent directory '..' and any empty directories in
			// between '/////' - which may happen after removing '..'

			path = '/var/www/html/bemaster.io/'+ chroot + (path ? '/' + path + '/' : '/') + name;
			//return path;
			// TODO Add file existance checks, etc...
			fs.writeFile(path, blob, encoding, function(err) {
				if (err) {
					throw (new Meteor.Error(500, 'Failed to save file.', err));
				} else {
					return 'The file ' + name + ' (' + encoding + ') was saved to ' + path;
				}
			});

			function cleanPath(str) {
				if (str) {
					return str.replace(/\.\./g,'').replace(/\/+/g,'').replace(/^\/+/,'').replace(/\/+$/,'');
				}
			}
			function cleanName(str) {
				return str.replace(/\.\./g,'').replace(/\//g,'');
			}
		}

	});


	Accounts.onCreateUser((options, user) => {
		user.activities = [];
		user.timer = {
			ms: 0,
			ticking: false,
			current_activity: ''
		};
		return user;
	});


	let Schema = {};

	Schema.UserCountry = new SimpleSchema({
	    name: {
	        type: String
	    },
	    code: {
	        type: String,
	        regEx: /^[A-Z]{2}$/
	    }
	});

	Schema.UserProfile = new SimpleSchema({
	    firstName: {
	        type: String,
	        optional: true
	    },
	    lastName: {
	        type: String,
	        optional: true
	    },
	    birthday: {
	        type: Date,
	        optional: true
	    },
	    gender: {
	        type: String,
	        allowedValues: ['Male', 'Female'],
	        optional: true
	    },
	    organization : {
	        type: String,
	        optional: true
	    },
	    website: {
	        type: String,
	        regEx: SimpleSchema.RegEx.Url,
	        optional: true
	    },
	    bio: {
	        type: String,
	        optional: true
	    },
	    country: {
	        type: Schema.UserCountry,
	        optional: true
	    }
	});

	Schema.User = new SimpleSchema({
		username: {
			type: String,
	        // For accounts-password, either emails or username is required, but not both. It is OK to make this
	        // optional here because the accounts-password package does its own validation.
	        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
	        optional: true,
	        min: 3
	    },
	    emails: {
	    	type: Array,
	        // For accounts-password, either emails or username is required, but not both. It is OK to make this
	        // optional here because the accounts-password package does its own validation.
	        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
	        optional: true
	    },
	    "emails.$": {
	    	type: Object
	    },
	    "emails.$.address": {
	    	type: String,
	    	regEx: SimpleSchema.RegEx.Email
	    },
	    "emails.$.verified": {
	    	type: Boolean
	    },
	    // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
	    registered_emails: {
	    	type: [Object],
	    	optional: true,
	    	blackbox: true
	    },
	    createdAt: {
	    	type: Date
	    },
	    profile: {
	    	type: Schema.UserProfile,
	    	optional: true
	    },
	    // Make sure this services field is in your schema if you're using any of the accounts packages
	    services: {
	    	type: Object,
	    	optional: true,
	    	blackbox: true
	    },
	    // Add `roles` to your schema if you use the meteor-roles package.
	    // Option 1: Object type
	    // If you specify that type as Object, you must also specify the
	    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
	    // Example:
	    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
	    // You can't mix and match adding with and without a group since
	    // you will fail validation in some cases.
	    roles: {
	    	type: Object,
	    	optional: true,
	    	blackbox: true
	    },
	    // Option 2: [String] type
	    // If you are sure you will never need to use role groups, then
	    // you can specify [String] as the type
	    roles: {
	    	type: [String],
	    	optional: true
	    },
	    // In order to avoid an 'Exception in setInterval callback' from Meteor
	    heartbeat: {
	    	type: Date,
	    	optional: true
	    },
			timer: {
				type: Object,
				optional: false,
				blackbox: true
			},
	    // aditional aplication user data (activities, etc.)
	    activities: {
	    	type: [String],
	    	optional: true
	    }
});

	Meteor.users.attachSchema(Schema.User);

}
