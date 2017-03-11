import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import NavApp  from '../nav/index.jsx';
import $ from 'jquery';

class IndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			introShow:1,
			titleShow:false
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		let {obserable} = this.props;
		var mainStyle = {
			background:'url(./assets/images/index-bg.jpg) no-repeat center top',
			backgroundSize:'cover',
			///WebkitTransform:'translate3d(0,-'+(this.state.introShow*100)+'%,0)'
		}


		var arProps = {
			url:'./assets/images/ar.png',
			href:'#',
			style:{
				width:'2.5rem',
				position:'absolute',
				bottom:'4.0rem',
				left:'6rem',
			},
			imgStyle:{
				WebkitAnimationDuration:'2s'
			},
			spanStyle:{
				WebkitAnimationDuration:'2s',
				width:'70%',
				left:'15%'
			}
		}

		var photoProps = {
			url:'./assets/images/photo.png',
			href:'#',
			style:{
				width:'2rem',
				position:'absolute',
				bottom:'4.2rem',
				left:'1.5rem',
			},
			imgStyle:{
				WebkitAnimationDuration:'2.5s'
			},
			spanStyle:{
				WebkitAnimationDuration:'2.5s',
				width:'70%',
				left:'15%'
			}
		}
		var zanProps = {
			url:'./assets/images/zan.png',
			click:(e)=>{
				obserable.trigger({
					type:'nextPage'
				});
				e.preventDefault();
				return false;
			},
			href:'javascript:void(0)',
			style:{
				
				width:'3.5rem',
				position:'absolute',
				bottom:'1.2rem',
				left:'3rem',
				WebkitAnimationDuration:'1.5s'
			},
			imgStyle:{
				WebkitAnimationDuration:'2s',
				WebkitAnimationDelay:'.5s'
			},
			spanStyle:{
				WebkitAnimationDelay:'.5s',
				WebkitAnimationDuration:'2s',
				width:'70%',
				left:'15%'
			}
		}
	
		return (
			<div className={'lt-index-main-ui lt-full '} ref='lt-index-main-ui' style={mainStyle}>
					<img src='./assets/images/title.png' className={'lt-title '+(this.state.titleShow?'active':'')}/>
					<NavApp {...photoProps}></NavApp>
					<NavApp {...zanProps}></NavApp>
					<NavApp {...arProps}></NavApp>
			</div>
		);
	}


	componentDidMount() {
		var s = this;
		let {obserable} = this.props;
	 	setTimeout(()=>{
	 		this.setState({
	 			titleShow:true
	 		});
	 	},1000);
	}
}
export default PubCom(IndexApp);