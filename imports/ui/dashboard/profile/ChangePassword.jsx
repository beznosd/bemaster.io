import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

class ChangePassword extends Component {

	stripTags(str) {
		return str.replace(/<\/?[^>]+>/gi, '');
	}

	changePassword() {
		var oldPassword = this.stripTags( this.refs.oldPassword.value.trim() );
		var newPassword = this.stripTags( this.refs.newPassword.value.trim() );
		var repeatNewPassword = this.stripTags( this.refs.repeatNewPassword.value.trim() );

		if ( !oldPassword || !newPassword || !repeatNewPassword ) {
			Materialize.toast('Please fill all fields', 3000);
			return;
		}

		if( newPassword.length < 8 ) {
			Materialize.toast('Password should be at least from 8 symbols', 3000);
			return;
		}
		
		if ( newPassword !== repeatNewPassword ) {
			Materialize.toast('Your passwords don\'t match!', 3000);
			return;
		}

		Accounts.changePassword(oldPassword, newPassword, function(err){
			if (err) {
				Materialize.toast(err.reason, 3000);
			} else {
				Materialize.toast('Password was successfully changed', 3000);
			}
		});

	}
	
	render() {
		return (
			<div className="main-info">
				<div className="row">
					<div className="input-field col s12">
						<input ref="oldPassword" id="oldPassword" type="password" className="validate" />
						<label for="oldPassword">Old password</label>
					</div>
					<div className="input-field col s12">
						<input ref="newPassword" id="newPassword" type="password" className="validate" />
						<label for="newPassword">New password</label>
					</div>
					<div className="input-field col s12">
						<input ref="repeatNewPassword" id="repeatNewPassword" type="password" className="validate" />
						<label for="repeatNewPassword">Repeat new password</label>
					</div>
					<div className="right-align input-field col s12">
						<a onClick={this.changePassword.bind(this)} className="save-btn waves-effect waves-light btn btn-block green">Save</a>
					</div>
				</div>
			</div>
		);
	}

}

export default ChangePassword;