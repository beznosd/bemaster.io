import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import TotalTimeChart from '../imports/ui/Chart.jsx';

Meteor.startup(() => {
  render(<TotalTimeChart />, document.getElementById('TotalTimeChart'));
});
