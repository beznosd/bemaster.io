import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/routes.jsx';

import MainLayout from '../imports/ui/MainLayout.jsx';
import TimerButton from '../imports/ui/TimerButton.jsx';
import Header from '../imports/ui/Header.jsx';

Meteor.startup(() => {
	// render(<MainLayout />, document.getElementById('app'));
	// render(<Header />, document.getElementById('Header'));
	// render(<TimerButton />, document.getElementById('TimerButton'));
});
