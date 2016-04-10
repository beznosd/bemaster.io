import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import TimerButton from '../imports/ui/TimerButton.jsx';

Meteor.startup(() => {
	$.fn.extend({
	    animateCss: function (animationName) {
	        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
	            $(this).removeClass('animated ' + animationName);
	        });
	    }
	});

	render(<TimerButton />, document.getElementById('timer-block'));
});


