import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

class MainSettings extends Component {

	stripTags(str) {
		return str.replace(/<\/?[^>]+>/gi, '');
	}

	saveMainSettings() {
		var alias = this.stripTags( this.refs.alias.value.trim() );
		var email = this.stripTags( this.refs.email.value.trim() );
		if (alias && email) {
			if (alias.length < 3) {
				Materialize.toast('Alias should be at least from 3 letters', 3000);
				return;
			}
			// send server request
			var userId = Meteor.userId();
			Meteor.call('user.addAlias', userId, alias, email, function(error, result){
				if (error) {
					Materialize.toast(error.reason, 3000);
				} else {
					Materialize.toast('Successfully Saved', 3000);
				}
			});
		} else {
			Materialize.toast('Please fill all fields to save new value(s)', 3000);
		}
	}

	render() {

		let labelAliasClass, labelEmailClass;
		
		if( this.props.username ) {
			labelAliasClass = classnames({
				active: true
			});
		} else {
			labelAliasClass = classnames({
				active: false
			});
		}

		if( this.props.email ) {
			labelEmailClass = classnames({
				active: true
			});
		} else {
			labelEmailClass = classnames({
				active: false
			});
		}

		return (
			<div className="main-info">
				<div className="row">
					<div className="input-field col s12">
						<input onChange={this.props.onChangeUsername} ref="alias" id="alias" type="text" className="validate" value={this.props.username ? this.props.username : ''} />
						<label className={labelAliasClass} for="alias">Your Master's Alias</label>
					</div>
					<div className="input-field col s12">
						<input onChange={this.props.onChangeEmail} ref="email" id="email" type="email" className="validate" value={this.props.email ? this.props.email : ''} />
						<label className={labelEmailClass} for="email">Your email</label>
					</div>
					<div className="right-align input-field col s12">
						<a onClick={this.saveMainSettings.bind(this)} className="save-btn waves-effect waves-light btn btn-block green">Save</a>
					</div>
				</div>
			</div>
		);
	}

}

export default MainSettings;