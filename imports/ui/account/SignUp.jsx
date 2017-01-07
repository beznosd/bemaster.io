import React, { Component } from 'react';

class SignUp extends Component {

	onSubmit(evt) {
		evt.preventDefault();

		var email = this.refs.email.value;
		var password = this.refs.password.value;
		var confirmPassword = this.refs.confirmPassword.value;

		if( !email || !password || !confirmPassword ) {
			Materialize.toast('Please fill all fields!', 3000);
			return false;
		}

		if( password !== confirmPassword ) {
			Materialize.toast('Your passwords don\'t match!', 3000);
			return false;
		}

		if( password.length < 8 ) {
			Materialize.toast('Password should be at least from 8 symbols', 3000);
			return;
		}

		if( password !== confirmPassword ) {
			Materialize.toast('Your passwords don\'t match!', 3000);
			return false;
		}

		Accounts.createUser({email, password}, (err) => {
			if ( err ) {
				Materialize.toast(err.reason, 3000);
			} else {
				FlowRouter.go('/masterboard');
			}
		});

	}

	render() {
		return (
			<div className="row">
				<h4 className="center-align">Create An Account</h4>
				<form onSubmit={this.onSubmit.bind(this)} className="col offset-s4 s4">
					<div className="row">
						<div className="input-field col s12">
							<input ref="email" id="email" type="text" />
							<label htmlFor="email">Email</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input ref="password" id="password" type="password" className="validate" />
							<label htmlFor="password">Password</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input ref="confirmPassword" id="confirmPassword" type="password" className="validate" />
							<label htmlFor="confirmPassword">Confirm Password</label>
						</div>
					</div>
					<div className="row">
						<button className="waves-effect waves-light btn btn-block green btn-login-signup">Sign Up</button>
					</div>
				</form>
			</div>
		);
	}

}

export default SignUp;