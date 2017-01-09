import React from 'react';
import { mount } from 'react-mounter';

import App from './../ui/App.jsx';
import HomePage from './../ui/homepage/HomePage.jsx';
import Profile from './../ui/app/dashboard/profile/Profile.jsx';
import MasterBoard from './../ui/app/dashboard/masterboard/MasterBoard.jsx';
import Login from './../ui/account/Login.jsx';
import SignUp from './../ui/account/SignUp.jsx';
import NotFound from './../ui/errors/404.jsx';

FlowRouter.route('/', {
  action() {
    mount(App, {
      content: <HomePage />
    });
  }
});

FlowRouter.route('/signup', {
  action() {
    mount(App, {
      content: <SignUp />
    });
  }
});

FlowRouter.route('/login', {
  action() {
    mount(App, {
      content: <Login />
    });
  }
});

FlowRouter.route('/logout', {
  action() {
    FlowRouter.go('/');
  }
});

FlowRouter.route('/profile', {
  action() {
    mount(App, {
      content: <Profile />
    });
  }
});

FlowRouter.route('/masterboard', {
  action() {
    mount(App, {
      content: <MasterBoard />
    });
  }
});

FlowRouter.notFound = {
  action() {
    mount(App, { content: <NotFound /> });
  }
};