var itypeItem = 1;//全局变量   用于滚动加载更多的变量
var tabName = '推荐';
var j = 2;
var timer = 5000; //定时向avatar发数据
var timerNum = 0; 
$(function(){
//当键盘键被松开时发送Ajax获取数据
		$('#spinput').keyup(function(){
			var keywords = $(this).val();
			$.ajax({
			//	url: 'http://suggestion.baidu.com/su?wd='+keywords,
		    	url: "https://mbsug.ssl.so.com/sug?channel=type_webpage&word="+keywords+"&count=6",
				type:"get",
			    dataType:"jsonp",
				jsonp: 'callback', //回调函数的参数名(键值)key
				success:function(data){
					//	console.log(data);
						$('#word').empty().show();
						$.each(data.data.sug, function(){
						$('#word').append('<div class="click_work">'+ this.word +'</div>');
					})
				},
				error:function(data){
				}
			})
			
		})
		//点击搜索数据复制给搜索框
		$(document).on('click','.click_work',function(){
			var inputword = $("#spinput").val();
			var word = $(this).text();
			$('#spinput').val(word);
			$('#word').hide();
		//	Avatar.push(['track', ['search', 'result', '', {arg1:0, arg2:0, arg3:0, arg4:0, arg5:0}, 0]]);
			searchcontent(1,inputword);
			
			// $('#texe').trigger('click');触发搜索事件
		})

		
	})


window.onresize = function(){
	//document.getElementById("info_jb51_net").innerHTML="宽度："+document.documentElement.clientWidth+"，高度："+document.documentElement.clientHeight;
	if(document.body.scrollWidth < 1300){
		$("#m-list").hide();
	    }else{
	    $("#m-list").show();
	   }

}
	
$(function(){
	$("#infoid").hide();
	$("#v_phone").hide();
  //  $('body,html').animate({scrollTop:0},1000);
        //当滚动条的位置处于距顶部330像素以下时，跳转链接出现，否则消失
        $(function () {
            $(window).scroll(function(){
                if ($(window).scrollTop()>110 && $(window).scrollTop()<608){
                	$("#m-search").css('z-index','101');
                	$("#m-search").css('position','fixed');
                	$("#m-search").css('top',0);
                	
                	$("#m-website").css("margin-top",'140px');
                	$("#m-newList").css("margin-top",0);
                	$("#m-flow").css('position','static');
                	$("#infoid").hide();
                 } 
                else if ($(window).scrollTop()>=608) {
                	$("#m-search").css('z-index','101');
                 	$("#m-search").css('position','fixed');
                 	$("#m-search").css('top',0);
                 	$("#m-flow").css('z-index','101');
                 	$("#m-flow").css('position','fixed');
                 	$("#m-flow").css('top',142);
                 	$("#infoid").show();
                 	
                 	$("#m-newList").css("margin-top",'45px');
                  } 
                else {
                    $("#m-search").css('position','static');
                    $("#m-flow").css('position','static');
                    $("#infoid").hide();
                    $("#m-website").css('top','0');
                    
                    $("#m-website").css("margin-top",0);
                    $("#m-newList").css("margin-top",0);
                    }
            });
 
            //当点击跳转链接后，回到页面顶部位置
            $("#back-to-top").click(function(){
                $('body,html').animate({scrollTop:0},1000);
                Avatar.push(['track', ['menu', 'top', '',  0]]);
                return false;
            });
            
            $("#go-to-news").click(function(){
                $('body,html').animate({scrollTop:608},1000);
                Avatar.push(['track', ['menu', 'news', '',  0]]);
                return false;
            });
        });
    });
