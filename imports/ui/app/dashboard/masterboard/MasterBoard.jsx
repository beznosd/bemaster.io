import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Tabs from './tabs/Tabs.jsx';
import TimerButton from './timer/TimerButton.jsx';
import Activities from './activities/Activities.jsx';
import Stats from './stats/Stats.jsx';

import { TimerTime } from './../../../../api/TimerTime.js';
import { UserActivities } from './../../../../api/Activities.js';

class MasterBoard extends Component {
  constructor(props) {
    super(props);

    this.showElement = this.showElement.bind(this);

    this.state = {
      timer: true,
      activities: false,
      currentProgress: false
    };
  }

  showElement(element) {
    if (element === 'timer') {
      this.setState({ timer: true, activities: false, currentProgress: false });
    }
    if (element === 'activities') {
      this.setState({ timer: false, activities: true, currentProgress: false });
    }
    if (element === 'progress') {
      this.setState({ timer: false, activities: false, currentProgress: true });
    }
  }

  render() {
    return (
      <div className="master-board">
        <TimerButton 
          hideButton={this.state.timer} 
          timerTime={this.props.timerTime} 
          userActivities={this.props.userActivities}
        />
        
        {this.state.activities ? <Activities /> : ''}
        {this.state.currentProgress ? <Stats timerTime={this.props.timerTime} /> : ''}

        <Tabs showElement={this.showElement} />
      </div>
    );
  }
}

MasterBoard.PropTypes = {
  timerTime: PropTypes.array.isRequired,
  userActivities: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('timerTime');
  Meteor.subscribe('userActivities');
  return {
    timerTime: TimerTime.find({ userId: 1 }).fetch(),
    userActivities: UserActivities.find({ user_id: Meteor.userId() }).fetch()
  };
}, MasterBoard);
