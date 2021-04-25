/**
 * global function for website.
 * @author Clark
 * @wechat 82100735
 * @version 1.0.0 build 2018-11-16
 * @modified Clark 2018-11-16
 */

/**
 * banner图片切换特换
 * 
 * @param _dir
 *        切换方向
 * @return
 *       
 */
function changeBanner(_self,_list){
	$(_list).removeClass("curr");
	$(_self).addClass("curr");
	var bigPic = $(_self).find("img").attr("rel");
	$("#big-img").attr("src",bigPic).hide().fadeIn("slow");
}

function showSlidePlan(_self,_list){
	$(_list).removeClass("curr");
	$(_self).addClass("curr");
}

/**
 * 行业动态图片切换特换
 * 
 * @param _dir
 *        切换方向
 * @return
 *       
 */
var ChangeObject = function(_object){
	var o = {
	 	_self:_object._self,
	 	_timer:null,
	 	_speed:_object._speed || 3000,
	 	_showIndex:_object._showIndex || false,
	 	_index:0,
	 	_className:"curr",
	 	init:function(){
	 		this.autoChange();
	 	},
	 	autoChange:function(){
	 		var _that = this;
	 		_that._timer = setInterval(function(){
				_that._index = _that._index + 1;
				_that._index = _that._index < 0 ? _that._self.length - 1 : _that._index;
	 			_that._index = _that._index >= _that._self.length ? 0 : _that._index;
				_that.changeStart(_that._index);
	 		},_that._speed);
	 	},
	 	changeStart:function(_i,_callback){
	 		var _that = this;
	 		for(var i = 0; i < _that._self.length; i++){
	 			if(_that._self[i].className.match(_that._className)){
	 				_that._self[i].className = _that._self[i].className.replace(_that._className, "");
	 				_that._self[i].className = _that._self[i].className.replace(" ", "");
	 				if(_that._showIndex){
	 					_that._showIndex[i].className = _that._showIndex[i].className.replace(_that._className, "");
	 					_that._showIndex[i].className = _that._showIndex[i].className.replace(" ", "");
	 				}
	 			}
	 		}
	 		_that._self[_i].className = _that._self[_i].className + " " + _that._className;
	 		if(_that._showIndex){
	 			_that._showIndex[_i].className = _that._showIndex[_i].className + " " + _that._className;
	 		}
	 		_callback && _callback();
	 	},
	 	changeClick:function(_dir){
	 		var _that = this;
	 		clearInterval(_that._timer);
	 		if(_that._showIndex){
		 		_that._index = _dir;
		 		_that._index = _that._index < 0 ? _that._self.length - 1 : _that._index;
		 		_that._index = _that._index >= _that._self.length ? 0 : _that._index;
	 		}else{
	 			_that._index = _dir == "next" ? _that._index + 1 : _that._index - 1;
		 		_that._index = _that._index < 0 ? _that._self.length - 1 : _that._index;
		 		_that._index = _that._index >= _that._self.length ? 0 : _that._index;
	 		}
	 		_that.changeStart(_that._index,function(){
	 			_that.autoChange();
	 		});
	 	}
	}
	return o;
}
if($(".industry-banner-list li").length > 0){
	var industryChange = new ChangeObject({_self:$(".industry-banner-list li"),_showIndex:$(".industry-banner-change li"),_speed:5000});
	industryChange.init();
}
if($(".coupon-banner-list li").length > 0){
	var couponChange = new ChangeObject({_self:$(".coupon-banner-list li"),_showIndex:$(".coupon-banner-change li"),_speed:5000});
	couponChange.init();
}
if($(".video-banner-list li").length > 0){
	var videoChange = new ChangeObject({_self:$(".video-banner-list li"),_showIndex:$(".video-banner-change li"),_speed:5000});
	videoChange.init();
}
if($(".orange-banner-list li").length > 0){
	var orangeChange = new ChangeObject({_self:$(".orange-banner-list li"),_showIndex:$(".orange-banner-change li"),_speed:5000});
	orangeChange.init();
}
if($(".mind-banner-list li").length > 0){
    var mindChange = new ChangeObject({_self:$(".mind-banner-list li"),_showIndex:$(".mind-banner-change li"),_speed:5000});
    mindChange.init();
}
if($(".subject-banner-list li").length > 0){
    var subjectChange = new ChangeObject({_self:$(".subject-banner-list li"),_showIndex:$(".subject-banner-change li"),_speed:5000});
    subjectChange.init();
}
if($(".master-banner-list li").length > 0){
    var masterChange = new ChangeObject({_self:$(".master-banner-list li"),_showIndex:$(".master-banner-change li"),_speed:5000});
    masterChange.init();
}
if($(".slide-banner-list li").length > 0){
    var slideChange = new ChangeObject({_self:$(".slide-banner-list li"),_showIndex:$(".slide-banner-change li"),_speed:5000});
    slideChange.init();
}




