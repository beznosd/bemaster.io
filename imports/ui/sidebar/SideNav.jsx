import React, { Component } from 'react';

class SideNav extends Component {

	componentDidMount() {
		window.onscroll = this.menuTopSticking.bind(this);
	}

	menuTopSticking() {
		let rootEl = this.refs.rootEl;
		if (window.pageYOffset >= 70) {
			rootEl.style.paddingTop = 0 + 'px';
		} else {
			rootEl.style.paddingTop = 70 - window.pageYOffset + 'px';
		}
	}

	render() {
		return (
			<div ref="rootEl" className="side-navigation brown lighten-1">
				
				<div className="user-link valign-wrapper">
					<img className="circle" src="/yuna.jpg" width="45" alt="User Name" />
					<h5 className="valign"><a href="/profile">Tune Profile</a></h5>
				</div>

				<div className="side-menu">
					<a className="side-menu_link" href="#">Mountain</a>
					<a className="side-menu_link" href="/masterboard">Master Board</a>
					<a className="side-menu_link" href="#">My Awards</a>
					<a className="side-menu_link" href="#">Groups</a>
				</div>

			</div>
		);
	}

}

export default SideNav;