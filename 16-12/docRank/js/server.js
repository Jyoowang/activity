
var uid=0;
var isapp=0;
 
 var urlData = locationObject();
 console.log(urlData);

 if(urlData){
 	if(urlData['uid']){
 		uid = urlData['uid']
 	} 	
 	if(urlData['isApp']){
 		isapp = urlData['isApp']
 	} 	
 }


$(function() {

    if(Util.wechatBrowse()){
           
    }else{
        yuer24hshare();
    }

	$('.voucher').on('click',function(){
		getVouchers();
	})
		

    $('.yes').click(function(){
    	$('.Popups-box').hide();
    })    
		

    $('.btn-box').click(function(){
		var docid=$(this).attr('data-id');
		console.log(docid);
    	isApp(function(){
		     yuer24hGoto({type:3,typeName:docid})
    	},function(){
    		window.location= 'http://www.yuer24h.com/wechat2/simple/?uid='+ uid +'&did='+ docid +'#docdetail'
    	})
	})

	

});

function yuer24hshare(){
    var urls = '{"title": "数十万妈妈口碑甄选，三甲儿科、产科育儿好医生，一个电话帮你解决育儿难题","imgUrl":"http://www.yuer24h.com/docRank/images/LOGO.png?v161230","link":"http://api.yuer24h.com/Share/GetCode?target=9_docrank%2findex.html%3fuid%3d%7b0%7d","desc":"育儿24小时·妈妈最爱好医生年度榜"}'

    window.location.href = "yuer24hshare://" + encodeURIComponent(urls)
}

  
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
		CouponID:421
	}

	$.ajax({
		url:"http://www.yuer24h.com/Mall_HomeApi/GetSendCashCouponNew",
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
		    		// $('.erwei-popups').removeClass('hide');
		    		// $('.erwei-popups img').attr('src', value.PicDomain + value.QRCodeUrl)
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