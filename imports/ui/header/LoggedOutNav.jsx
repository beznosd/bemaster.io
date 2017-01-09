import React, { Component } from 'react';

class LoggedOutNav extends Component {
  render() {
    return (
      <div className="nav-wrapper">
        <a href="/">
          <img src="/bemaster-logo-small.png" height="64" alt="BeMaster.io logo" />
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="/signup">Sign Up</a></li>
        </ul>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="/login">Login</a></li>
        </ul>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="/">Home</a></li>
        </ul>
      </div>
    );
  }
}

export default LoggedOutNav;