var $currentCity = $(".current-city p");
var $weatherObj = $(".weather-list");
var $weather = $weatherObj.find(".weather i");
var $temperature = $weatherObj.find(".temperature");
var $weatherImg = $weatherObj.find('.weather-img');
var silderHeight = $(".slider-infor").height();
var counter = 1; /*页数计数器*/
var pageSize = 8; /*size*/
var isEnd = false;/*结束标志*/
var category ='';
var url = 'http://irs.qq.com/partners/lenovo?num='+pageSize+'&category='+category;
var newsFlag = '';
var tabNameItem = 'recommend';


function sliderData(){
	$(".slider-infor ul").animate({"top":-silderHeight},500,function(){
		$(this).css({top:"0"}).find("li:first").appendTo(this); 
	})
}

function cityback(currentProvince,chanagecity){
	$("#city-select-layer").hide();
	$(".current-city").show();
	cityWeatherInit(currentProvince,chanagecity);
	Avatar.push(['track', ['click', 'cityChange', '', {province:currentProvince,city:chanagecity}, 0]]);
}
//初始化城市
function locationInit(){
	var isClick = $.cookie("click");
	var proviceName = "北京";
	var cityName = "北京";
	if(typeof(isClick) == "undefined"){
		$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
			
			if(remote_ip_info.ret == '1'){
				proviceName = remote_ip_info.province;
				cityName = remote_ip_info.city;
				$.cookie("cProvince",proviceName);
				$.cookie("ccity",cityName);	
			}else{
				proviceName = $.cookie('cProvince');
				cityName = $.cookie("ccity");
			}
			
			cityWeatherInit(proviceName,cityName);
		})
	}else{
		proviceName = $.cookie('cProvince');
		cityName = $.cookie("ccity");
		cityWeatherInit(proviceName,cityName);
	}
	
}


//获取当前城市天气
function cityWeatherInit(relProvice,relcityName){
	var weatherLink = "http://tianqi.qq.com/?province="+relProvice+"&city="+relcityName;
	var todayimg = "";
	var tomorrow = "";
	$(".weather-list a").attr("href",weatherLink);
	$.ajax({
		url:"https://wis.qq.com/weather/index",
		type:"get",
		data:{
			source:'pc',
			province:relProvice,
			city:relcityName,
			weather_type:"forecast_24h"
		},
		dataType : "jsonp",
		success:function(data){
			var weatherDat = data.data;
			if(JSON.stringify(weatherDat) != "{}"){
				$.cookie("cProvince",relProvice);
				$.cookie("ccity",relcityName);  
				$currentCity.html(relcityName);
				for(var i = 0; i< $weatherObj.find("li").length; i++){
					$weather[i].innerHTML = weatherDat[i+1].day_weather;
					$temperature[i].innerHTML = weatherDat[i+1].min_degree+ "~" + weatherDat[i+1].max_degree;
					$weatherImg[i].innerHTML = "<img src='images/weather/"+  weatherDat[i+1].day_weather_code +".png' width='40' alt='' />"
				}
			}else{
				alert("没有此城市");
				return;
			}
		},
		error:function(data){
			console.log("data");
		}
	})
}

//星座初始化
var xzSelect = $("#xzSelect");
var xzinfor = $(".xz-infor");
var xingzuoName = "白羊座";
xzSelect.change(function(){
	var xzVal = $(this).val();
	var xzText = $('#xzSelect option:selected') .text().substr(0,3);
	xingzuoName = xzText;
	Avatar.push(['track', ['change', 'xingzuo', '', {xingzuo:xzText},0]]);
	getXingZuo(xzVal);
});


