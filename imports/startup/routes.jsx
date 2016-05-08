import React from 'react';
import { mount } from 'react-mounter';

// load Layout and Welcome React components
import MainLayout from '../ui/MainLayout.jsx';
import TimerButton from '../ui/TimerButton.jsx';
import Header from '../ui/Header.jsx';
import NotFound from '../ui/NotFound.jsx';

FlowRouter.route("/dashboard", {
	action() {
		mount(MainLayout, {
			content: (<TimerButton />)
		});
	}
});

FlowRouter.route("/", {
	action() {
		mount(MainLayout, {
			content: (<h1>Home page</h1>)
		});
	}
});

// Reaktor doensn't have a notFound component yet
FlowRouter.notFound = {
	action() {
		mount(MainLayout, { content: <NotFound /> });
	}
};