/**
 * 热门直播图片切换特换
 * 
 * @param _dir
 *        切换方向
 * @return
 *       
 */
var ChangeScroll = function(_object){
	var o = {
	 	_selfUl:_object._selfUl,
	 	_selfLi:_object._selfLi,
	 	_timer:null,
	 	_dir:_object._dir || "next",
	 	_speed:_object._speed || 5000,
	 	_index:0,
	 	_isOver:false,
	 	init:function(){
	 		var _that = this;
			 var liWid = _that._selfLi.outerWidth(true);
	 		_that._selfUl.width(_that._selfLi.length * liWid);
			_that.autoChange();
			 //鼠标移入移除暂停
			 this._selfUl.mouseenter(function(){
				 _that.changePause();
				//  console.log('移入')
			 }).mouseleave(function(){
					 _that.autoChange();
				//  console.log('移出')
			 })
	 	},
	 	autoChange:function(){
			 var _that = this;
			 _that.changeStart();
	 		_that._timer = setInterval(function(){
				_that.changeStart();
	 		},_that._speed);
		 },
		changePause:function(){
			var _that = this;
			_that._timer&&clearInterval(_that._timer);
			_that.changeStart.timer&&clearInterval(_that.changeStart.timer);
		},
	 	changeStart:function(_callback){
	 		var _that = this;
	 		this.changePause();
	 		var liWid = _that._selfLi.outerWidth(true);
	 		var i = 0;
	 		_that._selfUl.width(_that._selfLi.length * liWid);
	 		if(_that._dir == "next"){
	 			_that.changeStart.timer = setInterval(function(){
	 				if(i >= liWid){
	 					clearInterval(_that.changeStart.timer)
	 					var j = _that._index;
	 					var _li = _that._selfLi[j];
	 					_that._selfLi[j].remove();
						_that._selfUl.css({left: "0px"});
						_that._selfUl = _that._selfUl;
	 					_that._selfUl.append(_li);
						_that._selfLi = _that._selfLi;
	 					_that._isOver = false;
			 			_that._index = _that._index + 1;
			 			_that._index = _that._index >= _that._selfLi.length ? 0 : _that._index;
	 				}else{
	 					i++;
						_that._selfUl.css({left: "-"+ i +"px"});
	 				}
		 		},8);
	 		}else{
	 			_that._selfUl.css({left: "-"+ liWid +"px"});
	 			i = liWid;
	 			_that._index = _that._index <= 0 ? _that._selfLi.length - 1 : _that._index - 1;

	 			var _li = _that._selfLi[_that._index];
 					_that._selfLi[_that._index].remove();
 					_that._selfUl.prepend(_li);
	 			_that.changeStart.timer = setInterval(function(){
	 				if(i <= 0){
	 					clearInterval(_that.changeStart.timer)
						_that._selfUl.css({left: "0px"});
						_that._selfLi = _that._selfLi;
						_that._selfUl = _that._selfUl;
						_that._isOver = false;
	 				}else{
	 					i--;
						_that._selfUl.css({left: "-"+ i +"px"});
	 				}
		 		},8);
	 		}
	 		_callback && _callback();
	 	},
	 	changeClick:function(_dir){
	 		var _that = this;
	 		if(_that._isOver){
	 			return
	 		}
	 		_that._isOver = true;
	 		clearInterval(_that._timer);
	 		_that._dir = _dir;
 			// _that.changeStart(function(){
 			// 	_that.autoChange();
 			// });
	 	}
	}
	return o;
}