//请求星座接口
function getXingZuo(xz){
	xzinfor.html("");
	var xzHtml = "";
	$.ajax({
		type:"get",
		url:"http://irs.qq.com/openapi/index?key=lenovo:astro",
		dataType : "jsonp",
		success:function(data){
			var xzData = data.data;
			$("#xzIcon").attr("class","").addClass("xz-icon"+xz);
			xzHtml = "<li><a href='"+xzData[xz].url+"' target='_blank'>"+xzData[xz].fortune[3].type+"：<span>"+xzData[xz].fortune[3].content+"</span></a></li><li><a href='"+xzData[xz].url+"' target='_blank'>"+xzData[xz].fortune[4].type+"：<span>"+xzData[xz].fortune[4].content+"</span></a></li><li><a href='"+xzData[xz].url+"' target='_blank'>"+xzData[xz].fortune[5].type+"：<span>"+xzData[xz].fortune[5].content+"</span></a></li><li><a href='"+xzData[xz].url+"' target='_blank'>"+xzData[xz].fortune[6].type+"：<span>"+xzData[xz].fortune[6].content+"</span></a></li>";		
			$(".xz-num-box i").css("width",parseInt(xzData[xz].fortune[0].content)+"%");
			xzinfor.html(xzHtml);
		}
	});
	
}


//初始化当前的日期
function ininDate(){
	
	var currentDate = new Date();
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth()+1;
	var day = currentDate.getDate();
	var weekday = currentDate.getDay();
	var showday=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六'); 
	
	var dateHtml = "<span class='date'>"+ month +"月"+ day +"日</span>"+showday[weekday];
	$(".current-date p").html(dateHtml);
	
	gethuangliID(year,month,day);
	
}

function gethuangliID(year,month,day){
	$.ajax({
		url:"http://nl.go108.com.cn/qq/query.php?act=hl&qyear="+year+"&qmonth="+month+"&qday="+day,
		type:"get",
		dataType : "script",
		success:function(data){
			gethuangli(go108nlFID)
			
		},
		error:function(data){
			alert(data)
		}
	})
}

function gethuangli(go108nlFID){
	$.ajax({
		type:"get",
		url:"http://nl.go108.com.cn/qq/data/7/"+go108nlFID+"info.js",
		dataType:"script",
 		scriptCharset: 'utf-8',
		success:function(data){
			$(".slider-infor .good a").html(go108nlInfo.G3);
			$(".slider-infor .bad a").html(go108nlInfo.G4);
			//数据调成功之后再轮播
			setInterval(sliderData,4000);
		}
	});
}




