// Core
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// Collections
import { UserActivities } from '../api/Activities.js';

// Components
import Header from './top_navbar/Header.jsx';
import SideNav from './sidebar/SideNav.jsx';

class MainLayout extends Component {

	render() {

		const sideNav = ( !! Meteor.userId() ) ? <SideNav /> : '';
		const containerClass = ( !! Meteor.userId() ) ? 'dashboard-container' : 'container';

		console.log(this.props.userActivities);

		let activityName = this.props.userActivities[0] ? this.props.userActivities[0].activity_name : '';

		return (
			<div className="main-layout">
				<Header activityName={activityName}/>
				{sideNav}
				<main className={containerClass}>
					{this.props.content}
				</main>
			</div>
		);
	}

}

export default createContainer(() => {
	Meteor.subscribe('userActivities', Meteor.userId());
	return {
		userActivities: UserActivities.find({user_id: Meteor.userId()}).fetch()
	};
}, MainLayout);

// export default MainLayout;
