import React, { Component } from 'react';

import Tabs from './masterboard/Tabs.jsx';
import TimerButton from './masterboard/TimerButton.jsx';
import Activities from './masterboard/Activities.jsx'
import CurrentProgress from './masterboard/CurrentProgress.jsx';

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
				{this.state.timer ? <TimerButton /> : ''}
				{this.state.activities ? <Activities /> : ''}
				{this.state.currentProgress ? <CurrentProgress /> : ''}
				{/*this.props.children*/}
				<Tabs showElement={this.showElement.bind(this)} />
			</div>
		);

	}

}

export default MasterBoard;