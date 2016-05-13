import React, { Component } from 'react';

import Header from './top_navbar/Header.jsx';

class MainLayout extends Component {

	render() {
		return (
			<div className="main-layout">
				<Header />
				<main className="container">
					{this.props.content}
				</main>
			</div>
		);
	}

}

export default MainLayout;