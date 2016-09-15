import React, { Component } from 'react';

import Header from './top_navbar/Header.jsx';
import SideNav from './sidebar/SideNav.jsx';

class MainLayout extends Component {

	render() {

		const sideNav = ( !! Meteor.userId() ) ? <SideNav /> : '';
		const containerClass = ( !! Meteor.userId() ) ? 'dashboard-container' : 'container';

		return (
			<div className="main-layout">
				<Header />
				{sideNav}
				<main className={containerClass}>
					{this.props.content}
				</main>
			</div>
		);
	}

}

export default MainLayout;