$(function(){
	var searchOffsetTop = $(".search-container").offset().top;
	var sortNavOffsetTop = $(".news-sort-head").offset().top - $(".search-container").height();
	ininDate();
	locationInit();
	getXingZuo(0);
	//搜索框漂浮
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		scrollTop > searchOffsetTop ? $(".search-wrapper").addClass("search-fixed") : $(".search-wrapper").removeClass("search-fixed");
		scrollTop > sortNavOffsetTop ? $(".news-sort-inner").addClass("news-sort-fixed") : $(".news-sort-inner").removeClass("news-sort-fixed")
	})
	//手机版滑过
	$(".wap-ewm").on({"mouseover":function(){
			$(".wap-ewm .ewm").show();
		},"mouseleave":function(){
			$(".wap-ewm .ewm").hide();
		}
	});
	//当前城市切换
	$(".city-select").on("click",".change-city",function(){
		$(this).parent().hide();
		$("#city-select-layer").show();
	});
	//取消更换城市
	$("#city-select-layer .cancle").click(function(){
		$(".current-city").show();
		$("#city-select-layer").hide();
	});
	//切换搜索引擎
	$(".current-engine").on("click",function(){
		$(this).parent().toggleClass("engine-active");
	});
	$(".engine-select li img").click(function(){
		var src = $(this).attr("src");
		$(".current-engine img").attr("src",src);
		$(".search-engine").removeClass("engine-active");
	});
	//点击其它地方，引擎下拉隐藏
	$("body").on("click",function(e){
		 if(e.target.id != 'current-engine' && e.target.id != 'curentEngine'){
		 	if($(".search-engine").hasClass("engine-active")){
		 		$(".search-engine").removeClass("engine-active");
		 	}
		 }
		 if(e.target.id!='searchSuggest'){
		 	$(".search-suggest").hide();
		 }
	});
	//返回顶部
	$("#goTop").on("click",function(){
		$("html,body").animate({"scrollTop":0},400);
	});
	
	$("#refresh").on("click",function(){
		counter  = 1;
		if(category != ''){
	 		url = 'http://irs.qq.com/partners/lenovo?num='+pageSize+'&category='+category;
		}else if(newsFlag != ''){
	 		url = 'http://irs.qq.com/partners/lenovo?num='+pageSize+'&flag='+newsFlag;
		}
		
		$("html,body").animate({"scrollTop":sortNavOffsetTop-10},200);
	 	$("#newsList").html('');
	 	Avatar.push(['track', ['click', 'refresh', '', {tab:tabNameItem},0]]);
	 	getData(counter,pageSize,category,url);
	})
	
	  /*首次加载*/
	  getData(counter,pageSize,category,url);
	   
	  $(window).scroll(function(){
	    if(isEnd == true){
	      return;
	    }
	    // 核心代码
	    if ($(document).height() - $(this).scrollTop() - $(this).height()<=0){
	      counter ++;
	      getData(counter,pageSize,category,url);
	      Avatar.push(['track', ['load', 'more', '', {tab:tabNameItem},0]]);
	    }
	  });
	  
	 $(".news-sort a").on("click",function(){
	 	$(this).addClass("active").siblings().removeClass("active");
	 	counter  = 1;
	 	
	 	if($(this).attr("data-category")){
	 		$(this).attr("data-category") == "recommend" ? category = '' : category = $(this).attr("data-category");
	 		newsFlag = '';
	 		tabNameItem = $(this).attr("data-category");
	 		url = 'http://irs.qq.com/partners/lenovo?num='+pageSize+'&category='+category;
	 	}else{
	 		
	 		category = '';
	 		newsFlag = $(this).attr("data-flag");
	 		tabNameItem = $(this).attr("data-flag");
	 		url = 'http://irs.qq.com/partners/lenovo?num='+pageSize+'&flag='+newsFlag;
	 	}
	 	$("html,body").animate({"scrollTop":sortNavOffsetTop-10},200);
	 	$("#newsList").html('');
	 	
	 	getData(counter,pageSize,category,url);
	 	Avatar.push(['track', ['click', 'column', '', {tab:tabNameItem},0]]);
	 	
	 });
	 
	 $("body").on("click",".news-list li a",function(){
	 	var newsid = $(this).attr("data-id");
 	 	Avatar.push(['track', ['click', 'detail', '', {tab:tabNameItem, id:newsid}, 0]]);
	 });
	 $("body").on("click",".xz-infor a",function(){
	 	var linkUrl = $(this).attr("href");
	 	Avatar.push(['track', ['click', 'xingzuo', '', {xingzuo:xingzuoName,xingzuoLink:linkUrl}, 0]]);
	 });
	 $("body").on("click",".weather-list li a",function(){
	 	var weaherkUrl = $(this).attr("href");
	 	Avatar.push(['track', ['click', 'weather', '', {weatherUrl:weaherkUrl}, 0]]);
	 });
	  $("body").on("click","#slider-infor li a",function(){
	 	var weaherkUrl = $(this).attr("href");
	 	Avatar.push(['track', ['click', 'huangli', 0]]);
	 });
	 
})


