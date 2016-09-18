import React from 'react';
import { mount } from 'react-mounter';

// load Layouts and Welcome React components

import MainLayout from '../ui/MainLayout.jsx';

import HomePage from '../ui/HomePage.jsx';

import Profile from '../ui/dashboard/Profile.jsx';
import MasterBoard from '../ui/dashboard/MasterBoard.jsx';

import Login from '../ui/account/Login.jsx';
import SignUp from '../ui/account/SignUp.jsx'

import NotFound from '../ui/NotFound.jsx';

// First we import some modules...
// import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

FlowRouter.route("/", {
	action() {
		mount(MainLayout, {
			content: <HomePage />
		});
	}
});

FlowRouter.route('/signup', {
	action() {
		mount(MainLayout, {
			content: <SignUp />
		});
	}
});

FlowRouter.route('/login', {
	action() {
		mount(MainLayout, {
			content: <Login />
		});
	}
});

FlowRouter.route('/logout', {
	action() {
		FlowRouter.go('/');
	}
});

FlowRouter.route("/profile", {
	action() {
		mount(MainLayout, {
			content: <Profile />
		});
	}
});

FlowRouter.route("/masterboard", {
	action() {
		mount(MainLayout, {
			content: <MasterBoard />
		});
	}
});

FlowRouter.notFound = {
	action() {
		mount(MainLayout, { content: <NotFound /> });
	}
};


// FlowRouter.route("/masterboard", {
// 	action() {
// 		mount(MainLayout, {
// 			content: (<Router history={hashHistory}>
// 						<Route path="/" component={MasterBoard}>
// 							<IndexRoute component={TimerButton} />
// 							<Route path="activities" component={Activities} />
// 						</Route>
// 					</Router>)
// 		});
// 	}
// });