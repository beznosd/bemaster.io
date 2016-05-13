import React from 'react';
import { mount } from 'react-mounter';

// load Layouts and Welcome React components

import MainLayout from '../ui/MainLayout.jsx';

import HomePage from '../ui/HomePage.jsx';

import TimerButton from '../ui/dashboard/TimerButton.jsx';

import Login from '../ui/account/Login.jsx';
import SignUp from '../ui/account/SignUp.jsx'

import NotFound from '../ui/NotFound.jsx';

FlowRouter.route("/", {
	action() {
		mount(MainLayout, {
			content: (<HomePage />)
		});
	}
});

FlowRouter.route('/signup', {
	action() {
		mount(MainLayout, {
			content: (<SignUp />)
		});
	}
});

FlowRouter.route('/login', {
	action() {
		mount(MainLayout, {
			content: (<Login />)
		});
	}
});


FlowRouter.route("/dashboard", {
	action() {
		mount(MainLayout, {
			content: (<TimerButton />)
		});
	}
});

// Reaktor doensn't have a notFound component yet
FlowRouter.notFound = {
	action() {
		mount(MainLayout, { content: <NotFound /> });
	}
};