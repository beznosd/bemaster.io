import React, { Component } from 'react';

export default class TimerButton extends Component {

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

			i = setInterval(function(){
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
			}.bind(this), 1000);

		} else {
			clearInterval(i);
		}

	}

	// run function timer() and show/hide neccessary elements
	toggleTimer() {
		let timerNums = this.refs['timerNums'];
		let timerStartArrow = this.refs['timerStartArrow'];
		let timerPauseTime = this.refs['timerPauseTime'];

		if (this.state.ticking === false) {

			$(timerStartArrow).fadeOut(150);
			$(timerPauseTime).fadeOut(150);

			setTimeout(function() {
				// $('.timer-nums').show().animateCss('zoomIn');
				// this.refs['timerNums'].show().animateCss('zoomIn');
				$(timerNums).show().animateCss('zoomIn');
			}, 150);

			this.state.ticking = true;

		} else {

			// $('.timer-nums').fadeOut(150);
			$(timerNums).fadeOut(150);
			setTimeout(function() {
				$(timerStartArrow).show().animateCss('zoomIn');
				$(timerPauseTime).show().animateCss('zoomIn');
			}, 150);

			this.state.ticking = false;

		}

		this.timer();
	}

	render() {
		return (
			<span onClick={this.toggleTimer.bind(this)} className="timer">
				<span ref="timerNums" className="timer-nums">
					{this.state.h ? this.state.h + ':' : ''}
					{this.state.h ? ( (this.state.m < 10) ? '0' + this.state.m + ':' : this.state.m + ':' ) : ( this.state.m ? this.state.m + ':' : '' )}
					{(this.state.s < 10) ? '0'+this.state.s : this.state.s}
				</span>
				<i ref="timerStartArrow" className="timer-start_arrow large material-icons">play_arrow</i>
				<span ref="timerPauseTime" className="timer-pause_time">
					{this.state.h ? this.state.h + ':' : ''}
					{this.state.h ? ( (this.state.m < 10) ? '0' + this.state.m + ':' : this.state.m + ':' ) : ( this.state.m ? this.state.m + ':' : '' )}
					{(this.state.s < 10) ? '0'+this.state.s : this.state.s}
				</span>
			</span>
		);
	}

}