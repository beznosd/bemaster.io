import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { UserActivities } from './../../../../../api/Activities.js';
import Activity from './activity/Activity.jsx';

class Activities extends Component {

  stripTags(str) {
    return str.replace(/<\/?[^>]+>/gi, '');
  }

  addActivity() {
    const name = this.stripTags(this.refs.name.value);
    if (name) {
      if (name.length < 3) {
        Materialize.toast('Activity name should be at least from 3 letters', 3000);
        return;
      }
      // send server request
      const userId = Meteor.userId();
      const activity = {
        name: name,
        totalTime: 0
      }
      Meteor.call('userActivities.addActivity', userId, activity, (error) => {
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
    // console.log("this.props.userData", this.props.userData);
    // console.log("this.props.userData", this.props.userActivities);
    // let activities = this.props.userActivities.map((data, iterator)=>{
    //  return
    // });
    return (
      <div className="test-tab-content">
        <h1>Activities</h1>
        <div className="row">
          {this.props.userActivities ? this.props.userActivities.map((activity, i) => <Activity key={i} i={i} activity={activity}/>) : "Fuck you"}
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
  timerTime: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  userActivities: PropTypes.object.isRequired
};
// export default Activities;

export default createContainer(() => {
  // const id = Meteor.userId();
  Meteor.subscribe('userData');
  const fff = Meteor.subscribe('userActivities', Meteor.userId());
  const ttt = fff.ready();
  console.log('Subscribe status',ttt, fff);
  const ggg = UserActivities.find({user_id: Meteor.userId()}).fetch();
  return {
    userData: Meteor.user(),
    userActivities: ttt ? ggg : []
  };
}, Activities);