if($(".news-slide-small-list ul li").length > 0){
    console.log('asdf');
	var newsSlideChange = new ChangeScroll({_selfUl:$(".news-slide-small-list ul"),_selfLi:$(".news-slide-small-list ul li")});
	newsSlideChange.init();
}
if($(".hot-font-box ul li").length >0){
	// var hotFontChange = new ChangeScroll({_selfUl:$(".hot-font-box ul"),_selfLi:$(".hot-font-box ul li")});
	// hotFontChange.init();
	var hotfontSwiper ;
	var hotfontSwiper_options={
		spaceBetween: 2,
		slidesPerGroup: 1,
		speed:1000,
		loop:$(".hot-font-box ul li").length > 8?true:false,
		autoplay: { //播放时间间隔
			delay:2000,
			disableOnInteraction: false,
		  },
		// on: {
		// 	click: function (swiper) {
		// 	}
		// }
		// ,
		// autoplay: true,

		// 如果需要前进后退按钮
		navigation: {
			nextEl: '.hot-font-right',
			prevEl: '.hot-font-left',
		},}

	function slideAdjustment(){
		var count;
		var windowWidth=$(window).width()
		if(windowWidth<1440){
			count=8;
		}else if(windowWidth<1680){
			count=10;
		}else{
			count=12;
		}
		if(hotfontSwiper_options.slidesPerView&&count==hotfontSwiper_options.slidesPerView){return;}
		else{
			// var swiper1_width=$(".hot-font-box.swiper-container1").width()
			// swiper1_width=$(".hot-font-box.swiper-container1").width()
			// console.log($(".hot-font-box.swiper-container1").width())
			// var count=Math.ceil(swiper1_width/$('.hot-font-box ul li').width())-2;
			// console.log(count)

			hotfontSwiper_options.slidesPerView=count;
			// hotfontSwiper_options.slidesPerGroup=count;
			hotfontSwiper&&hotfontSwiper.destroy(false)
			hotfontSwiper = new Swiper('.swiper-container1', hotfontSwiper_options);
			hotfontSwiper.el.onmouseover = function(){ //鼠标放上暂停轮播
				hotfontSwiper.autoplay.stop();
			  };
			  hotfontSwiper.el.onmouseleave = function(){
				hotfontSwiper.autoplay.start();
			  };
		}
	}
	$(window).resize(function(){
		slideAdjustment()
		
	})
	slideAdjustment()
}
 

/**
 * 行业动态Banner切换特换
 * 
 * @param _dir
 *        切换方向
 * @return
 *       
 */
var NewsBanner = function(_object){
 	var o = {
	 	_selfUl:_object._selfUl,
	 	_selfLi:_object._selfLi,
	 	_timer:null,
	 	_dir:_object._dir || "next",
	 	_speed:_object._speed || 3000,
	 	_index:0,
	 	init:function(){
	 		var _that = this;
	 		_that._timer = setInterval(function(){
	 			_that.autoChange();
	 		},_that._speed)
	 	},
	 	autoChange:function(_callback){
	 		var _that = this;
	 		var _arr = ["one","two","three"];
	 		_that._index++;
	 		_that._index = _that._index >= _that._selfLi.length ? 0 : _that._index;
	 		for(var i = 0; i < _arr.length; i++){
	 			if(_that._dir == "next"){
	 				var j = Math.abs(_that._index - _arr.length) + i;
	 				j = j >= _arr.length ? j - _arr.length : j;
	 				_that._selfLi[i].className = _arr[j];
	 			}else{
		 			var j = _that._index + i;
		 			j = j >= _arr.length ? j - _arr.length : j;
		 			_that._selfLi[i].className = _arr[j];
	 			}
	 		}
	 		var img = $("body").find(".news-banner-box li.two img").attr("src");
	 		var title = $("body").find(".news-banner-box li.two img").attr("rel");
	 		$("#backTitle").text(title);
	 		$("body #backBG").css({
	 				"background":"url("+ img +") center center no-repeat",
	 				"background-size":"100% 100%"
	 			})
	 		_callback && _callback();
	 	},
	 	changeClick:function(_dir){
	 		var _that = this;
	 		clearInterval(_that._timer);
	 		_that._dir = _dir;
	 		_that.autoChange(function(){
	 			_that.init();
	 		})
	 	}
 	};
 	return o;
}
if($(".news-banner-box li").length > 0){
    var newsBanChange = new NewsBanner({_selfUl:$(".news-banner-box"),_selfLi:$(".news-banner-box li"),_speed:3000});
    newsBanChange.init();
}