//新闻列表取数据
function getData(counter,pageSize,category,url){
  $.ajax({
  	url:url+'&page='+counter+'',
   // url: url+'&page='+counter+'',
    dataType: 'jsonp',
    beforeSend:function(){
    		$(".bottom-loading").show();
    },
    success: function(data){
      var obj = data.data;
      var sum = data.data.length;
      var result = '';
    
      $(".bottom-loading").hide();
      $(".no-data").hide();
      
      if(obj.length == 0){
      	$(".no-data").show();
      	return;
      }
      
      for(var i=0; i< sum; i++){
      	var pastTime = formatMsgTime(obj[i].ts);
      	
      	if(obj[i].article_type == 1){
      		result += '<li><div class="inner"><h3 class="title"><a href="'+obj[i].vurl+'" target="_blank" data-id="'+obj[i].id+'">'+obj[i].title+'</a></h3><div class="figure-img"><a href="'+obj[i].vurl+'" target="_blank" class="clearfix" target="_blank" data-id="'+obj[i].id+'"><div class="item"><img src="'+obj[i].irs_imgs['273X145'][0]+'" width="245" height="130" alt="" /></div><div class="item"><img src="'+obj[i].irs_imgs['273X145'][1]+'" width="245" height="130" alt="" /></div><div class="item"><img src="'+obj[i].irs_imgs['273X145'][2]+'" width="245" height="130" alt="" /></div></a><span class="num">'+obj[i].img_count+'图</span></div><div class="news-infor"><em class="sort">'+obj[i].category_chn+'</em><span class="from">'+obj[i].source+'</span><span>'+obj[i].comment_num+'评论</span><span class="time">'+pastTime+'</span></div></div></div></div></li>'
      	}
      	else{
      		result +='<li><div class="inner"><a href="'+obj[i].vurl+'" target="_blank" class="pic" target="_blank" data-id="'+obj[i].id+'"><img src="'+obj[i].img+'" width="245" height="130" alt="" /></a><div class="content"><h3 class="title"><a href="'+obj[i].vurl+'" target="_blank" target="_blank" data-id="'+obj[i].id+'">'+obj[i].title+'</a></h3><div class="news-infor"><em class="sort">'+obj[i].category_chn+'</em><span class="from">'+obj[i].source+'</span><span>'+obj[i].comment_num+'评论</span><span class="time">'+pastTime+'</span></div></div></div></li>';
      	}
       
      }
      $('#newsList').append(result);
    },
    error: function(xhr, type){
      alert(xhr);
    }
  });
}


//新闻时间时间转换
function formatMsgTime (dateTimeStamp) {
	var minute =  60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime()/1000;
	var diffValue = now - dateTimeStamp;
	if(diffValue < 0){return;}
	var monthC =diffValue/month;
	var weekC =diffValue/(7*day);
	var dayC =diffValue/day;
	var hourC =diffValue/hour;
	var minC =diffValue/minute;
	if(monthC>=1){
		result="" + parseInt(monthC) + "月前";
	}
	else if(weekC>=1){
		result="" + parseInt(weekC) + "周前";
	}
	else if(dayC>=1){
		result=""+ parseInt(dayC) +"天前";
	}
	else if(hourC>=1){
		result=""+ parseInt(hourC) +"小时前";
	}
	else if(minC>=1){
		result=""+ parseInt(minC) +"分钟前";
	}else
	result="刚刚";
	return result;
};

function clickList1(evt, target){
   var _action = evt.target.getAttribute('index');
   return ['Category', _action, 'label', {arg1: 0, arg2: 0, arg3:0, arg4:0, arg5:0}, 0];;
}


var avaTimer = 5000; //定时向avatar发数据
var maxtime = 5; //一个小时，按秒计算，自己调整!  
var dtime = -5;
var timecount = 1; 
function CountDown() {
	if (maxtime >= 1) {
             minutes = Math.floor(maxtime / 60);
             seconds = Math.floor(maxtime % 60);
             msg = "距离结束还有" + minutes + "分" + seconds + "秒";
             --maxtime;
     	} else{
     		maxtime = maxtime + 10*timecount + 5;
     		timecount ++;
     		if(maxtime==0){
     			maxtime =5;
     		}
     		dtime = dtime + 10
         	Avatar.push(['track', ['stay', 'mainpage', '', {duration:dtime+1}, 0]])
     }
 }
 avaTimer = setInterval("CountDown()", 1000);  
 

//$.ajax({
//	url:"https://irs.qq.com/openapi/index?key=lenovo:24h",
//	type:"get",
//	dataType : "jsonp",
//	success:function(data){
//		console.log(data)
//	},
//	error:function(data){
//		alert(data)
//	}
//})