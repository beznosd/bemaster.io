import React, { Component } from 'react';

// import TimerButton from './TimerButton.jsx';
import TotalTimeChart from './../topchart/TotalTimeChart.jsx';
import AwesomeChartsContainer from './AwesomeChartsContainer.jsx';

class Stats extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<h1 className="test-tab-content">Current Progress</h1>
				<TotalTimeChart timerTime={this.props.timerTime}/>
				<AwesomeChartsContainer/>
			</div>
		);
	}

}

export default Stats;
