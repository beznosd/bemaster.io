import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import classnames from 'classnames';

import { TimerTime } from '../../api/TimerTime.js';

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
		$( this.refs['timerNums'] ).css({'font-size':'4rem', 'height':'35%'});
	}

	// run or pause timer
	timer() {

		/*setTimeout(function(){
			Meteor.call('timerTime.insert', this.state.s, this.state.m, this.state.h, this.state.ticking);
		}.bind(this), 350);*/

		if ( this.state.ticking ) {

			window.i = Meteor.setInterval(function(){

				if (!this.state.ticking) {
					Meteor.call('timerTime.insert', this.state.s, this.state.m, this.state.h, this.state.ticking);
					Meteor.clearInterval(window.i);
					return;
				}

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

				Meteor.call('timerTime.insert', this.state.s, this.state.m, this.state.h, this.state.ticking);

			}.bind(this), 1000);

		} else {
			Meteor.call('timerTime.insert', this.state.s, this.state.m, this.state.h, this.state.ticking);
			Meteor.clearInterval(window.i);
		}
		
	}

	// run function timer() and show/hide neccessary elements
	toggleTimer() {

		// update state with data from DB before start timer
		this.updateComponentStates();

		if (this.state.ticking === false) {
			// this.startTimerView();
			this.state.ticking = true;
		} else {
			// this.pauseTimerView();
			this.state.ticking = false;
		}

		Meteor.call('timerTime.insert', this.state.s, this.state.m, this.state.h, this.state.ticking);

		this.timer();

	}

	// unused function
	startTimerView() {
		let timerNums = this.refs['timerNums'];
		let timerStartArrow = this.refs['timerStartArrow'];
		let timerPauseTime = this.refs['timerPauseTime'];

		$(timerStartArrow).removeClass('display-block').addClass('hidden');
		$(timerPauseTime).removeClass('display-block').addClass('hidden');

		$(timerNums).removeClass('hidden').addClass('display-block').animateCss('zoomIn');

	}

	// unsued function
	pauseTimerView() {
		let timerNums = this.refs['timerNums'];
		let timerStartArrow = this.refs['timerStartArrow'];
		let timerPauseTime = this.refs['timerPauseTime'];

		$(timerNums).removeClass('display-block').addClass('hidden');
		// console.log('test');
		// setTimeout(function() {
		$(timerStartArrow).removeClass('hidden').addClass('display-block').animateCss('zoomIn');
		$(timerPauseTime).removeClass('hidden').addClass('display-block').animateCss('zoomIn');
		// }, 150);
	}

	// update data on all clients' components
	componentWillReceiveProps(nextProps) {
		this.setState({ ticking: nextProps.timerTime[0].ticking });
		this.setState({ s: nextProps.timerTime[0].seconds });
		this.setState({ m: nextProps.timerTime[0].minutes });
		this.setState({ h: nextProps.timerTime[0].hours });

		if (nextProps.timerTime[0].hours > 0) {
			this.minimizeNumsFont();
		}
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
	updateComponentStates() {
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
		// console.log(this.state.ticking);
		// console.log(this.state.s);

		if (this.props.timerTime[0]) {

			const timerNumsClasses = classnames({
				hidden: !this.props.timerTime[0].ticking,
				'display-block': this.props.timerTime[0].ticking,
				'timer-nums': true,
				animated: true,
				zoomIn: true
			});
			const timerPauseTimeClasses = classnames({
				hidden: this.props.timerTime[0].ticking,
				'display-block': !this.props.timerTime[0].ticking,
				'timer-pause_time': true,
				animated: true,
				zoomIn: true 
			});
			const timerStartArrowClasses = classnames({
				hidden: this.props.timerTime[0].ticking,
				'display-block': !this.props.timerTime[0].ticking,
				'timer-start_arrow': true,
				animated: true,
				zoomIn: true 
			});

			return (
				<div className="row section">
					<div className="col s12">
						<div className="center-align timer-block">
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
					</div>
				</div>
			);

		} else {

			return (
				<div className="row section">
					<div className="col s12">
						<div className="center-align timer-block">
							<span onClick={this.toggleTimer.bind(this)} className="timer">
								<span ref="timerNums" className='timer-nums hidden' style={{display: ''}}>
									{this.renderTime()}
								</span>
								<div ref="timerStartArrow" className="timer-start_arrow" style={{display: ''}}>
									<i className="triangle"></i>
								</div>
								<span ref="timerPauseTime" className='timer-pause_time hidden' style={{display: ''}}>
									{this.renderTime()}
								</span>
							</span>
						</div>
					</div>
				</div>
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
	};
}, TimerButton);