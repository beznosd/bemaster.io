import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import TimerButton from '../imports/ui/TimerButton.jsx';

Meteor.startup(() => {
	render(<TimerButton />, document.getElementById('timer-button-block'));
});


