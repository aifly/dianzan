import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IndexApp from './index/index.jsx';
import ClickApp from './click/index.jsx';
import Obserable from './assets/libs/obserable';
var obserable = new Obserable();
import $ from 'jquery';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current:0
		}
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}
	render() {
		var data  ={
			obserable
		}
		return (
			<div className='lt-main-ui' style={{height:this.viewH}}>
					<ul style={{height:this.viewH*2,WebkitTransform:'translate3d(0,-'+(this.state.current*this.viewH)+'px,0)'}}>
						<li style={{height:this.viewH}}><IndexApp {...data}></IndexApp></li>
						<li style={{height:this.viewH}}><ClickApp {...data}></ClickApp></li>
					</ul>
			</div>
		);
	}

	wxConfig(){
		   var durl = location.href.split('#')[0]; //window.location;
		        var code_durl = encodeURIComponent(durl);
			$.ajax({
				url:'http://api.zmiti.com/weixin/jssdk.php',
				dataType:'jsonp',
				jsonp: "callback",
				data:{
					type:'signature',
					durl:durl
				},
		    jsonpCallback: "jsonFlickrFeed",
		    success(data){
		    	wx.config({
						    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						    appId: 'wxfacf4a639d9e3bcc', // 必填，公众号的唯一标识
						    timestamp:'1488558145' , // 必填，生成签名的时间戳
						    nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
						    signature: data.signature,// 必填，签名，见附录1
						    jsApiList: [ 'checkJsApi',
													  'onMenuShareTimeline',
													  'onMenuShareAppMessage',
													  'onMenuShareQQ',
													  'onMenuShareWeibo',
													  'hideMenuItems',
													  'showMenuItems',
													  'hideAllNonBaseMenuItem',
													  'showAllNonBaseMenuItem'
								] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						});

		    	wx.ready(()=>{
		    			 		//朋友圈
                    wx.onMenuShareTimeline({
                        title: '为基层代表点赞', // 分享标题
                        link: durl, // 分享链接
                        imgUrl: "http://webapi.zmiti.com/public/dianzan/assets/images/300.jpg", // 分享图标
                        desc: "2017年两会，让我们来关注基层代表，为他们点赞吧",
                        success: function () { },
                        cancel: function () { }
                    });
                    //朋友
                    wx.onMenuShareAppMessage({
                        title: "为基层代表点赞", // 分享标题
                        link: durl, // 分享链接
                        imgUrl: "http://webapi.zmiti.com/public/dianzan/assets/images/300.jpg", // 分享图标
                        type: "link",
                        dataUrl: "",
                        desc: "2017年两会，让我们来关注基层代表，为他们点赞吧",
                        success: function () { },
                        cancel: function () { }
                    });
                    //qq
                    wx.onMenuShareQQ({
                        title: "为基层代表点赞", // 分享标题
                        link: durl, // 分享链接
                        imgUrl: "http://webapi.zmiti.com/public/dianzan/assets/images/300.jpg", // 分享图标
                        desc: "2017年两会，让我们来关注基层代表，为他们点赞吧",
                        success: function () { },
                        cancel: function () { }
                    });
		    	});
		    }
			});
		
	}

	componentWillMount() {
		document.querySelector('html').style.fontSize = this.viewW / 10 +'px';
		this.wxConfig();

		obserable.on('nextPage',()=>{
			this.setState({current:1});
		})
		
	}
}
	ReactDOM.render(<App></App>,document.getElementById('fly-main-ui'));

