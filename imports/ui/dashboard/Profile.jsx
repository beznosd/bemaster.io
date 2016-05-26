import React, { Component } from 'react';

class Profile extends Component {

	componentDidMount() {
		$('.dropdown-button').dropdown();
	}

	render() {
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
										<input id="first_name" type="text" class="validate" />
		          						<label for="first_name">Your Master's Alias</label>
									</div>
									<div className="input-field col s12">
										<input id="first_name" type="text" class="validate" />
		          						<label for="first_name">Current Email</label>
									</div>
									<div className="right-align input-field col s12">
										<a className="save-btn waves-effect waves-light btn btn-block green">Save</a>
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

export default Profile;