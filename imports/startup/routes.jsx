import React from 'react';
import { mount } from 'react-mounter';

// load Layout and Welcome React components
import MainLayout from '../ui/MainLayout.jsx';
import TimerButton from '../ui/TimerButton.jsx';
import Header from '../ui/Header.jsx';
import NotFound from '../ui/NotFound.jsx';
import HomePage from '../ui/HomePage.jsx';
import Login from '../ui/Login.jsx';
import SignUp from '../ui/SignUp.jsx'

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