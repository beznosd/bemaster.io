import React, {Component, PropTypes} from 'react';

class Activity extends Component {

    chooseActivity() {
        console.log('choosed');
    }

    startActivityTimer() {
        let userId = Meteor.userId();
        let props = this.props;

        Meteor.call('userActivities.startActivity', userId, props.activity._id, function(error, result) {
            if (error) {
                Materialize.toast(error.reason, 3000);
            } else {
                Materialize.toast('Successfully Started', 3000);
            }
        });
    }

    render() {
        return (
            <div className="col s3">
                <div onClick={this.chooseActivity.bind(this)} className="card blue-grey darken-1">
                    <div className="center-align card-content white-text">
                        <span className="card-title">{this.props.activity ? this.props.activity.activity_name : ''}</span>
                    </div>
                    <div className="active-label"></div>
                </div>
            </div>
        );
    }
}

export default Activity;
