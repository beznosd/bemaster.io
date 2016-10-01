import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class Activities extends Component {

	constructor() {
    super()
    this.state = {
      subscription:  Meteor.user().timer
    }
  }

	stripTags(str) {
		return str.replace(/<\/?[^>]+>/gi, '');
	}

	addActivity() {
		var name = this.stripTags( this.refs.name.value );
		if (name) {
			if (name.length < 3) {
				Materialize.toast('Activity name should be at least from 3 letters', 3000);
				return;
			}
			// send server request
			var userId = Meteor.userId();
			var activity = {
				name: name,
				timeSpent: 0
			}
			Meteor.call('activities.addActivity', userId, activity, function(error, result){
				if (error) {
					Materialize.toast(error.reason, 3000);
				} else {
					Materialize.toast('Successfully Added', 3000);
				}
			});
		} else {
			Materialize.toast('Please enter the name to save new activity', 3000);
		}
	}

	render() {
		console.log("this.props.userData", this.props.userData);
		return (
			<div>
				<h1 className="test-tab-content">Activities</h1>
				<div className="row">
					<div className="col s4">
						<code>{this.props.userData}</code>
						<p>{this.state.subscription}</p>
					</div>
				</div>
				<div className="row">
					<h4 className="center-align">Create new Activity</h4>
					<div className="col offset-s4 s4">
						<div className="row">
							<div className="input-field col s12">
								<input ref="name" id="name" type="text" />
								<label htmlFor="name">Activity name</label>
							</div>
						</div>
						<div className="row">
							<button onClick={this.addActivity.bind(this)} className="waves-effect waves-light btn btn-block green btn-login-signup">Create</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

}
Activities.PropTypes = {
	timerTime: PropTypes.object.isRequired
}
// export default Activities;

export default createContainer(() => {
	// const id = Meteor.userId();
	Meteor.subscribe('userData')
	// console.log("hh",hh);
	// console.log("Yeahhh");
	// if (hh.ready()) {
	// 	// console.log("hh2",hh);
		return {
			userData: true ? Meteor.user().timer : "Fuck you"
		};
	// }
}, Activities);
