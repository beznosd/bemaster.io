import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';

import MainSettings from './profile/MainSettings.jsx';
import AdvancedSettings from './profile/AdvancedSettings.jsx';
import ChangePassword from './profile/ChangePassword.jsx';

class Profile extends Component {

	constructor(props) {
		super(props);

        this.state = {
            username: '',
			email: '',
			currentSettings: ''
        };
	}

	componentDidMount() {
		$('.dropdown-button').dropdown();

		if (this.props.userData[0]) {
			this.setState({username: this.props.userData[0].username});
			this.setState({email: this.props.userData[0].emails[0].address});
		}
	}

	componentWillReceiveProps(props) {
		if (props.userData[0]) {
			this.setState({username: props.userData[0].username});
			this.setState({email: props.userData[0].emails[0].address});
		}
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

	showChooseWindow() {
		$(this.refs.avatarInput).click();
	}

	saveAvatar(evt) {
		let formData = new FormData();
        let file = evt.target.files[0];
        let name = file.name;
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.onload = function(file) {
        	// console.log(file);
		    Meteor.call('user.saveAvatar', file.srcElement.result, name, '/.#avatars', 'binary', function(error, result){
		    	if (error) {
					Materialize.toast(error.reason, 3000);
				}
		    });
		}
	}

	changeSettingsComponent(evt) {
		// console.log(evt.target.innerText);
		this.refs.settingsFlag.innerText = evt.target.innerText;
		this.setState({currentSettings: $(evt.target).attr('data-settings')});
	}

	render() {
		
		let currentSettings;

		if( this.state.currentSettings === 'main' ) {
			currentSettings = <MainSettings username={this.state.username} email={this.state.email} onChangeEmail={this.onChangeEmail.bind(this)} onChangeUsername={this.onChangeUsername.bind(this)}/>;
		} else if ( this.state.currentSettings === 'changepass' ) {
			currentSettings = <ChangePassword />;
		} else {
			currentSettings = <MainSettings username={this.state.username} email={this.state.email} onChangeEmail={this.onChangeEmail.bind(this)} onChangeUsername={this.onChangeUsername.bind(this)}/>;
		}

		return (
			<div className="profile-container">
				<h3>Tune Profile</h3>
				<div className="main-profile-settings">
					<div className="row">
						<div className="col s2">
							<div className="row avatar-row center-align">
								{/*<div onClick={this.showChooseWindow.bind(this)} className="avatar-icon">
									<i className="fa fa-user fa-5x"></i>
								</div>*/}
								<div className="thumbnail">
									<img onClick={this.showChooseWindow.bind(this)} src="/yuna.jpg" alt="" className="avatar-img" />
								</div>
								<input onChange={this.saveAvatar.bind(this)} ref="avatarInput" name="avatar[]" type="file" className="hide"/>
							</div>
							<div className="row">
								<a ref="settingsFlag" className='dropdown-button btn btn-block blue-grey lighten-1' href='#' data-activates='settings'>Main Settings</a>
								<ul id='settings' className='dropdown-content'>
									<li><a onClick={this.changeSettingsComponent.bind(this)} data-settings="main" href="#">Main Settings</a></li>
									{/*<li><a onClick={this.changeSettingsComponent.bind(this)} data-settings="advanced" href="#">Advanced settings</a></li>*/}
									<li><a onClick={this.changeSettingsComponent.bind(this)} data-settings="changepass" href="#">Change password</a></li>
								</ul>
							</div>
						</div>
						<div className="col s6 offset-s1">
							{currentSettings}
						</div>
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