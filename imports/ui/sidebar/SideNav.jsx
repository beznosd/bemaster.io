import React, { Component } from 'react';

class SideNav extends Component {

	componentDidMount() {
		$(".button-collapse").sideNav();
	}

	render() {
		return (
			<div className="side-navigation brown lighten-1">
				
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