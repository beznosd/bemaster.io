import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/routes.jsx';

import TimerButton from '../imports/ui/TimerButton.jsx';

Meteor.startup(() => {
	render(<TimerButton />, document.getElementById('TimerButton'));
});


