import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
  onSubmit(evt) {
    evt.preventDefault();
    
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    if (!email || !password) {
      Materialize.toast('Please fill all fields!', 3000);
      return false;
    }

    Meteor.loginWithPassword(email, password, (err) => {
      if ( err ) {
        Materialize.toast(err.reason, 3000);
      } else {
        FlowRouter.go('/dashboard');
      }
    });
  }

  render() {
    return (
      <div className="row">
        <h4 className="center-align">Login Into Account</h4>
        <form onSubmit={this.onSubmit.bind(this)} className="col offset-s4 s4">
          <div className="row">
            <div className="input-field col s12">
              <input ref="email" id="email" type="email" className="validate" />
              <label htmlFor="email" data-error="wrong">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input ref="password" id="password" type="password" className="validate" />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <button className="waves-effect waves-light btn btn-block green btn-login-signup">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;