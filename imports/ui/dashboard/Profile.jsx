import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class Profile extends Component {

	constructor(props) {
		super(props);

        this.state = {
            username: '',
			email: ''
        };
	}

	componentDidMount() {
		$('.dropdown-button').dropdown();
	}

	componentWillReceiveProps(props) {
		this.setState({username: props.userData[0].username});
		this.setState({email: props.userData[0].emails[0].address});
	}

	onChangeUsername(evt) {
		this.setState({username: evt.target.value});
	}

	onChangeEmail(evt) {
		this.setState({email: evt.target.value});
	}

	stripTags(str) {
		return str.replace(/<\/?[^>]+>/gi, '');
	}

	validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}

	saveMainSettings() {
		// console.log(this.props.userData[0]);
		//return;
		var alias = this.stripTags( this.refs.alias.value.trim() );
		var email = this.stripTags( this.refs.email.value.trim() );
		if (alias && email) {
			if (alias.length < 3) {
				Materialize.toast('Alias should be at least from 3 letters', 3000);
				return;
			}
			// send server request
			var userId = Meteor.userId();
			Meteor.call('user.addAlias', userId, alias, function(error, result){
				if (error) {
					Materialize.toast(error.reason, 3000);
				} else {
					Materialize.toast('Successfully Saved', 3000);
				}
			});
			// Accounts.addEmail( userId, email );
		} else {
			Materialize.toast('Please fill all fields to save new value(s)', 3000);
		}
	}

	render() {
		let avtiveLabelClass =  this.props.userData[0] ? 'active' : '';

		return (
			<div className="profile-container">
				<h3>Tune Profile</h3>
				<div className="main-profile-settings">
					<div className="row">
						<div className="col s2">
							<div className="row avatar-row center-align">
								<div className="avatar">
									<i className="fa fa-user fa-5x"></i>
								</div>
							</div>
							<div className="row">
								<a className='dropdown-button btn btn-block blue-grey lighten-1' href='#' data-activates='settings'>Main Settings</a>
								<ul id='settings' className='dropdown-content'>
									<li><a href="#!">Main Settings</a></li>
									<li><a href="#!">Advanced settings</a></li>
									<li><a href="#!">Change password</a></li>
								</ul>
							</div>
						</div>
						<div className="col s6 offset-s1">
							<div className="main-info">
								<div className="row">
									<div className="input-field col s12">
										<input onChange={this.onChangeUsername.bind(this)} ref="alias" id="alias" type="text" className="validate" value={this.state.username} />
		          						<label className={avtiveLabelClass} for="alias">Your Master's Alias</label>
									</div>
									<div className="input-field col s12">
										<input onChange={this.onChangeEmail.bind(this)} ref="email" id="email" type="email" className="validate" value={this.state.email} />
		          						<label className={avtiveLabelClass} for="email">Your email</label>
									</div>
									<div className="right-align input-field col s12">
										<a onClick={this.saveMainSettings.bind(this)} className="save-btn waves-effect waves-light btn btn-block green">Save</a>
									</div>
								</div>
							</div>
						</div>
						{/*<div className="col s3">
							<ul className="collection">
								<a href="#!" className="collection-item"><i className="material-icons">label_outline</i>Main settings</a>
								<a href="#!" className="collection-item">Advanced settings</a>
								<a href="#!" className="collection-item">Change password</a>
							</ul>
						</div>*/}
					</div>
				</div>
			</div>
		);
	}

}

// export default Profile;

Profile.PropTypes = {
	userData: PropTypes.array.isRequired
}

export default createContainer(() => {
	Meteor.subscribe('userData');

	return {
		userData: Meteor.users.find({_id: Meteor.userId()}).fetch()
	};
}, Profile);