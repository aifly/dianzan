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
			currentHref:'',
			showLoading:false,
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
			click:()=>{
				this.setState({
					currentHref:'http://t.cn/RiSMMpX?channel=weixin',
					showLoading:true
				})
			},
			style:{
				width:'2.5rem',
				position:'absolute',
				bottom:'4.3rem',
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
			style:{
				width:'2rem',
				position:'absolute',
				bottom:'4.2rem',
				left:'1.5rem',
			},
			click:()=>{
				this.setState({currentHref:'http://mp.weixin.qq.com/s?__biz=MzA4NDI3NjcyNA==&mid=2649348559&idx=1&sn=dcca8853e830ff00868561c70c314245&chksm=87f4dd54b083544266532eda5c3e95ad5ea354b5bd508d604032b4d2fe3050535ddb66807061&mpshare=1&scene=1&srcid=0305KMtdj4Pjs1q7MceByXIx#rd',showLoading:true})
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
				 {this.state.currentHref && <div className='showframe' style={{height:this.viewH}}>
	                  <iframe frameBorder={0} onLoad={this.load.bind(this)} src={this.state.currentHref} width={window.innerWidth} height={window.innerHeight}></iframe>
	                  <div className='g-continue' onTouchTap={()=>{this.setState({currentHref:'',showLoading:false});}}>返回</div>
	              </div>}
	              {this.state.showLoading && <div className='lt-frame-loading lt-full'><span>加载中，请稍后……</span></div>}
			</div>
		);
	}

	load(){

		this.setState({showLoading:false})
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