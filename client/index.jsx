import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/routes.jsx';

import TimerButton from '../imports/ui/TimerButton.jsx';
import TotalTimeChart from '../imports/ui/TotalTimeChart.jsx';

Meteor.startup(() => {
	render(<TotalTimeChart />, document.getElementById('TotalTimeChart'));
	render(<TimerButton />, document.getElementById('TimerButton'));
});
