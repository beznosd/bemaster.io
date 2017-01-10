import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

class AdvancesSettings extends Component {

  stripTags(str) {
    return str.replace(/<\/?[^>]+>/gi, '');
  }

  saveMainSettings() {
    const alias = this.stripTags(this.refs.alias.value.trim());
    const email = this.stripTags(this.refs.email.value.trim());
    if (alias && email) {
      if (alias.length < 3) {
        Materialize.toast('Alias should be at least from 3 letters', 3000);
        return;
      }
      // send server request
      const userId = Meteor.userId();
      Meteor.call('user.addAlias', userId, alias, email, (error) => {
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
    return (
      <div className="main-info">
        <div className="row">
          <div className="input-field col s12">
            <input ref="race" id="race" type="text" className="validate" />
            <label htmlFor="race">Race (human, elf, vampire etc.)</label>
          </div>
          <div className="input-field col s12">
            <input ref="age" id="age" type="text" className="validate" />
            <label htmlFor="age">Your Age</label>
          </div>
          <div className="input-field col s12">
            <input ref="country" id="country" type="text" className="validate" />
            <label htmlFor="country">Where are you from</label>
          </div>
          <div className="input-field col s12">
            <textarea ref="story" id="story" type="text" className="materialize-textarea" />
            <label htmlFor="story">Tell another masters something about you</label>
          </div>
          <div className="right-align input-field col s12">
            <a className="save-btn waves-effect waves-light btn btn-block green">Save</a>
          </div>
        </div>
      </div>
    );
  }
}

export default AdvancesSettings;