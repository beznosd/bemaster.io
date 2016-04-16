import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import classnames from 'classnames';

import { TimerTime } from '../api/TimerTime.js';

class TimerButton extends Component {

	constructor(props) {
		super(props);

        this.state = {
            ticking: false,
            s: 0,
            m: 0,
            h: 0
        };
	}

	// minimeze font of nums if hours was appeared inside the timer
	minimizeNumsFont() {
		$('.timer-nums').css({'font-size':'4rem', 'height':'35%'});
	}

	// run or pause timer
	timer() {

		if ( this.state.ticking ) {

			i = Meteor.setInterval(function(){
				if( this.state.s < 59 ) {
					let s = this.state.s + 1;
					this.setState({s: s});
				} else if( this.state.m < 59 ) {
					let m = this.state.m + 1;
					this.setState({s: 0, m: m});
				} else if ( this.state.m == 59) {
					let h = this.state.h + 1;
					this.setState({s: 0, m: 0, h: h});
				}
				if (this.state.h >= 1) {
					this.minimizeNumsFont();
				}

				Meteor.call('timerTime.insert', this.state.s, this.state.m, this.state.h, this.state.ticking);

			}.bind(this), 1000);

		} else {
			Meteor.call('timerTime.insert', this.state.s, this.state.m, this.state.h, this.state.ticking);

			Meteor.clearInterval(i);
		}
		
	}

	// run function timer() and show/hide neccessary elements
	toggleTimer() {

		if (this.state.ticking === false) {
			this.startTimerView();
			// update state with data from DB before start timer
			this.updateTimeStates();

			this.state.ticking = true;
		} else {
			this.pauseTimerView();

			this.state.ticking = false;
		}

		this.timer();
	}

	startTimerView() {
		let timerNums = this.refs['timerNums'];
		let timerStartArrow = this.refs['timerStartArrow'];
		let timerPauseTime = this.refs['timerPauseTime'];

		$(timerStartArrow).fadeOut(150);
		$(timerPauseTime).fadeOut(150);

		setTimeout(function() {
			$(timerNums).show().animateCss('zoomIn');
		}, 150);
	}

	pauseTimerView() {
		let timerNums = this.refs['timerNums'];
		let timerStartArrow = this.refs['timerStartArrow'];
		let timerPauseTime = this.refs['timerPauseTime'];

		$(timerNums).fadeOut(150);
		
		setTimeout(function() {
			$(timerStartArrow).show().animateCss('zoomIn');
			$(timerPauseTime).show().animateCss('zoomIn');
		}, 150);
	}

	componentWillReceiveProps(nextProps) {
		// console.log(this.state.ticking);
		this.setState({ticking: nextProps.timerTime[0].ticking});
		// console.log(this.state.ticking);
		// console.log(nextProps);
	}


	renderTime() {
		// at first launch render time from DB, then when timer will work will, work this
		if ( this.props.timerTime[0] ) {
			let seconds = this.props.timerTime[0].seconds;
			let minutes = this.props.timerTime[0].minutes;
			let hours = this.props.timerTime[0].hours;
			return (
				<span>{hours ? hours + ':' : ''}
				{hours ? ( (minutes < 10) ? '0' + minutes + ':' : minutes + ':' ) : ( minutes ? minutes + ':' : '' )}
				{(seconds < 10) ? '0'+seconds : seconds}</span>
			);
		// at first launch render initial time 0:0:0
		} else {
			return (
				<span>{this.state.h ? this.state.h + ':' : ''}
				{this.state.h ? ( (this.state.m < 10) ? '0' + this.state.m + ':' : this.state.m + ':' ) : ( this.state.m ? this.state.m + ':' : '' )}
				{(this.state.s < 10) ? '0'+this.state.s : this.state.s}</span>
			);
		}
	}

	// Update time states to recently logged time if it exists in db 
	updateTimeStates() {
		if ( this.props.timerTime[0] ) {
			if ( this.props.timerTime[0].seconds ) {
				this.setState({ s: this.props.timerTime[0].seconds });
			}
			if ( this.props.timerTime[0].minutes ) {
				this.setState({ m: this.props.timerTime[0].minutes });
			}
			if ( this.props.timerTime[0].hours ) {
				this.setState({ h: this.props.timerTime[0].hours });
			}
			if ( this.props.timerTime[0].ticking ) {
				this.setState({ticking: this.props.timerTime[0].ticking});
			}
		}
	}

	render() {
		if (this.props.timerTime[0]) {

			// console.log(this.props.timerTime[0].ticking);

			const timerNumsClasses = classnames({
				hidden: !this.props.timerTime[0].ticking,
				'display-block': this.props.timerTime[0].ticking,
				'timer-nums': true
			});
			const timerPauseTimeClasses = classnames({
				hidden: this.props.timerTime[0].ticking,
				'display-block': !this.props.timerTime[0].ticking,
				'timer-pause_time': true
			});
			const timerStartArrowClasses = classnames({
				hidden: this.props.timerTime[0].ticking,
				'display-block': !this.props.timerTime[0].ticking,
				'timer-start_arrow': true,
			});

			return (
				<span onClick={this.toggleTimer.bind(this)} className="timer">
					<span ref="timerNums" className={timerNumsClasses}>
						{this.renderTime()}
					</span>
					<div ref="timerStartArrow" className={timerStartArrowClasses}>
						<i className="triangle"></i>
					</div>
					<span ref="timerPauseTime" className={timerPauseTimeClasses}>
						{this.renderTime()}
					</span>
				</span>
			);

		} else {

			return (
				<span onClick={this.toggleTimer.bind(this)} className="timer">
					<span ref="timerNums" className='timer-nums hidden'>
						{this.renderTime()}
					</span>
					<div ref="timerStartArrow" className="timer-start_arrow">
						<i className="triangle"></i>
					</div>
					<span ref="timerPauseTime" className='timer-pause_time hidden'>
						{this.renderTime()}
					</span>
				</span>
			);

		}
	}

}

TimerButton.PropTypes = {
	timerTime: PropTypes.array.isRequired
}

export default createContainer(() => {
	Meteor.subscribe('timerTime');

	return {
		timerTime: TimerTime.find({userId: 1}).fetch(),
		// ticking: TimerTime.find({userId: 1}, {fields: {ticking: 1}}).fetch()
	};
}, TimerButton);