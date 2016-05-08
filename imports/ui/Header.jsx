import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class Header extends Component {

	render() {
		return (
			<nav className='nav-header'>
				<div className="nav-wrapper">
					<a href="/">
						<img src="/bemaster-logo-small.png" height="64" alt="BeMaster.io logo" description="BeMaster.io logo"/>
					</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><a href="#">Logout</a></li>
					</ul>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><a href="/login">Sign Up</a></li>
					</ul>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><a href="/login">Sing In</a></li>
					</ul>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><a href="/dashboard">Dashboard</a></li>
					</ul>
				</div>
			</nav>
		);
	}

}

export default Header;
