import React, { Component } from 'react';

export default class TimerButton extends Component {

	toggleTimer() {
		// $('i.large').fadeOut(200);
		$('i.large').animateCss('bounce');
	}

	render() {
		return (
			<span onClick={this.toggleTimer.bind(this)} className="timer-button">
				<i className="large material-icons">play_arrow</i>
			</span>
		);
	}

}