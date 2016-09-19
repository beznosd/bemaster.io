import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import classnames from 'classnames';

class TimerButton extends Component {

	constructor(props) {
		super(props);

        this.state = {
            ticking: false,
            ms: 0,
            intervalId: null
        };

	}

	getSeconds(ms) {
		return Math.floor(ms / 1000);
	}

	getMinutes(ms) {
		return Math.floor(this.getSeconds(ms) / 60);
	}

	getHours(ms) {
		return Math.floor(this.getMinutes(ms) / 60);
	}

	// minimeze font of nums if hours was appeared inside the timer
	minimizeNumsFont() {
		$( this.refs['timerNums'] ).css({'font-size':'4rem', 'height':'35%'});
	}

	// run or pause timer
	timer() {

		if ( this.state.ticking ) {

			// here was windows.intervalId instead of state.intervalId (see below in this condition)
			// window.i
			window.i = Meteor.setInterval(function(){

				if (!this.state.ticking) {
					Meteor.call('timerTime.insert', this.state.ms, this.state.ticking);
					Meteor.clearInterval(window.i);
					return;
				}

				let ms = this.state.ms + 1000;
				this.setState({ ms: ms });

				Meteor.call('timerTime.insert', this.state.ms, this.state.ticking);

			}.bind(this), 1000);

			this.setState({intervalId: intervalId});

		} else {
			Meteor.call('timerTime.insert', this.state.ms, this.state.ticking);
			Meteor.clearInterval(window.i);
		}

	}

	// run function timer() and show/hide neccessary elements
	toggleTimer() {

		// update state with data from DB before start timer
		this.updateComponentStates();

		if (this.state.ticking === false) {
			this.state.ticking = true;
		} else {
			this.state.ticking = false;
		}

		Meteor.call('timerTime.insert', this.state.ms, this.state.ticking);

		this.timer();

	}

	// update data on all clients' components
	componentWillReceiveProps(nextProps) {
		this.setState({ ticking: nextProps.timerTime[0].ticking });
		this.setState({ ms: nextProps.timerTime[0].ms });

		if ( this.getHours(nextProps.timerTime[0].ms) > 0) {
			this.minimizeNumsFont();
		}
	}

	// Update time states to recently logged time if it exists in db
	updateComponentStates() {
		if ( this.props.timerTime[0] && this.props.timerTime[0].ms) {
			this.setState({ ms: this.props.timerTime[0].ms });
		}
	}

	renderTime() {

		// at first launch render initial time (0ms)
		let ms = this.state.ms;
		// check for db data and apply it, if exists
		if ( this.props.timerTime[0] ) {
			ms = this.props.timerTime[0].ms;
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

		if (this.props.timerTime[0]) {

			var timerNumsClasses = classnames({
				hidden: !this.props.timerTime[0].ticking,
				'display-block': this.props.timerTime[0].ticking,
				'timer-nums': true,
				animated: true,
				zoomIn: true
			});
			var timerPauseTimeClasses = classnames({
				hidden: this.props.timerTime[0].ticking,
				'display-block': !this.props.timerTime[0].ticking,
				'timer-pause_time': true,
				animated: true,
				zoomIn: true
			});
			var timerStartArrowClasses = classnames({
				hidden: this.props.timerTime[0].ticking,
				'display-block': !this.props.timerTime[0].ticking,
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
						{this.renderTime()}
					</span>
				</span>
			</div>
		);

	}

}

TimerButton.PropTypes = {
	timerTime: PropTypes.array.isRequired
}

export default TimerButton;