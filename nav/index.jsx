import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';

class NavApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		};
	}

	render() {


		return (
			<div className='lt-nav-main-ui'  style={this.props.style}>
				<a href={this.props.href} onTouchTap={this.props.click} style={this.props.imgStyle} ><img  src={this.props.url} /></a>
				<span style={this.props.spanStyle} ></span>
			</div>
		);
	}
	componentDidMount() {

	}
}
NavApp.defaultProps = {
	click:()=>{}
}
export default PubCom(NavApp);