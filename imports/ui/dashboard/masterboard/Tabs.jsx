import React, { Component } from 'react';

class Tabs extends Component {

	componentDidMount() {
		$('ul.tabs').tabs();
	}

	showTimer() {
		this.props.showElement('timer');
	}
	
	showActivities() {
		this.props.showElement('activities');
	}

	showCurrentProgress() {
		this.props.showElement('progress');
	}
	
	render() {
		return (
			<div className="row tabs-row">
				<div className="offset-s2 col s8">
					{/*z-depth-1*/}
					<ul className="tabs">
						<li className="tab col s3"><a onClick={this.showCurrentProgress.bind(this)} className="green-text text-darken-2">Current Progress</a></li>
						<li className="tab col s3"><a onClick={this.showTimer.bind(this)} className="green-text text-darken-2 active">Timer</a></li>
						<li className="tab col s3"><a onClick={this.showActivities.bind(this)} className="green-text text-darken-2">Activities</a></li>
					</ul>
				</div>
			</div>
		);
	}

}

export default Tabs;