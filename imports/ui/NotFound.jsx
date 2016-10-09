import React, { Component } from 'react';

class NotFound extends Component {


	render() {
		const styles = {
			marginTop: '80px',
			textAlign: 'center',
			color: '#66bb6a'
		};

		return (
			<div>
				<h1 style={styles}>Bro, you lost way ;)</h1>
				<h1 style={styles}>404</h1>
			</div>
		);
	}

}

export default NotFound;