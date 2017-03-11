import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import '../assets/libs/move';
import $ from 'jquery';


class ClickApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			isPress:false,
			addOne:0,
			count:123456
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var mainStyle = {
			background:'#1c0635',
		}

		var zanStyle = {
		}

		return (
			<div className='lt-click-main-ui lt-full' style={mainStyle}>
				<div className='lt-stage'>
					<img style={{display:this.state.addOne===0?'block':'none'}} className='lt-stage-light' src='./assets/images/light.jpg'/>
					<img  style={{display:this.state.addOne===1?'block':'none'}}  className='lt-stage-light' src='./assets/images/light.gif'/>
					<img  style={{display:this.state.addOne===2?'block':'none'}}  className='lt-stage-light' src='./assets/images/light1.gif'/>
					<img style={{display:this.state.addOne?'block':'none'}}  src='./assets/images/add.png' className='lt-addone' ref='lt-addone'/>
					<div style={{display:this.state.addOne % 2 === 0?'block':'none'}} className='lt-click-count'>
						<span>总点赞数</span>
						<span>
								<a ref='count' href='javascript:void(0)'>{this.formatNum(this.state.count)}</a>
								<div></div>
								<a ref='count1' href='javascript:void(0)'>{this.formatNum(this.state.count+1)}</a>
						</span>
					</div>
				</div>
				 <div className='lt-zan-C'>
				 		<img className='lt-zan-bg' src='./assets/images/zan-bg.png'/>
				 		<div onTouchStart={this.touchstart.bind(this)} onTouchEnd={this.touchend.bind(this)} className='lt-btn'>
				 			{!this.state.isPress && <img src='./assets/images/btn.png' />}
				 			{this.state.isPress && <img src='./assets/images/btn1.png'/>}
				 		</div>
				 </div>
			</div>
		);
	}

	touchstart(){
		this.setState({
			isPress:true,
			
		});
		setTimeout(()=>{
			this.setState({
				isPress:false,
				addOne:1
			});

			
		},150)

		setTimeout(()=>{

			this.refs['lt-addone'].classList.add('active');
			this.refs['lt-addone'].addEventListener('webkitAnimationEnd',()=>{
				setTimeout(()=>{
					this.setState({
						addOne:2
					})
				},200)
			});
/*			ltUtil.startMove(this.refs['lt-addone'],{
				top:this.viewW/10*2.5,
			},500,'bounceOut',()=>{
				
			});
*/
		},400)

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
                        title: '共有'+(this.state.count+1)+'位人为基层代表点赞', // 分享标题
                        link: durl, // 分享链接
                        imgUrl: "http://webapi.zmiti.com/public/dianzan/assets/images/300.jpg", // 分享图标
                        desc: "2017年两会，让我们来关注基层代表，为他们点赞吧",
                        success: function () { },
                        cancel: function () { }
                    });
                    //朋友
                    wx.onMenuShareAppMessage({
                        title: '共有'+(this.state.count+1)+'位人为基层代表点赞', // 分享标题
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
                        title: '共有'+(this.state.count+1)+'位人为基层代表点赞', // 分享标题
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

	formatNum(num){
		var result = [ ], counter = 0;
    num = (num || 0).toString().split('');
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
    }
    return result.join('');
	}

	touchend(){
	
	}

	addOne(){
		var html = this.refs['count'].innerHTML+'';
		var lastNum = this.state.count%10;
		var hiddenNum = lastNum>=9?0:lastNum;
		hiddenNum++;

		var arr = html.split('');
		var result = '';
		arr.forEach((item,i)=>{
			result+=`
				<b class=${i === arr.length - 1? 'active':''}>${item}</b>
			`;
		});
		this.refs['count'].innerHTML = result;
		this.refs['count'].innerHTML+= '<em>'+hiddenNum+'</em>';
	}

	componentDidMount() {
			
			var s = this;
			$.ajax({
				url:'http://api.zmiti.com/v2/custom/get_total/customid/1',
				data:{},
				success(data){
					if(data.getret === 0){
						s.setState({count:data.totaldz},()=>{
							s.addOne();
							s.wxConfig();
						})
					}
				}
			})
	}
}
export default PubCom(ClickApp);