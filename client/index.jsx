import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/routes.jsx';

Meteor.startup(() => {
	// render(<MainLayout />, document.getElementById('app'));
	// render(<Header />, document.getElementById('Header'));
	// render(<TimerButton />, document.getElementById('TimerButton'));
});