function getScrollTop(){
	　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
	　　if(document.body){
	　　　　bodyScrollTop = document.body.scrollTop;
	　　}
	　　if(document.documentElement){
	　　　　documentScrollTop = document.documentElement.scrollTop;
	　　}
	　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
	　　return scrollTop;
	}
	//文档的总高度
	function getScrollHeight(){
	　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
	　　if(document.body){
	　　　　bodyScrollHeight = document.body.scrollHeight;
	　　}
	　　if(document.documentElement){
	　　　　documentScrollHeight = document.documentElement.scrollHeight;
	　　}
	　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
	　　return scrollHeight;
	}
	//浏览器视口的高度
	function getWindowHeight(){
	　　var windowHeight = 0;
	　　if(document.compatMode == "CSS1Compat"){
	　　　　windowHeight = document.documentElement.clientHeight;
	　　}else{
	　　　　windowHeight = document.body.clientHeight;
	　　}
	　　return windowHeight;
	}
	

	
	
	$(window).scroll(function() { 
		var winH = $(window).height(); //页面可视区域高度  
	    var	pageH = $(document).height();  
	    var	scrollT = $(window).scrollTop(); //滚动条top  
		if(winH + scrollT >= pageH){
			　moreReconmend();
		};
	});
	
	
	$(function($){
    	//自动定位
 	//	locationInit();
 		//获得城市天气
 		cityWeatherInit();
 		//二级城市联动默认隐藏
 		$("#area").hide();
 		//获得头部文字 链接
 		get_head_text_link();
 		//获得带图热站
 		get_hot_web_pic();
 		//获得热站
 		get_hot_web();
 		//获得搜索框下的实时热点
 		get_hot_spots();
 		//添加搜索的回车事件
 		enter();    
 		//加载腾讯信息流  默认推荐
 		information();
 		$("#tab1").attr("class", "fl lion");
 		$("#tab1 a").attr("class", "fl aon");
 	//	interval();//定时向avatar发消息
 		
	});
	
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
         timer = setInterval("CountDown()", 1000);   

 	function moreReconmend(){
 		var tabNameItem ;
 	//瀑布加载滚动次数
 		var url ;
 		if(itypeItem == 1){
 			url = 'http://irs.qq.com/partners/lenovo?num=8&page='+j+'';
 			j = j + 1;
 			tabNameItem = 'reconmend';
 		}else if(itypeItem == 2){
 			url = 'http://irs.qq.com/partners/lenovo?num=8&category=ent&page='+j+'';
 			j = j + 1;
 			tabNameItem = 'ent';
 		}
 		else if(itypeItem == 3){
 			url = 'http://irs.qq.com/partners/lenovo?num=8&category=sports&page='+j+'';
 			j = j + 1;
 			tabNameItem = 'sports';
 		}else if(itypeItem == 4){
 			url = 'http://irs.qq.com/partners/lenovo?num=8&category=finance&page='+j+'';
 			j = j + 1;
 			tabNameItem = 'finance';
 		}else if(itypeItem == 5){
 			url = 'http://irs.qq.com/partners/lenovo?num=8&category=society&page='+j+'';
 			j = j + 1;
 			tabNameItem = 'society';
 		}else if(itypeItem == 6){
 			url = 'http://irs.qq.com/partners/lenovo?num=8&category=milite&page='+j+'';
 			j = j + 1;
 			tabNameItem = 'milite';
 		}else if(itypeItem == 7){
 			url = 'http://irs.qq.com/partners/lenovo?num=8&category=fashion&page='+j+'';
 			j = j + 1;
 			tabNameItem = 'fashion';
 		}else if(itypeItem == 8){
 			url = 'http://irs.qq.com/partners/lenovo?num=8&category=auto&page='+j+'';
 			j = j + 1;
 			tabNameItem = 'auto';
 		}else if(itypeItem == 9){
 			url = 'http://irs.qq.com/partners/lenovo?num=8&category=games&page='+j+'';
 			j = j + 1;
 			tabNameItem = 'games';
 		}else if(itypeItem == 10){
 			url = 'http://irs.qq.com/partners/lenovo?num=8&flag=video&page='+j+'';
 			j = j + 1;
 			tabNameItem = 'video';
 		}else if(itypeItem == 11){
 			url = 'http://irs.qq.com/partners/lenovo?num=8&flag=image&page='+j+'';
 			j = j + 1;
 			tabNameItem = 'image';
 		}else{ 
 			url = 'http://irs.qq.com/partners/lenovo?num=8&page='+j+'';
 			j = j + 1;
 			tabNameItem = 'reconmend';
 		}
 		Avatar.push(['track', ['load', 'more', '', {tab:tabNameItem},0]]);
 		 $.ajax({
		        url: url,
		        dataType:"jsonp",
		        success: function(data){
		        	var obj = data.data;
		        	for(var i=0; i<8; i++){//前9张为图文
		        		var pastTime = formatMsgTime(obj[i].ts);
		        		var urlvideo = obj[i].vurl;
		        		if(obj[i].article_type==100){
		        			urlvideo = obj[i].url;
		        		}
		        		addElement_imageText(
		        					obj[i].img,obj[i].title,obj[i].source,obj[i].view_count,
		        					pastTime,urlvideo,obj[i].article_type,obj[i].id,
		        					obj[i].category_chn);
		        				}
			        	/*if(obj[9].article_type==1){//第9张如果是组图显示，非组图不显示
			        		addElement_groupimg(
		        				obj[9].multi_imgs,obj[9].title,obj[9].source,
		     					obj[9].view_count,obj[9].publish_time,
		     					obj[9].article_type,obj[9].id,obj[9].vurl,obj[9].category_chn);
     			}*/
		        },
		        error: function(){
		        	alert("error")
		        }
		    }); 
 	}
	
	function reconmendNews(url,itype){
		 $.ajax({
		        url: url,
		        dataType:"jsonp",
		        success: function(data){
		        	var obj = data.data;
		        //	console.log(obj);
		        	$(".groupimg").css('display','none');
        			$(".image-text-li").css('display','none');
		        	for(var i=0; i<8; i++){
		        	//	if(obj[i].article_type==0){//图文类型
		        		var pastTime = formatMsgTime(obj[i].ts);
		        		var videourl = obj[i].vurl;
		        		if(obj[i].article_type==100){
		        			videourl = obj[i].url;
		        		}
		        			addElement_imageText(
		        					obj[i].img,obj[i].title,obj[i].source,obj[i].view_count,
		        					pastTime,videourl,obj[i].article_type,obj[i].id,
		        					obj[i].category_chn);
		        
		        	}
		        	
		        },
		        error: function(){
		        	alert("error")
		        }
		    }); 
	}
	
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
	
	function addElement_groupimg(imgs,title,source,view_count,publish_time,article_type,newsid,url,category_chn){
		
		var src1 ;var src2;var src3;var src4;
		for (var key in imgs) {  
			src1 = imgs[0]
			src2 = imgs[1]
			src3 = imgs[2]
			src4 = imgs[3]
        }
		var reconmendDiv =  document.getElementById("m-newList");
		var groupimgDiv =  document.createElement("div");
		groupimgDiv.setAttribute("class", "groupimg");
		reconmendDiv.appendChild(groupimgDiv);
		var groupimgp = document.createElement("p");
		groupimgp.innerHTML = title;
		groupimgDiv.appendChild(groupimgp);
		
		var div1 = document.createElement("div");
		div1.setAttribute("class", "fl fourimg");
		groupimgDiv.appendChild(div1);
		var img1 = document.createElement("img");
		img1.src = src1;
		img1.setAttribute("class", "imgwh");
		div1.appendChild(img1);
		
		var div2 = document.createElement("div");
		div2.setAttribute("class", "fl fourimg");
		groupimgDiv.appendChild(div2);
		var img2 = document.createElement("img");
		img2.src = src2;
		img2.setAttribute("class", "imgwh");
		div2.appendChild(img2);
		
		var div3 = document.createElement("div");
		div3.setAttribute("class", "fl fourimg");
		groupimgDiv.appendChild(div3);
		var img3 = document.createElement("img");
		img3.src = src3;
		img3.setAttribute("class", "imgwh");
		div3.appendChild(img3);
		
		var div4 = document.createElement("div");
		div4.setAttribute("class", "fl fourimg");
		groupimgDiv.appendChild(div4);
		var img4 = document.createElement("img");
		img4.src = src4;
		img4.setAttribute("class", "imgwh");
		div4.appendChild(img4);
		
		var span1 = document.createElement("span");
		span1.setAttribute("class", "imgtype");
		span1.innerHTML = category_chn;
		groupimgDiv.appendChild(span1);
		
		var span2 = document.createElement("span");
		span2.setAttribute("class", "firstspan");
		span2.innerHTML = source;
		groupimgDiv.appendChild(span2);
		
		var span3 = document.createElement("span");
		span3.setAttribute("class", "secendspan");
		span3.innerHTML = view_count+"人评论";
		groupimgDiv.appendChild(span3);
		
		var span4 = document.createElement("span");
		span4.setAttribute("class", "lastspan");
		span4.innerHTML = publish_time;
		groupimgDiv.appendChild(span4);
	
		groupimgDiv.onclick=function(){//给p标签添加onclick事件
		    	Avatar.push(['track', ['click', 'detail', '', {tab:category_chn, id:newsid}, 0]]);
		    	window.open(url);
	    };
		
	}
	function addElement_imageText(img,title,source,view_count,publish_time,url,article_type,newsid,category_chn){
		/*var reconmendDiv =  document.getElementById("m-newList");
		var reconmendDivWarp = document.createElement("div");
		reconmendDivWarp.setAttribute("class", "wrap");
		reconmendDiv.appendChild(reconmendDivWarp);
		var ul = document.createElement("ul");
		reconmendDivWarp.appendChild(ul);*/
		
		var ul = document.getElementById("newListul");
		var li = document.createElement("li");
		li.setAttribute("class", "fl image-text-li");
		ul.appendChild(li);
		var lidiv = document.createElement("div");
		lidiv.setAttribute("class", "newsdetail");
		li.appendChild(lidiv);
		
		var imgdiv = document.createElement("div");
		imgdiv.setAttribute("class", "fl image-text-li");
		var liimg = document.createElement("img");
		liimg.src = img;
		lidiv.appendChild(liimg);
		
		if(itypeItem==1||itypeItem==undefined){
			var typediv = document.createElement("div");
			if(category_chn==""||category_chn.length>3){
				category_chn = "其他";
			}
			typediv.innerHTML = category_chn;
			typediv.setAttribute("class", "typetext");
			lidiv.appendChild(typediv);
		}
		var lip = document.createElement("p");
		lip.innerHTML = title.substring(0,25);
		lidiv.appendChild(lip);
		var span1 = document.createElement("span");
		span1.setAttribute("class", "firstspan");
		span1.innerHTML = source.substring(0,5);
		lidiv.appendChild(span1);
		var span2 = document.createElement("span");
		span2.innerHTML = view_count+"评论";
		span2.setAttribute("class", "secendspan");
		lidiv.appendChild(span2);
		var span3 = document.createElement("span");
		span3.setAttribute("class", "lastspan");
		span3.innerHTML = publish_time;
		lidiv.appendChild(span3);
		
		li.onclick=function(){//给p标签添加onclick事件
	    	Avatar.push(['track', ['click', 'detail', '', {tab:category_chn, id:newsid}, 0]]);
	    	window.open(url);
		};
	}
	function tolenovo(){
		window.open('http://www.lenovo.com/');
	}
	function get_head_text_link(){
		 $.ajax({
	        url: 'homepage/get_head_text_link',
	        success: function(data){
	        	var listobj = data.data[0];
	        	//console.log(listobj)
	        	for(var i in listobj){
	        		$("#firstlenovoad").html(listobj[i][0].advise);
	  	        	$("#firstlenovoad").attr('href',listobj[i][0].url);
	  	        	$("#secendlenovoad").html(listobj[i][1].advise);
	  	        	$("#secendlenovoad").attr('href',listobj[i][1].url);
	        	}
	        },
	        error: function(){}
	    }); 
	}
	
	function get_hot_web_pic(){
		$.ajax({
	        url: 'homepage/get_hot_web_pic',
	        success: function(data){
	        	var listobj = data.data[0].adm;
	        //	console.log(listobj)
	        	var hot_web_pic = document.getElementById("hot_web_pic");
	        	for(var i=0; i<listobj.length; i++) { 
	        			addElement_pic(i,listobj[i].adi,listobj[i].websiteName,listobj[i].landingPage,listobj[i].showPopularTag)
	        		}
	        },
	        error: function(){}
	    }); 
	}
	
	function addElement_pic(i,imgsrc,website,landingPage,showPopularTag){
			//获得ul
			var ul = document.getElementById("hot_web_pic");
			//创建li
			var li = document.createElement("li");
			//给li设置属性
		　　  li.setAttribute("class", "fl limar");
		  	li.setAttribute("id", "liid"+i);
		  	//添加子节点li
		　　  ul.appendChild(li);
		    //获得当前添加的li 
		    var newli =  document.getElementById("liid"+i);
		    //在添加的li中创建子节点div
		    var div = document.createElement("div");
		    //给子节点div设置属性
		    div.setAttribute("id", "divid"+i);
		    //创建子节点
		    newli.appendChild(div);
		    var newdiv =  document.getElementById("divid"+i);
		    //给div设置div
		 //   document.getElementById("divid"+i).style.width="58px";
		 //   document.getElementById("divid"+i).style.height="59px";
		    //创建子节点img
		    var img = document.createElement("img");
		    //给img设置属性
		    img.src = imgsrc;
		    //添加子节点
		    newdiv.appendChild(img);
		    //创建子节点p
		    var textp = document.createElement("p");
		    if(showPopularTag=='1'){
		    	textp.style.color= "red";
		    }
		    textp.innerHTML = website;
		    newdiv.appendChild(textp);
		    newdiv.onclick=function(){//给p标签添加onclick事件
		    	Avatar.push(['track', ['click', 'icon', '', {url:landingPage, name:website}, 0]]);
		    	window.open(landingPage);
	    };
	}
	
	function get_hot_web(){
		$.ajax({
	        url: 'homepage/get_hot_web',
	        type:"get",
	        success: function(data){
	        	if(data[5]!=undefined){
	        		addElement_title(5);
	        		for(var i=0; i<9; i++){
	        			addElement_web(5,i,data[5][i].websiteName,data[5][i].landingPage,data[5][i].showPopularTag)
		        	}
	        	}	
		          if(data[4]!=undefined){
	        		addElement_title(4);
	        		for(var i=0; i<9; i++){
	        			addElement_web(4,i,data[4][i].websiteName,data[4][i].landingPage,data[4][i].showPopularTag)
		        	}
	        	}
	        	if(data[3]!=undefined){
	        		addElement_title(3);
	        		for(var i=0; i<9; i++){
	        			addElement_web(3,i,data[3][i].websiteName,data[3][i].landingPage,data[3][i].showPopularTag)
		        	}
	        	}
	        	if(data[7]!=undefined){
	        		addElement_title(7);
	        		for(var i=0; i<9; i++){
	        			addElement_web(7,i,data[7][i].websiteName,data[7][i].landingPage,data[7][i].showPopularTag)
		        	}
	        	}
	        	if(data[1]!=undefined){
	        		addElement_title(1);
	        		for(var i=0; i<9; i++){
	        			addElement_web(1,i,data[1][i].websiteName,data[1][i].landingPage,data[1][i].showPopularTag)
		        	}
	        	}
	        	if(data[0]!=undefined){
	        		addElement_title(0);
	        		for(var i=0; i<9; i++){
	        			addElement_web(0,i,data[0][i].websiteName,data[0][i].landingPage,data[0][i].showPopularTag)
		        	}
	        	}
	        },
	        error: function(){}
	    }); 
	}
	
	function addElement_web(webtype,i,webname,landingPage,showPopularTag){
		var ul = document.getElementById("hot_web");
		var li = document.createElement("li");
		li.setAttribute("class", "fl limar");
		ul.appendChild(li);
		var text_a = document.createElement("a");
		if(showPopularTag=='1'){
			text_a.style.color= "red";
	    }
		li.appendChild(text_a);
		text_a.setAttribute("id", "li"+webtype+i);
		$("#li"+webtype+i).text(webname);
		$("#li"+webtype+i).attr("target","view_window"); 
		$("#li"+webtype+i).attr("href",landingPage); 
		$("#li"+webtype+i).attr('onclick',"pushtitle('"+landingPage+"','"+webname+"')");
	}
	function pushtitle(landingPage,webname){
		Avatar.push(['track', ['click', 'title', '', {url:landingPage, name:webname}, 0]]);
	}
	function addElement_title(webtype){
		var ul = document.getElementById("hot_web");
		var li = document.createElement("li");
		li.setAttribute("class", "fl limar");
		ul.appendChild(li);
		var text_a = document.createElement("a");
		text_a.setAttribute("class", "title");
		li.appendChild(text_a);
		if(webtype==0){
			text_a.setAttribute("id", "game");
			$("#game").text("游戏");
		}
		else if(webtype==1){
			text_a.setAttribute("id", "shoppingNews");
			$("#shoppingNews").text("购物");
		}
		else if(webtype==3){
			text_a.setAttribute("id", "movie");
			$("#movie").text("电影");
		}
		else if(webtype==4){
			text_a.setAttribute("id", "TVseries");
			$("#TVseries").text("电视");
		}
		else if(webtype==5){
			text_a.setAttribute("id", "internetNews");
			$("#internetNews").text("新闻");
		}
		else if(webtype==7){
			text_a.setAttribute("id", "novel");
			$("#novel").text("小说");
		}
		else{
			text_a.setAttribute("id", "elsenews");
			$("#elsenews").text("其他");
		}
	}
	
	function get_hot_spots(){
		$.ajax({
	        url: 'https://mbsug.ssl.so.com/idxdata/get?type=hot&hotnum=3&hotinclude=key_word',
	        type:"get",
	        dataType:"jsonp",
	        success: function(data){
	        	$("#hot_spots1").html(data.data.hot[0].key_word);
	        	$("#hot_spots2").html(data.data.hot[1].key_word);
	        	$("#hot_spots3").html(data.data.hot[2].key_word);
	        	
	        },
	        error: function(){}
	    }); 
		
	}

	function information(itype){
//		if(itype!=undefined){
//			$('body,html').animate({scrollTop:608},1000);
//		}
		itypeItem = itype;
		var url = '';
		if(itype==1){
			url = 'http://irs.qq.com/partners/lenovo?num=8&page=1';
			$("#tab1").attr("class", "fl lion");$("#tab1 a").attr("class", "aon");
			$("#tab2").attr("class", "fl liout");$("#tab2 a").attr("class", "aout");
			$("#tab3").attr("class", "fl liout");$("#tab3 a").attr("class", "aout");
			$("#tab4").attr("class", "fl liout");$("#tab4 a").attr("class", "aout");
			$("#tab5").attr("class", "fl liout");$("#tab5 a").attr("class", "aout");
			$("#tab6").attr("class", "fl liout");$("#tab6 a").attr("class", "aout");
			$("#tab7").attr("class", "fl liout");$("#tab7 a").attr("class", "aout");
			$("#tab8").attr("class", "fl liout");$("#tab8 a").attr("class", "aout");
			$("#tab9").attr("class", "fl liout");$("#tab9 a").attr("class", "aout");
			$("#tab10").attr("class", "fl liout");$("#tab10 a").attr("class", "aout");
			$("#tab11").attr("class", "fl liout");$("#tab11 a").attr("class", "aout");
			tabName = 'reconmend';
		}
		else if(itype==2){
			url = 'http://irs.qq.com/partners/lenovo?num=8&category=ent&page=1';
			$("#tab1").attr("class", "fl liout");$("#tab1 a").attr("class", "aout");
			$("#tab2").attr("class", "fl lion");$("#tab2 a").attr("class", "aon");
			$("#tab3").attr("class", "fl liout");$("#tab3 a").attr("class", "aout");
			$("#tab4").attr("class", "fl liout");$("#tab4 a").attr("class", "aout");
			$("#tab5").attr("class", "fl liout");$("#tab5 a").attr("class", "aout");
			$("#tab6").attr("class", "fl liout");$("#tab6 a").attr("class", "aout");
			$("#tab7").attr("class", "fl liout");$("#tab7 a").attr("class", "aout");
			$("#tab8").attr("class", "fl liout");$("#tab8 a").attr("class", "aout");
			$("#tab9").attr("class", "fl liout");$("#tab9 a").attr("class", "aout");
			$("#tab10").attr("class", "fl liout");$("#tab10 a").attr("class", "aout");
			$("#tab11").attr("class", "fl liout");$("#tab11 a").attr("class", "aout");
			tabName = 'ent';
		}
		else if(itype==3){
			url = 'http://irs.qq.com/partners/lenovo?num=8&category=sports&page=1';
			$("#tab1").attr("class", "fl liout");$("#tab1 a").attr("class", "aout");
			$("#tab2").attr("class", "fl liout");$("#tab2 a").attr("class", "aout");
			$("#tab3").attr("class", "fl lion");$("#tab3 a").attr("class", "aon");
			$("#tab4").attr("class", "fl liout");$("#tab4 a").attr("class", "aout");
			$("#tab5").attr("class", "fl liout");$("#tab5 a").attr("class", "aout");
			$("#tab6").attr("class", "fl liout");$("#tab6 a").attr("class", "aout");
			$("#tab7").attr("class", "fl liout");$("#tab7 a").attr("class", "aout");
			$("#tab8").attr("class", "fl liout");$("#tab8 a").attr("class", "aout");
			$("#tab9").attr("class", "fl liout");$("#tab9 a").attr("class", "aout");
			$("#tab10").attr("class", "fl liout");$("#tab10 a").attr("class", "aout");
			$("#tab11").attr("class", "fl liout");$("#tab11 a").attr("class", "aout");
			tabName = 'sports';
		}
		else if(itype==4){
			url = 'http://irs.qq.com/partners/lenovo?num=8&category=finance&page=1';
			$("#tab1").attr("class", "fl liout");$("#tab1 a").attr("class", "aout");
			$("#tab2").attr("class", "fl liout");$("#tab2 a").attr("class", "aout");
			$("#tab3").attr("class", "fl liout");$("#tab3 a").attr("class", "aout");
			$("#tab4").attr("class", "fl lion");$("#tab4 a").attr("class", "aon");
			$("#tab5").attr("class", "fl liout");$("#tab5 a").attr("class", "aout");
			$("#tab6").attr("class", "fl liout");$("#tab6 a").attr("class", "aout");
			$("#tab7").attr("class", "fl liout");$("#tab7 a").attr("class", "aout");
			$("#tab8").attr("class", "fl liout");$("#tab8 a").attr("class", "aout");
			$("#tab9").attr("class", "fl liout");$("#tab9 a").attr("class", "aout");
			$("#tab10").attr("class", "fl liout");$("#tab10 a").attr("class", "aout");
			$("#tab11").attr("class", "fl liout");$("#tab11 a").attr("class", "aout");
			tabName = 'finance';
		}
		else if(itype==5){
			url = 'http://irs.qq.com/partners/lenovo?num=8&category=society&page=1';
			$("#tab1").attr("class", "fl liout");$("#tab1 a").attr("class", "aout");
			$("#tab2").attr("class", "fl liout");$("#tab2 a").attr("class", "aout");
			$("#tab3").attr("class", "fl liout");$("#tab3 a").attr("class", "aout");
			$("#tab4").attr("class", "fl liout");$("#tab4 a").attr("class", "aout");
			$("#tab5").attr("class", "fl lion");$("#tab5 a").attr("class", "aon");
			$("#tab6").attr("class", "fl liout");$("#tab6 a").attr("class", "aout");
			$("#tab7").attr("class", "fl liout");$("#tab7 a").attr("class", "aout");
			$("#tab8").attr("class", "fl liout");$("#tab8 a").attr("class", "aout");
			$("#tab9").attr("class", "fl liout");$("#tab9 a").attr("class", "aout");
			$("#tab10").attr("class", "fl liout");$("#tab10 a").attr("class", "aout");
			$("#tab11").attr("class", "fl liout");$("#tab11 a").attr("class", "aout");
			tabName = 'society';
		}
		else if(itype==6){
			url = 'http://irs.qq.com/partners/lenovo?num=8&category=milite&page=1';
			$("#tab1").attr("class", "fl liout");$("#tab1 a").attr("class", "aout");
			$("#tab2").attr("class", "fl liout");$("#tab2 a").attr("class", "aout");
			$("#tab3").attr("class", "fl liout");$("#tab3 a").attr("class", "aout");
			$("#tab4").attr("class", "fl liout");$("#tab4 a").attr("class", "aout");
			$("#tab5").attr("class", "fl liout");$("#tab5 a").attr("class", "aout");
			$("#tab6").attr("class", "fl lion");$("#tab6 a").attr("class", "aon");
			$("#tab7").attr("class", "fl liout");$("#tab7 a").attr("class", "aout");
			$("#tab8").attr("class", "fl liout");$("#tab8 a").attr("class", "aout");
			$("#tab9").attr("class", "fl liout");$("#tab9 a").attr("class", "aout");
			$("#tab10").attr("class", "fl liout");$("#tab10 a").attr("class", "aout");
			$("#tab11").attr("class", "fl liout");$("#tab11 a").attr("class", "aout");
			tabName = 'milite';
		}
		else if(itype==7){
			url = 'http://irs.qq.com/partners/lenovo?num=8&category=fashion&page=1';
			$("#tab1").attr("class", "fl liout");$("#tab1 a").attr("class", "aout");
			$("#tab2").attr("class", "fl liout");$("#tab2 a").attr("class", "aout");
			$("#tab3").attr("class", "fl liout");$("#tab3 a").attr("class", "aout");
			$("#tab4").attr("class", "fl liout");$("#tab4 a").attr("class", "aout");
			$("#tab5").attr("class", "fl liout");$("#tab5 a").attr("class", "aout");
			$("#tab6").attr("class", "fl liout");$("#tab6 a").attr("class", "aout");
			$("#tab7").attr("class", "fl lion");$("#tab7 a").attr("class", "aon");
			$("#tab8").attr("class", "fl liout");$("#tab8 a").attr("class", "aout");
			$("#tab9").attr("class", "fl liout");$("#tab9 a").attr("class", "aout");
			$("#tab10").attr("class", "fl liout");$("#tab10 a").attr("class", "aout");
			$("#tab11").attr("class", "fl liout");$("#tab11 a").attr("class", "aout");
			tabName = 'fashion';
		}
		else if(itype==8){
			url = 'http://irs.qq.com/partners/lenovo?num=8&category=auto&page=1';
			$("#tab1").attr("class", "fl liout");$("#tab1 a").attr("class", "aout");
			$("#tab2").attr("class", "fl liout");$("#tab2 a").attr("class", "aout");
			$("#tab3").attr("class", "fl liout");$("#tab3 a").attr("class", "aout");
			$("#tab4").attr("class", "fl liout");$("#tab4 a").attr("class", "aout");
			$("#tab5").attr("class", "fl liout");$("#tab5 a").attr("class", "aout");
			$("#tab6").attr("class", "fl liout");$("#tab6 a").attr("class", "aout");
			$("#tab7").attr("class", "fl liout");$("#tab7 a").attr("class", "aout");
			$("#tab8").attr("class", "fl lion");$("#tab8 a").attr("class", "aon");
			$("#tab9").attr("class", "fl liout");$("#tab9 a").attr("class", "aout");
			$("#tab10").attr("class", "fl liout");$("#tab10 a").attr("class", "aout");
			$("#tab11").attr("class", "fl liout");$("#tab11 a").attr("class", "aout");
			tabName = 'auto';
		}
		else if(itype==9){
			url = 'http://irs.qq.com/partners/lenovo?num=8&category=games&page=1';
			$("#tab1").attr("class", "fl liout");$("#tab1 a").attr("class", "aout");
			$("#tab2").attr("class", "fl liout");$("#tab2 a").attr("class", "aout");
			$("#tab3").attr("class", "fl liout");$("#tab3 a").attr("class", "aout");
			$("#tab4").attr("class", "fl liout");$("#tab4 a").attr("class", "aout");
			$("#tab5").attr("class", "fl liout");$("#tab5 a").attr("class", "aout");
			$("#tab6").attr("class", "fl liout");$("#tab6 a").attr("class", "aout");
			$("#tab7").attr("class", "fl liout");$("#tab7 a").attr("class", "aout");
			$("#tab8").attr("class", "fl liout");$("#tab8 a").attr("class", "aout");
			$("#tab9").attr("class", "fl lion");$("#tab9 a").attr("class", "aon");
			$("#tab10").attr("class", "fl liout");$("#tab10 a").attr("class", "aout");
			$("#tab11").attr("class", "fl liout");$("#tab11 a").attr("class", "aout");
			tabName = 'games';
		}
		else if(itype==10){
			url = 'http://irs.qq.com/partners/lenovo?num=8&flag=video&page=1';
			$("#tab1").attr("class", "fl liout");$("#tab1 a").attr("class", "aout");
			$("#tab2").attr("class", "fl liout");$("#tab2 a").attr("class", "aout");
			$("#tab3").attr("class", "fl liout");$("#tab3 a").attr("class", "aout");
			$("#tab4").attr("class", "fl liout");$("#tab4 a").attr("class", "aout");
			$("#tab5").attr("class", "fl liout");$("#tab5 a").attr("class", "aout");
			$("#tab6").attr("class", "fl liout");$("#tab6 a").attr("class", "aout");
			$("#tab7").attr("class", "fl liout");$("#tab7 a").attr("class", "aout");
			$("#tab8").attr("class", "fl liout");$("#tab8 a").attr("class", "aout");
			$("#tab9").attr("class", "fl liout");$("#tab9 a").attr("class", "aout");
			$("#tab10").attr("class", "fl lion");$("#tab10 a").attr("class", "aon");
			$("#tab11").attr("class", "fl liout");$("#tab11 a").attr("class", "aout");
			tabName = 'video';
		}
		else if(itype==11){
			url = 'http://irs.qq.com/partners/lenovo?num=8&flag=image&page=1';
			$("#tab1").attr("class", "fl liout");$("#tab1 a").attr("class", "aout");
			$("#tab2").attr("class", "fl liout");$("#tab2 a").attr("class", "aout");
			$("#tab3").attr("class", "fl liout");$("#tab3 a").attr("class", "aout");
			$("#tab4").attr("class", "fl liout");$("#tab4 a").attr("class", "aout");
			$("#tab5").attr("class", "fl liout");$("#tab5 a").attr("class", "aout");
			$("#tab6").attr("class", "fl liout");$("#tab6 a").attr("class", "aout");
			$("#tab7").attr("class", "fl liout");$("#tab7 a").attr("class", "aout");
			$("#tab8").attr("class", "fl liout");$("#tab8 a").attr("class", "aout");
			$("#tab9").attr("class", "fl liout");$("#tab9 a").attr("class", "aout");
			$("#tab10").attr("class", "fl liout");$("#tab10 a").attr("class", "aout");
			$("#tab11").attr("class", "fl lion");$("#tab11 a").attr("class", "aon");
			tabName = 'image';
		}else{
			url = 'http://irs.qq.com/partners/lenovo?num=8&page=1';
			tabName = 'reconmend';
		}
		//tab切换， 固定滚动条位置
		/*if(itype==1||itype==2||itype==3||itype==4||itype==5||itype==6||itype==7||itype==8||itype==9||itype==10||itype==11){
			window.scrollTo(0, 500);
		}*/
		if(itype!=undefined){
			window.scrollTo(0, 500);
			Avatar.push(['track', ['click', 'column', '', {tab:tabName},0]]);

		}
		reconmendNews(url,itype);
		
	//	 $('body,html').animate({scrollTop:608},1000);

	}
	
	//显示lenovoId web登录界面
	function showLenovoIdLoginLayout() {
      Avatar.push(['track', ['click', 'login', '', 0]]);
	  layer.open({
	      type:2 
	      ,area:['493px', '409px']
	      ,title:'登录'
	      ,shade:0.3 
	      ,fixed: false //不固定
	      ,content: ['https://passport.lenovo.com.cn/wauthen2/wauth/jsp/ilogin.jsp?lenovoid.action=uilogin&lenovoid.realm=pcassistant.lenovo.com&lenovoid.ctx=urlencodeCtx&lenovoid.lang=null&lenovoid.cb=http://223.203.219.175/1.0/user/lidcb&lenovoid.source=browser:pcsdshop.lenovo.com.cn&lenovoid.iframestate='
	       ,'no']
	  }); 
	}
	
	//显示lenovoId web注册界面
	function showLenovoIdRegLayout() {
	  Avatar.push(['track', ['click', 'sign', '', 0]]);
	  layer.open({
	    type:2 
	    ,area:['493px', '435px']
	    ,title:'立即注册'
	    ,shade:0.3 
	    ,fixed: false //不固定
	    ,content:['https://passport.lenovo.com.cn/wauthen2/wauth/jsp/ilogin.jsp?lenovoid.action=newaccount&lenovoid.realm=pcassistant.lenovo.com&lenovoid.ctx=urlencodeCtx&lenovoid.lang=null&lenovoid.cb=http://223.203.219.175/1.0/user/lidcb&lenovoid.source=browser:pcsdshop.lenovo.com.cn&lenovoid.iframestate=register'
	    ,'no']
	  }); 
	}



	/**
	 * 定位当前城市
	 */
 	function locationInit(){
 		$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
			 if (remote_ip_info.ret == '1') {
					cityName = remote_ip_info.province;
			//		console.log(cityName)
					$("#cityName").html(cityName);
			 	}
			 });
 	}
 	
 	/**
 	 * 根据城市获得天气
 	 */
 	function cityWeatherInit(){
 			//跨域是浏览器的安全策略.
 			//jQuery 解决的方式.
 			var relName = getCookie('ccity');
 			if(relName==null){
 				locationInit()
 				relName = $("#cityName").html();
 			}
 			$("#cityName").html(relName);
 			var todayimg = '';
 			var tomorrowimg = '';
 			$.ajax({
 					url:"http://api.map.baidu.com/telematics/v3/weather",
 					type:"get",
 					data:{
 						  location:relName,
 						  output:'json',
 						  ak:'6tYzTvGZSOpYB5Oc2YGGOKt8'
 					},
 					/*预期服务器端返回的数据类型，假设现在跨域了，就改成jsonp 就可以了 */
 				dataType:"jsonp",
 				success:function(data){
 					var weatherData=data.results[0].weather_data;
 					for(var i = 0 ;i< weatherData.length-2; i++){
 						$("#todaytemp").html(weatherData[0].temperature);
 		                $("#todayair").html(weatherData[0].weather);
 		                $("#tomorrowtemp").html(weatherData[1].temperature);
 		                $("#tomorrowair").html(weatherData[1].weather);
 		                //今天天气

						if (weatherData[0].weather == '阴转晴') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/duoyunzhuanqing.png)");
						}
						if (weatherData[0].weather == '多云') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/duoyun-.png)");
						}
						if (weatherData[0].weather == '阴转多云') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/duoyun-.png)");
						}
						if (weatherData[0].weather=='晴') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/qing.png)");
						}
						if (weatherData[0].weather=='小雨') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/xiaoyu.png)");
						}
						if (weatherData[0].weather== '中雨') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/zhongyu.png)");
						}
						if (weatherData[0].weather=='大雨') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/dayu.png)");
						}
						if (weatherData[0].weather=='暴雨') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/baoyu.png)");
						}
						if (weatherData[0].weather=='小雪') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/xiaoxue.png)");
						}
						if (weatherData[0].weather=='中雪') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/zhongxue.png)");
						}
						if (weatherData[0].weather== '大雪') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/daxue.png)");
						}
						if (weatherData[0].weather=='暴雪') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/baoxue.png)");
						}
						if (weatherData[0].weather=='沙尘暴') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/shachenbao.png)");
						}
						if (weatherData[0].weather== '雷阵雨') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/leizhenyu.png)");
						}
						if (weatherData[0].weather== '霾') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/mai.png)");
						}
						if (weatherData[0].weather=='雾') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/wu.png)");
						}
						if (weatherData[0].weather== '多云转晴') {
							$("#col-3")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/duoyunzhuanqing.png)");
						}  
						// 明天天气
						if (weatherData[1].weather == '阴转晴') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/duoyunzhuanqing.png)");
						}
						if (weatherData[1].weather == '多云') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/duoyun-.png)");
						}
						if (weatherData[1].weather == '阴转多云') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/duoyun-.png)");
						}
						if (isContains(weatherData[1].weather, '晴')) {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/qing.png)");
						}
						if (weatherData[1].weather=='小雨') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/xiaoyu.png)");
						}
						if (weatherData[1].weather=='中雨') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/zhongyu.png)");
						}
						if (weatherData[1].weather== '大雨') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/dayu.png)");
						}
						if (weatherData[1].weather== '暴雨') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/baoyu.png)");
						}
						if (weatherData[1].weather=='小雪') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/xiaoxue.png)");
						}
						if (weatherData[1].weather== '中雪') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/zhongxue.png)");
						}
						if (weatherData[1].weather=='大雪') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/daxue.png)");
						}
						if (weatherData[1].weather=='暴雪') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/baoxue.png)");
						}
						if (weatherData[1].weather== '沙尘暴') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/shachenbao.png)");
						}
						if (weatherData[1].weather=='雷阵雨') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/leizhenyu.png)");
						}
						if (weatherData[1].weather== '霾') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/mai.png)");
						}
						if (weatherData[1].weather== '雾') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/wu.png)");
						}
						if (weatherData[1].weather== '多云转晴') {
							$("#col-5")
									.css(
											"background-image",
											"url(https://s3.cn-north-1.amazonaws.com.cn/cn-browser/version-0001/img/weather/duoyunzhuanqing.png)");
						}               
 					}
 				}
 			})
 	}
 	function cityback(){
 		$("#area").hide();
 		$("#col-2").show();
 		$("#col-3").show();
 		$("#col-4").show();
 		$("#col-5").show();
 		$("#col-6").show();
 		cityWeatherInit();
 	}
 	function infoflush(){
 		$('body,html').animate({scrollTop:620},1000);
 		information(itypeItem)
 		
 		if(itypeItem==undefined){
 			tabName = '推荐'
 		}
 		Avatar.push(['track', ['menu', 'refresh', '',  0]]);
 		return false;
 	}
 	
 	function adcount(){
 		 Avatar.push(['track', ['click', 'ad', '', 0]]);
 	}
 	function phonecount(){
		 Avatar.push(['track', ['sacn', 'code', '', 0]]);
	}
 	function v_phone_over(){
 		$("#v_phone").show();
 	}
 	function v_phone_out(){
 		$("#v_phone").hide();
 	}
	$(document).ready(function(){
 	 	var IframeOnClick = {  
 	 		    resolution: 200,  
 	 		    iframes: [],  
 	 		    interval: null,  
 	 		    Iframe: function() {  
 	 		        this.element = arguments[0];  
 	 		        this.cb = arguments[1];   
 	 		        this.hasTracked = false;  
 	 		    },  
 	 		    track: function(element, cb) {  
 	 		        this.iframes.push(new this.Iframe(element, cb));  
 	 		        if (!this.interval) {  
 	 		            var _this = this;  
 	 		            this.interval = setInterval(function() { _this.checkClick(); }, this.resolution);  
 	 		        }  
 	 		    },  
 	 		    checkClick: function() {  
 	 		        if (document.activeElement) {  
 	 		            var activeElement = document.activeElement;  
 	 		            for (var i in this.iframes) {  
 	 		                if (activeElement === this.iframes[i].element) { // user is in this Iframe  
 	 		                    if (this.iframes[i].hasTracked == false) {   
 	 		                        this.iframes[i].cb.apply(window, []);   
 	 		                        this.iframes[i].hasTracked = true;  
 	 		                    }  
 	 		                } else {  
 	 		                    this.iframes[i].hasTracked = false;  
 	 		                }  
 	 		            }  
 	 		        }  
 	 		    }  
 	 		};  
 	 
 	 		IframeOnClick.track(document.getElementById("ifr"), function() { 
 	 	 		Avatar.push(['track', ['click', 'history', '', 0]]);
 	 	 		}); 
 	 	})
 	
 	/**判断是否包含字符串*/
 	function isContains(str, substr) {
 	    return str.indexOf(substr) >= 0;
 	}
 	
 	function changecity(){
 		$("#area").show();
 		$("#col-2").hide();
 		$("#col-3").hide();
 		$("#col-4").hide();
 		$("#col-5").hide();
 		$("#col-6").hide();
 	}
 	
 	var typeItem = "nets";
 	function findtype(findtype){
 		if(findtype==0){
 			$("#nets").css("color",'#ffffff'); 
 			$("#nets").css("background-color",'#ff2525'); 
 			
 			$("#webpage").css("background-color",'#fafafa'); 
 			$("#webpage").css("color",'#000000');
 			$("#news").css("background-color",'#fafafa'); 
 			$("#news").css("color",'#000000'); 
 			$("#map").css("background-color",'#fafafa'); 
 			$("#map").css("color",'#000000'); 
 			$("#video").css("background-color",'#fafafa'); 
 			$("#video").css("color",'#000000'); 
 			$("#picture").css("background-color",'#fafafa'); 
 			$("#picture").css("color",'#000000'); 
 			$("#music").css("background-color",'#fafafa'); 
 			$("#music").css("color",'#000000'); 
 			$("#shopping").css("background-color",'#fafafa'); 
 			$("#shopping").css("color",'#000000'); 
 			$("#known").css("background-color",'#fafafa'); 
 			$("#known").css("color",'#000000'); 
 			typeItem = 'nets';
 		}
 		if(findtype==1){
 			$("#webpage").css("color",'#ffffff'); 
 			$("#webpage").css("background-color",'#ff2525'); 
 			
 			$("#news").css("background-color",'#fafafa'); 
 			$("#news").css("color",'#000000'); 
 			$("#map").css("background-color",'#fafafa'); 
 			$("#map").css("color",'#000000'); 
 			$("#video").css("background-color",'#fafafa'); 
 			$("#video").css("color",'#000000'); 
 			$("#picture").css("background-color",'#fafafa'); 
 			$("#picture").css("color",'#000000'); 
 			$("#music").css("background-color",'#fafafa'); 
 			$("#music").css("color",'#000000'); 
 			$("#shopping").css("background-color",'#fafafa'); 
 			$("#shopping").css("color",'#000000'); 
 			$("#known").css("background-color",'#fafafa'); 
 			$("#known").css("color",'#000000'); 
 			$("#nets").css("background-color",'#fafafa'); 
 			$("#nets").css("color",'#000000')
 			typeItem = 'news';
 		}
 		if(findtype==2){
 			$("#news").css("color",'#ffffff'); 
 			$("#news").css("background-color",'#ff2525'); 
 			$("#webpage").css("background-color",'#fafafa'); 
 			$("#webpage").css("color",'#000000'); 
 			$("#map").css("background-color",'#fafafa'); 
 			$("#map").css("color",'#000000'); 
 			$("#video").css("background-color",'#fafafa'); 
 			$("#video").css("color",'#000000'); 
 			$("#picture").css("background-color",'#fafafa'); 
 			$("#picture").css("color",'#000000'); 
 			$("#music").css("background-color",'#fafafa'); 
 			$("#music").css("color",'#000000'); 
 			$("#shopping").css("background-color",'#fafafa'); 
 			$("#shopping").css("color",'#000000'); 
 			$("#known").css("background-color",'#fafafa'); 
 			$("#known").css("color",'#000000'); 
 			$("#nets").css("background-color",'#fafafa'); 
 			$("#nets").css("color",'#000000')
 			typeItem = 'video';
 		}
 		
 		if(findtype==3){
 			$("#map").css("color",'#ffffff'); 
 			$("#map").css("background-color",'#ff2525'); 
 			$("#news").css("background-color",'#fafafa'); 
 			$("#news").css("color",'#000000'); 
 			$("#webpage").css("background-color",'#fafafa'); 
 			$("#webpage").css("color",'#000000'); 
 			$("#video").css("background-color",'#fafafa'); 
 			$("#video").css("color",'#000000'); 
 			$("#picture").css("background-color",'#fafafa'); 
 			$("#picture").css("color",'#000000'); 
 			$("#music").css("background-color",'#fafafa'); 
 			$("#music").css("color",'#000000'); 
 			$("#shopping").css("background-color",'#fafafa'); 
 			$("#shopping").css("color",'#000000'); 
 			$("#known").css("background-color",'#fafafa'); 
 			$("#known").css("color",'#000000'); 
 			$("#nets").css("background-color",'#fafafa'); 
 			$("#nets").css("color",'#000000')
 			typeItem = 'picture';
 			
 		}
 		if(findtype==4){
 			$("#video").css("color",'#ffffff'); 
 			$("#video").css("background-color",'#ff2525'); 
 			$("#map").css("background-color",'#fafafa'); 
 			$("#map").css("color",'#000000'); 
 			$("#news").css("background-color",'#fafafa'); 
 			$("#news").css("color",'#000000'); 
 			$("#webpage").css("background-color",'#fafafa'); 
 			$("#webpage").css("color",'#000000'); 
 			$("#picture").css("background-color",'#fafafa'); 
 			$("#picture").css("color",'#000000'); 
 			$("#music").css("background-color",'#fafafa'); 
 			$("#music").css("color",'#000000'); 
 			$("#shopping").css("background-color",'#fafafa'); 
 			$("#shopping").css("color",'#000000'); 
 			$("#known").css("background-color",'#fafafa'); 
 			$("#known").css("color",'#000000');
 			$("#nets").css("background-color",'#fafafa'); 
 			$("#nets").css("color",'#000000')
 			typeItem = 'map';
 		}
 		if(findtype==5){
 			$("#picture").css("color",'#ffffff'); 
 			$("#picture").css("background-color",'#ff2525'); 
 			$("#video").css("background-color",'#fafafa'); 
 			$("#video").css("color",'#000000'); 
 			$("#map").css("background-color",'#fafafa'); 
 			$("#map").css("color",'#000000'); 
 			$("#news").css("background-color",'#fafafa'); 
 			$("#news").css("color",'#000000'); 
 			$("#webpage").css("background-color",'#fafafa'); 
 			$("#webpage").css("color",'#000000'); 
 			$("#music").css("background-color",'#fafafa'); 
 			$("#music").css("color",'#000000'); 
 			$("#shopping").css("background-color",'#fafafa'); 
 			$("#shopping").css("color",'#000000'); 
 			$("#known").css("background-color",'#fafafa'); 
 			$("#known").css("color",'#000000'); 
 			$("#nets").css("background-color",'#fafafa'); 
 			$("#nets").css("color",'#000000')
 			typeItem = 'question';
 		}
 		if(findtype==6){
 			$("#music").css("color",'#ffffff'); 
 			$("#music").css("background-color",'#ff2525'); 
 			$("#picture").css("background-color",'#fafafa'); 
 			$("#picture").css("color",'#000000'); 
 			$("#video").css("background-color",'#fafafa'); 
 			$("#video").css("color",'#000000'); 
 			$("#map").css("background-color",'#fafafa'); 
 			$("#map").css("color",'#000000'); 
 			$("#news").css("background-color",'#fafafa'); 
 			$("#news").css("color",'#000000'); 
 			$("#webpage").css("background-color",'#fafafa'); 
 			$("#webpage").css("color",'#000000'); 
 			$("#shopping").css("background-color",'#fafafa'); 
 			$("#shopping").css("color",'#000000'); 
 			$("#known").css("background-color",'#fafafa'); 
 			$("#known").css("color",'#000000'); 
 			$("#nets").css("background-color",'#fafafa'); 
 			$("#nets").css("color",'#000000')
 			typeItem = 'doctor';
 		}
 		if(findtype==7){
 			$("#shopping").css("color",'#ffffff'); 
 			$("#shopping").css("background-color",'#ff2525'); 
 			$("#music").css("background-color",'#fafafa'); 
 			$("#music").css("color",'#000000'); 
 			$("#picture").css("background-color",'#fafafa'); 
 			$("#picture").css("color",'#000000'); 
 			$("#video").css("background-color",'#fafafa'); 
 			$("#video").css("color",'#000000'); 
 			$("#map").css("background-color",'#fafafa'); 
 			$("#map").css("color",'#000000'); 
 			$("#news").css("background-color",'#fafafa'); 
 			$("#news").css("color",'#000000'); 
 			$("#webpage").css("background-color",'#fafafa'); 
 			$("#webpage").css("color",'#000000'); 
 			$("#known").css("background-color",'#fafafa'); 
 			$("#known").css("color",'#000000'); 
 			$("#nets").css("background-color",'#fafafa'); 
 			$("#nets").css("color",'#000000')
 		}
 		if(findtype==8){
 			$("#known").css("color",'#ffffff'); 
 			$("#known").css("background-color",'#ff2525'); 
 			$("#music").css("background-color",'#fafafa'); 
 			$("#music").css("color",'#000000'); 
 			$("#picture").css("background-color",'#fafafa'); 
 			$("#picture").css("color",'#000000'); 
 			$("#video").css("background-color",'#fafafa'); 
 			$("#video").css("color",'#000000'); 
 			$("#map").css("background-color",'#fafafa'); 
 			$("#map").css("color",'#000000'); 
 			$("#news").css("background-color",'#fafafa'); 
 			$("#news").css("color",'#000000'); 
 			$("#webpage").css("background-color",'#fafafa'); 
 			$("#webpage").css("color",'#000000'); 
 			$("#shopping").css("background-color",'#fafafa'); 
 			$("#shopping").css("color",'#000000'); 
 			$("#nets").css("background-color",'#fafafa'); 
 			$("#nets").css("color",'#000000')
 			
 		}
 	}
 	
	function enter(){
		$("input[name=spinput]").keypress(function(e){
 	        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
 	        if (eCode == 13){
 	        	searchcontent(1);
 	        }
		})
	}
 	function searchcontent(stype,word){
 		var searchtype;
 		if(word==undefined){
 			searchtype = 'direct';
 		}else{
 			searchtype = 'extend';
 		}
 		if(stype ==1){ 
	 		var spinput = $("#spinput").val();
	 		if(typeItem=='nets'){
	 			Avatar.push(['track', ['search', 'result', '', {key:spinput, type:searchtype, module:'nets', engine:'360',input:word}, 0]]);
	 			window.open("https://www.so.com/s?src=lm&ls=sm2180732&lm_extend=ctype:31&q="+spinput);
	 		}
	 		if(typeItem=='news'){
	 			Avatar.push(['track', ['search', 'result', '', {key:spinput, type:searchtype, module:'news', engine:'360',input:word}, 0]]);
	 			window.open("http://news.so.com/ns?src=xxx&q="+spinput);
	 		}
	 		if(typeItem=='video'){
	 			Avatar.push(['track', ['search', 'result', '', {key:spinput, type:searchtype, module:'vedio', engine:'360',input:word}, 0]]);
	 			window.open("https://video.so.com/v?q="+spinput+"&src=xxx");
	 		}
	 		
	 		if(typeItem=='picture'){
	 			Avatar.push(['track', ['search', 'result', '', {key:spinput, type:searchtype, module:'pic', engine:'360',input:word}, 0]]);
	 			window.open("https://image.so.com/i?q="+spinput+"&src=xxx");
	 		}
	 		
	 		if(typeItem=='map'){
	 			Avatar.push(['track', ['search', 'result', '', {key:spinput, type:searchtype, module:'map', engine:'360',input:word}, 0]]);
	 			window.open("https://ditu.so.com/?k="+spinput+"&src=xxx");
	 		}
	 		if(typeItem=='question'){
	 			Avatar.push(['track', ['search', 'result', '', {key:spinput, type:searchtype, module:'qa', engine:'360',input:word}, 0]]);
	 			window.open("http://wenda.so.com/search/?q="+spinput+"&src=xxx");
	 		}
	 		if(typeItem=='doctor'){
	 			Avatar.push(['track', ['search', 'result', '', {key:spinput, type:searchtype, module:'doc', engine:'360',input:word}, 0]]);
	 			window.open("http://ly.so.com/s?src=xxx&q="+spinput);
	 		}
 		}
 		var hot_spots = "";
 		if(stype ==2){
 			hot_spots = $("#hot_spots1").html();
 			Avatar.push(['track', ['search', 'result', '', {key:hot_spots, type:'hot', module:'news', engine:'360',input:word}, 0]]);
 			window.open("https://www.so.com/s?src=lm&ls=sm2144528&lm_extend=ctype:31&q="+hot_spots);
 		}
		if(stype ==3){
			hot_spots = $("#hot_spots2").html();
 			Avatar.push(['track', ['search', 'result', '', {key:hot_spots, type:'hot', module:'news', engine:'360',input:word}, 0]]);
 			window.open("https://www.so.com/s?src=lm&ls=sm2144528&lm_extend=ctype:31&q="+hot_spots);		
		}
		if(stype ==4){
			hot_spots = $("#hot_spots3").html();
 			Avatar.push(['track', ['search', 'result', '', {key:hot_spots, type:'hot', module:'news', engine:'360',input:word}, 0]]);
 			window.open("https://www.so.com/s?src=lm&ls=sm2144528&lm_extend=ctype:31&q="+hot_spots);	
		}
 	}

 	
 	function AddFavorite(sURL, sTitle){
 		Avatar.push(['track', ['click', 'collect', '', 0]]);
 	    try {
 	        window.external.addFavorite(sURL, sTitle);
 	    }
 	    catch (e) {
 	        try{
 	            window.sidebar.addPanel(sTitle, sURL, "");
 	        }
 	        catch (e) {
 	            alert("加入收藏失败，请使用Ctrl+D进行添加");
 	        }
 	    }
 	}
 	//设为首页 < a onclick="SetHome(this,window.location)" > 设为首页 < /a>
 	function SetHome(obj,vrl){
 		Avatar.push(['track', ['click', 'setmain', '', 0]]);
 	        try{
 	                obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
 	        }
 	        catch(e){
 	                if(window.netscape) {
 	                        try {
 	                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
 	                        }
 	                        catch (e) {
 	                                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
 	                        }
 	                        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
 	                        prefs.setCharPref('browser.startup.homepage',vrl);
 	                 }
 	        }
 	}
 	
 	var sWeek = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
	var dNow = new Date();
	var CalendarData=new Array(100);var madd=new Array(12);var tgString="甲乙丙丁戊己庚辛壬癸";var dzString="子丑寅卯辰巳午未申酉戌亥";var numString="一二三四五六七八九十";var monString="正二三四五六七八九十冬腊";var weekString="日一二三四五六";var sx="鼠牛虎兔龙蛇马羊猴鸡狗猪";var cYear,cMonth,cDay,TheDate;
	CalendarData = new Array(               0xA4B,0x5164B,0x6A5,0x6D4,0x415B5,0x2B6,0x957,0x2092F,0x497,0x60C96,                     0xD4A,0xEA5,0x50DA9,0x5AD,0x2B6,0x3126E, 0x92E,0x7192D,0xC95,0xD4A,                       0x61B4A,0xB55,0x56A,0x4155B, 0x25D,0x92D,0x2192B,0xA95,0x71695,0x6CA,                   0xB55,0x50AB5,0x4DA,0xA5B,0x30A57,0x52B,0x8152A,0xE95,0x6AA,0x615AA,                     0xAB5,0x4B6,0x414AE,0xA57,0x526,0x31D26,0xD95,0x70B55,0x56A,0x96D,                    0x5095D,0x4AD,0xA4D,0x41A4D,0xD25,0x81AA5, 0xB54,0xB6A,0x612DA,0x95B,
	0x49B,0x41497,0xA4B,0xA164B, 0x6A5,0x6D4,0x615B4,0xAB6,0x957,0x5092F,
	0x497,0x64B, 0x30D4A,0xEA5,0x80D65,0x5AC,0xAB6,0x5126D,0x92E,0xC96,                   0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,                   0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B, 0x60A57,0x52B,0xA93,0x40E95);
	madd[0]=0;madd[1]=31;madd[2]=59;madd[3]=90;
	madd[4]=120;madd[5]=151;madd[6]=181;madd[7]=212; 
	madd[8]=243;madd[9]=273;madd[10]=304;madd[11]=334; 
	function GetBit(m,n) {  return (m>>n)&1; }
	function e2c()
	{  
	TheDate= (arguments.length!=3) ? new Date() : new Date(arguments[0],arguments[1],arguments[2]);  
	var total,m,n,k;  
	var isEnd=false;  
	var tmp=TheDate.getFullYear();  
	 total=(tmp-1921)*365+Math.floor((tmp-1921)/4)+madd[TheDate.getMonth()]+TheDate.getDate()-38;  if (TheDate.getYear()%4==0&&TheDate.getMonth()>1) { total++;}  for(m=0;;m++)  {    k=(CalendarData[m]<0xfff)?11:12;    for(n=k;n>=0;n--)    {      if(total<=29+GetBit(CalendarData[m],n))      {        isEnd=true; break;      }      total=total-29-GetBit(CalendarData[m],n);    }    if(isEnd) break;  }  cYear=1921 + m; cMonth=k-n+1; cDay=total;  if(k==12)   {    if(cMonth==Math.floor(CalendarData[m]/0x10000)+1) { cMonth=1-cMonth; }    if(cMonth>Math.floor(CalendarData[m]/0x10000)+1)  { cMonth--; }   }}
	function GetcDateString(){ var tmp="";  tmp+=tgString.charAt((cYear-4)%10); 
	tmp+=dzString.charAt((cYear-4)%12);  
	tmp+="年 "; 
	if(cMonth<1) { tmp+="(闰)"; tmp+=monString.charAt(-cMonth-1); } else {tmp+=monString.charAt(cMonth-1);}  tmp+="月";  tmp+=(cDay<11)?"初":((cDay<20)?"十":((cDay<30)?"廿":"三十")); 
	if (cDay%10!=0||cDay==10) { tmp+=numString.charAt((cDay-1)%10); }  return tmp;}
	function GetLunarDay(solarYear,solarMonth,solarDay)
	{
	 if (solarYear<1921 || solarYear>2020)  {          return ""; 
	  }        else        {          solarMonth = (parseInt(solarMonth)>0) ? (solarMonth-1) : 11;          e2c(solarYear,solarMonth,solarDay); return GetcDateString();        }}
	var D=new Date(); 
	var yy=D.getFullYear(); 
	var mm=D.getMonth()+1; 
	var dd=D.getDate(); 
	var ww=D.getDay(); 
	var ss=parseInt(D.getTime() / 1000); 
	function getFullYear(d){// 修正firefox下year错误
	yr=d.getYear();if(yr<1000)
	yr+=1900;return yr;}
	function showDate() {
		var sValue = getFullYear(dNow)+"年"+(dNow.getMonth()+1)+"月"+dNow.getDate()+"日"+" "+sWeek[dNow.getDay()]+" ";
		sValue+=GetLunarDay(yy,mm,dd);
		    document.getElementById("pDate").innerHTML = sValue;
	};
	window.onload=showDate;