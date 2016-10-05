import React, { Component, PropTypes } from 'react';

class Activity extends Component {
  // constructor() {
  //
  // }
  startActivityTimer() {
    let userId = Meteor.userId();
    let props = this.props;

    Meteor.call('userActivities.startActivity', userId, props.activity._id, function(error, result){
      if (error) {
        Materialize.toast(error.reason, 3000);
      } else {
        Materialize.toast('Successfully Started', 3000);
      }
    });
  }

  render() {
    console.log(this.props);
    return(
      <div className="col s4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{this.props.activity ? this.props.activity.activity_name : ''}</span>
            <p>I am a very simple card. I am good at containing small bits of information.</p>
          </div>
          <div className="card-action">
            <a onClick={this.startActivityTimer.bind(this)} className="waves-effect waves-light btn">Start</a>
            <a className="waves-effect waves-light btn">Delete</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Activity;
