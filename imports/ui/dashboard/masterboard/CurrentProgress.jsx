import React, { Component } from 'react';
// <<<<<<< HEAD
import TimerButton from './TimerButton.jsx';
import TotalTimeChart from './TotalTimeChart.jsx';
import CurrentProgressChart from './CurrentProgressChart.jsx';
import ActivitiesDivisionChart from './ActivitiesDivisionChart.jsx';
import Page from './awesomeChartsContainer.jsx';
// Meteor.startup(() => {
// 	render(<TotalTimeChart />, document.getElementById('TotalTimeChart'));
// 	render(<TimerButton />, document.getElementById('TimerButton'));
// 	render(<CurrentProgressChart />, document.getElementById('CurrentProgressChart'));
// 	render(<ActivitiesDivisionChart />, document.getElementById('ActivitiesDivisionChart'));
// =======

class CurrentProgress extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<h1 className="test-tab-content">Current Progress</h1>
				{/*<TotalTimeChart timerTime={this.props.timerTime}/>
				<CurrentProgressChart/>
				<ActivitiesDivisionChart/>*/}
				<TotalTimeChart timerTime={this.props.timerTime}/>
				<Page/>
			</div>
		);
	}

}

export default CurrentProgress;
