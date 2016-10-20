import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import classnames from 'classnames';

class TimerButton extends Component {

	constructor(props) {
		super(props);

        this.state = {
            ticking: false,
            ms: 0,
        };
	}

	getSeconds(ms) {
		return Math.floor(ms / 1000) - (this.getMinutes(ms) * 60) - (this.getHours(ms) * 3600);
	}

	getMinutes(ms) {
		// 60000 = 1000ms * 60s
		return Math.floor(ms / 60000) - (this.getHours(ms) * 60);
	}

	getHours(ms) {
		// 3600000 = 1000ms * 60s * 60s
		return Math.floor(ms / 3600000);
	}

	// minimeze font of nums if hours was appeared inside the timer
	minimizeNumsFont() {
		$( this.refs['timerNums'] ).css({'font-size':'4rem', 'height':'35%'});
	}

	// run or pause timer
	timer() {

		if ( this.state.ticking ) {

			window.i = Meteor.setInterval(function(){

				if (!this.state.ticking) {
					Meteor.call('userActivities.switchActivity', this.props.userActivities[0]._id, this.state.ticking);
					Meteor.call('userActivity.trackTime', this.props.userActivities[0]._id, this.state.ms);

					Meteor.clearInterval(window.i);
					return;
				}

				let ms = this.state.ms + 1000;
				this.setState({ ms: ms });

				Meteor.call('userActivities.switchActivity', this.props.userActivities[0]._id, this.state.ticking);
				Meteor.call('userActivity.trackTime', this.props.userActivities[0]._id, this.state.ms);

			}.bind(this), 1000);

		} else {
			Meteor.call('userActivities.switchActivity', this.props.userActivities[0]._id, this.state.ticking);
			Meteor.call('userActivity.trackTime', this.props.userActivities[0]._id, this.state.ms);

			Meteor.clearInterval(window.i);
		}

	}

	// run function timer() and show/hide neccessary elements
	toggleTimer() {

		// update state with data from DB before start timer
		this.updateComponentStates();

		this.state.ticking = !this.state.ticking;

		Meteor.call('userActivities.switchActivity', this.props.userActivities[0]._id, this.state.ticking);
		Meteor.call('userActivity.trackTime', this.props.userActivities[0]._id, this.state.ms);

		this.timer();

	}

	//this.props.userActivities

	// update data on all clients' components
	componentWillReceiveProps(nextProps) {
		this.setState({ ticking: nextProps.userActivities[0].ticking });
		this.setState({ ms: nextProps.userActivities[0].total_time });

		if ( this.getHours(nextProps.userActivities[0].total_time) > 0) {
			this.minimizeNumsFont();
		}
	}

	// Update time states to recently logged time if it exists in db
	updateComponentStates() {
		if ( this.props.userActivities[0] && this.props.userActivities[0].total_time) {
			this.setState({ ms: this.props.userActivities[0].total_time });
		}
	}

	renderTime() {

		// at first launch render initial time (0ms)
		let ms = this.state.ms;
		// check for db data and apply it, if exists
		if ( this.props.userActivities[0] ) {
			ms = this.props.userActivities[0].total_time;
		}

		let seconds = this.getSeconds(ms);
		let minutes = this.getMinutes(ms);
		let hours = this.getHours(ms);

		seconds = ( seconds >= 1 ) ? seconds : 0 ;
		minutes = ( minutes >= 1 ) ? minutes : 0 ;
		hours = ( hours >= 1 ) ? hours : 0 ;

		return (
			<span>{hours ? hours + ':' : ''}
			{hours ? ( (minutes < 10) ? '0' + minutes + ':' : minutes + ':' ) : ( minutes ? minutes + ':' : '' )}
			{(seconds < 10) ? '0'+seconds : seconds}</span>
		);

	}

	render() {

		const timerButtonClasses = classnames({
			hide: !this.props.hideButton,
			'center-align': true,
			'timer-block': true
		});

		if (this.props.userActivities[0]) {

			var timerNumsClasses = classnames({
				hidden: !this.props.userActivities[0].ticking,
				'display-block': this.props.userActivities[0].ticking,
				'timer-nums': true,
				animated: true,
				zoomIn: true
			});
			var timerPauseTimeClasses = classnames({
				hidden: this.props.userActivities[0].ticking,
				'display-block': !this.props.userActivities[0].ticking,
				'timer-pause_time': true,
				animated: true,
				zoomIn: true
			});
			var timerStartArrowClasses = classnames({
				hidden: this.props.userActivities[0].ticking,
				'display-block': !this.props.userActivities[0].ticking,
				'timer-start_arrow': true,
				animated: true,
				zoomIn: true
			});

		} else {

			var timerNumsClasses = classnames({
				hidden: true,
				'timer-nums': true,
			});
			var timerPauseTimeClasses = classnames({
				hidden: true,
				'timer-pause_time': true,
			});
			var timerStartArrowClasses = classnames({
				'timer-start_arrow': true,
			});

		}

		return (

			<div className={timerButtonClasses}>
				<span onClick={this.toggleTimer.bind(this)} className="timer">
					<span ref="timerNums" className={timerNumsClasses} style={{display: ''}}>
						{this.renderTime()}
					</span>
					<div ref="timerStartArrow" className={timerStartArrowClasses} style={{display: ''}}>
						<i className="triangle"></i>
					</div>
					<span ref="timerPauseTime" className={timerPauseTimeClasses} style={{display: ''}}>
						{this.state.ms !== 0 ? this.renderTime() : ''}
					</span>
				</span>
			</div>
		);

	}

}

/*TimerButton.PropTypes = {
	timerTime: PropTypes.array.isRequired
}*/

export default TimerButton;
