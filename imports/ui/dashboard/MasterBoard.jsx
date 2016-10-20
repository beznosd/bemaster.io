import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Tabs from './masterboard/Tabs.jsx';
import TimerButton from './masterboard/TimerButton.jsx';
import Activities from './masterboard/Activities.jsx'
import CurrentProgress from './masterboard/CurrentProgress.jsx';

import { TimerTime } from '../../api/TimerTime.js';
import { UserActivities } from '../../api/Activities.js';

class MasterBoard extends Component {

	constructor(props) {
		super(props);

        this.state = {
            timer: true,
            activities: false,
            currentProgress: false
        };
	}

	showElement(element) {
		if (element === 'timer') {
			this.setState({timer: true, activities: false, currentProgress: false});
		}
		if (element === 'activities') {
			this.setState({timer: false, activities: true, currentProgress: false});
		}
		if (element === 'progress') {
			this.setState({timer: false, activities: false, currentProgress: true});
		}
	}

	render() {

		return (
			<div className="master-board">
				<TimerButton
					hideButton={this.state.timer}
					userActivities={this.props.userActivities}
				/>

				{this.state.activities ? <Activities /> : ''}
				{this.state.currentProgress ? <CurrentProgress userActivities={this.props.userActivities}/> : ''}

				<Tabs showElement={this.showElement.bind(this)} />
			</div>
		);

	}

}

MasterBoard.PropTypes = {
	timerTime: PropTypes.array.isRequired,
	userActivities: PropTypes.array.isRequired
}

export default createContainer(() => {
	Meteor.subscribe('userActivities');
	return {
		userActivities: UserActivities.find({user_id: Meteor.userId()}).fetch()
	};
}, MasterBoard);
