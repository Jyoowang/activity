
var uid=0;
var isapp=0;
 
 var urlData = locationObject();
 console.log(urlData);

 if(urlData){
 	if(urlData['uid']){
 		uid = urlData['uid']
 	} 	
 	if(urlData['isApp']){
 		isapp = 1;
 	}
 }


$(function() {

	$('.receive').on('click',function(){
		getVouchers();
	})
		


    $('.View').click(function(){
    	isApp(function(){

		     yuer24hGoto({type:20})

    	},function(){
	    	window.location='http://www.yuer24h.com/wechat2/simple/?uid='+ uid  +'#vouchers'
    	})
    })

    $('.yes').click(function(){
    	$('.Popups-box').hide();
    })    


    $('.more-case').click(function(){
    	isApp(function(){
		     yuer24hGoto({type:13,typeName:1,title:'方案详情'})
    	},function(){
    		window.location="http://www.yuer24h.com/wechat2/simple/?uid=" + uid + "&solId=1&isLink=1#solutiondetail"
    	})
    })
		

    $('.doc-list a').click(function(){
		var docid=$(this).attr('data-id');
    	isApp(function(){
		     yuer24hGoto({type:3,typeName:docid})
    	},function(){
    		window.location= 'http://www.yuer24h.com/wechat2/simple/?uid='+ uid +'&did='+ docid +'#docdetail'
    	})
	})

	$('.pro-list a').click(function(){
		var proid=$(this).attr('data-id');
		var _this=$(this);
    	isApp(function(){
		     yuer24hGoto({type:11,typeName:proid})
    	},function(){
    		window.location= 'http://www.yuer24h.com/wechat2/simple/?uid='+ uid +'&proid='+ proid +'#proshow'
    	})
	})

	$('.news-list a').click(function(){
		var newid=$(this).attr('data-id');
		var _this=$(this);
    	isApp(function(){
		     yuer24hGoto({type:2,typeName:newid})
    	},function(){
    		window.location= 'http://www.yuer24h.com/HelperPage/User/ArticleShare/newsshow.html?ArticleID='+ newid +'&UserID='+ uid +'&businesschannel=1'
			
    	})

	})

});
  
function yuer24hGoto(option){
	var urls
	switch(option.type){

		case 20: //
			urls = '{"Type": '+ option.type +'}'
		break;
		case 15: //解决方案列表
		case 11: //产品详情
		case 2: //新闻详情
		case 3: //医生详情
			urls = '{"Type": '+ option.type +',"TypeName":"'+ option.typeName +'"}'
		break;
		case 13:
            urls = '{"Type": "' + option.type + '","TypeName":"'+ option.typeName +'","ShortSummary":"'+ option.title +'"}'

		break;
			
		// case 70: //相关课程列表
		// 	urls = '{"Type": '+ option.type +',"TypeName": "'+ option.typeName +'","ShortSummary":"'+ option.title +'"}'
		// break;
	}
	window.location.href="yuer24hGoto://" + encodeURIComponent(urls)
}

function isApp(fun1,fun2){
	if(isapp){
		if(fun1){
			fun1();
		}
	}else{
		if(fun2){
			fun2();
		}
	}
}  

function getVouchers(){

	var data={
		UserID:uid,
		IsApp:isapp,
		QRCodeValue:-126
	}

	$.ajax({
		url:"http://www.yuer24h.com/Mall_HomeApi/GetSendCashCoupon",
		type: "POST",
	    dataType: "jsonp",
	    data:data,
	    success:function(value){
	    	if(value.ResultCode>1){
	    		$('.Popups-box').removeClass('hide');
	    		$('.new-popups').removeClass('hide');
	    	}else{
	    		if(value.ResultCode==-10){
		    		$('.Popups-box').removeClass('hide');
		    		$('.erwei-popups').removeClass('hide');
		    		$('.erwei-popups img').attr('src', value.PicDomain + value.QRCodeUrl)
	    		}else{
		    		$('.new-popups p').html(value.ResultMessage);
		    		$('.Popups-box').removeClass('hide');
		    		$('.new-popups').removeClass('hide');
	    		}
	    	}
	    },
	    error:function(){

	    }

	})
 }

function locationObject(){
    if (window.location.search) {
        var tt = String(window.location.search).replace('?', '')
        var arr = tt.split('&')
        var retu = {}
        for (var i = 0; i < arr.length; i++) {
            var newp = arr[i].split('=')
            retu[newp[0]] = newp[1]
        }
        return retu
    } else {
        return null
    }
}