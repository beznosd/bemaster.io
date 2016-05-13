import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import LoggedInNav from './LoggedInNav.jsx';
import LoggedOutNav from './LoggedOutNav.jsx'

class Header extends Component {

	logout() {
		Meteor.logout((err) => {
			if ( err ) {
				Materialize.toast(err.reason, 4000);
			} else {
				FlowRouter.go('/');
			}
		});
	}

	render() {

		let navOptions = ( !! Meteor.userId() ) ? <LoggedInNav logout={this.logout} /> : <LoggedOutNav />;

		return (
			<nav className='nav-header'>
				{navOptions}
			</nav>
		);
		
	}

}

export default Header;
