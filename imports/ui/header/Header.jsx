import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import LoggedInNav from './LoggedInNav.jsx';
import LoggedOutNav from './LoggedOutNav.jsx';

class Header extends Component {
  logout() {
    Meteor.logout((err) => {
      if (err) {
        Materialize.toast(err.reason, 4000);
      } else {
        FlowRouter.go('/logout');
      }
    });
  }

  render() {
    const navOptions = (!!Meteor.userId()) ? <LoggedInNav activityName={this.props.activityName} logout={this.logout} /> : <LoggedOutNav />;
    return (
      <nav className="nav-header">
        {navOptions}
      </nav>
    );
  }
}

export default Header;
