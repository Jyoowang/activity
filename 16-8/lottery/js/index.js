var uid=0;
var isapp=0;
var tid=0;
 
 var urlData = locationObject();
 console.log(urlData);

 if(urlData){
 	if(urlData['uid']){
 		uid = urlData['uid']
 	} 	
 	if(urlData['isApp']){
 		isapp = 1;
 	}
 	if(urlData['tid']){
 		tid = urlData['tid'];
 	}
 }




$(document).ready(function(){



	$('.go-btn').click(clickfunc)

	var btn= $('.current-rotate')

	getData()


	$('.result-box').click(function(){
		$('.result-box').hide()
		$('.success-result').hide()
		$('.failure-result').hide()
	})

	function getData(){
		var data={
			UserID:uid,
			TID:tid
		}

		$('.loadbox').show()

		$.ajax({
			url:"http://www.yuer24h.com/app/Mall_HomeApi/GetIntegralTurntable",
			type: "POST",
		    dataType: "jsonp",
		    data:data,
		    success:function(value){
	    		$('.loadbox').hide()
    			$('.title-currency span').html(value.UserPoint);
		    	if(value.ResultCode>0){
					pushShow(value);
					pushOptionHTML(value)
		    	}else{
		    		$('.go-btn').off('click')
					alert(value.ResultMessage)
		    	}
		    },
		    error:function(){

		    }

		})
	}

	function pushShow(value){
		$('.title-currency span').html(value.UserPoint);
		$('.turntable-box >p').html('('+ value.Turntable.DrawPrice +'育儿币/次)' );

		$('.rule-text').html(value.Turntable.LotteryRule);



		if(value.UserPrizeList && value.UserPrizeList.length){
			var str='';

			$.each(value.UserPrizeList,function(){
				str+='<span>'+ this.UserName + '抽中了' + this.PrizeName + '</span>'
			})

			$('.userlist p').html(str)

			var ulWidth=0;
 			$('.userlist p span').each(function(){
 				ulWidth+=$(this).width();
 			})
 			var ds=$('.userlist p').html()
 			$('.userlist p').html(ds+ds)
			$('.userlist p').width(ulWidth*2);

			var time,left=0,s=30,windowWidth=$(window).width();
			time=setInterval(function(){
				if(left==(ulWidth)){
					left=0;
				}
				$('.userlist p').css('left', -left);
				left++;
			},s)

		}

	}

	function pushOptionHTML(value){
		var str=''
		if(value.PrizeList && value.PrizeList.length){
			$.each(value.PrizeList,function(index){
				str+='<div class="option-block option-0'+ (index +1) +'">'
				str+='<img src="'+ value.PicDomain + this.PrizeIcon +'" alt="">'
				str+='<p>'+ this.PrizeName +'</p>'
				str+='</div>'
			})
		}else{

		}

		$('.pro-img').html(str)
	}

	function clickfunc() {
	

		var data={
			UserID:uid,
			TID:tid,
			IsApp:isapp
		}

		$('.loadbox').show()
		$.ajax({
			url:"http://www.yuer24h.com/app/Mall_HomeApi/GetTurntableLuckDraw",
			type: "POST",
		    dataType: "jsonp",
		    data:data,
		    success:function(value){
		    	$('.loadbox').hide()
		    	if(value.ResultCode>0){
					switch(value.Prize.Sort) {
						case 1:
							rotateFunc(1, 0, value);
							break;
						case 2:
							rotateFunc(2, 45, value);
							break;
						case 3:
							rotateFunc(3, 90, value);
							break;
						case 4:
							rotateFunc(4, 135, value);
							break;
						case 5:
							rotateFunc(5, 180, value);
							break;
						case 6:
							rotateFunc(6, 225, value);
							break;
						case 7:
							rotateFunc(7, 270, value);
							break;
						case 8:
							rotateFunc(8, 315, value);
							break;
					}
		    	}else{
					$('.result-box').show();
					$('.failure-result').show();
					$('.failure-result .result-text span').html(value.ResultMessage);


		    	}
		    },
		    error:function(){

		    }

		})




	}
		


	function rotateFunc(awards, angle, value) {
		isture = true;
		btn.stopRotate();
		btn.rotate({
			angle: 0,
			center: ["50%", "100%"],
			duration: 4000, //旋转时间
			animateTo: angle + 1440, //让它根据得出来的结果加上1440度旋转
			callback: function() {
				isture = false; // 标志为 执行完毕
				$('.result-box').show();
				$('.success-result .result-text span').html(value.PrizeMessage);
				$('.title-currency span').html(value.UserPoint);
				switch(value.Prize.Type){
					case 	0: //为中奖
						$('.failure-result').show()
					break;
					case 	1: //育儿币
						$('.success-result').show();
					break;
					case 	2: //代金券
						$('.success-result .result-text em').html('已加进你的账户，请在个人中心－代金券中查看');
						$('.success-result').show();
					break;
				}
			}
		});
	};

	
})




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




