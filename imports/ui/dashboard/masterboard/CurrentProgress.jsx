import React, { Component } from 'react';
// <<<<<<< HEAD
import TimerButton from './TimerButton.jsx';
import TotalTimeChart from './TotalTimeChart.jsx';
import Page from './awesomeChartsContainer.jsx';
// Meteor.startup(() => {
// 	render(<TotalTimeChart />, document.getElementById('TotalTimeChart'));
// 	render(<TimerButton />, document.getElementById('TimerButton'));
// =======

class CurrentProgress extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<h1 className="test-tab-content">Current Progress</h1>
				<TotalTimeChart timerTime={this.props.timerTime}/>
				<Page/>
			</div>
		);
	}

}

export default CurrentProgress;
