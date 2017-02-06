$(document).ready(function(){
    var audioPaused = true;
	var timer=null

	scaleW=window.innerWidth/320;
	scaleH=window.innerHeight/480;

	var resizes = document.querySelectorAll('.resize');
	
	for (var j=0; j<resizes.length; j++) {
		resizes[j].style.width=parseInt(resizes[j].style.width)*scaleW+'px';
		resizes[j].style.height=parseInt(resizes[j].style.height)*scaleH+'px';
		resizes[j].style.top=parseInt(resizes[j].style.top)*scaleH+'px';
		resizes[j].style.left=parseInt(resizes[j].style.left)*scaleW+'px'; 
	}
		  
	var mySwiper = new Swiper ('.swiper-container', {
	   	direction : 'vertical',
	   	pagination: '.swiper-pagination',
	  //virtualTranslate : true,
	   	mousewheelControl : true,
	   	onInit: function(swiper){
		   swiperAnimateCache(swiper);
		   swiperAnimate(swiper);
	  	},
	   	onSlideChangeEnd: function(swiper){
			swiperAnimate(swiper);
			console.log(mySwiper)

			// if(mySwiper.activeIndex==1){
	  //         timer=setTimeout( function(){
	  //               $('.terminal').typewriting( "尊敬的各位同道：<br />   <span></span>经全国继续医学教育委员会批准，我们诚挚的邀请您参加由苏州大学附属儿童医院承办的2016年国家级继续教育项目“2016姑苏儿科论坛暨儿童呼吸及过敏性疾病诊治进展学习班”。<br />  <span></span>本次学术研讨会以专题讲座为主将邀请同内知名专家就儿童哮喘及婴幼儿哮喘的诊断与鉴别诊断、重症与难治性哮喘的管理、慢性咳嗽（包括精神性咳嗽）、过敏性鼻炎、皮肤过敏、食物过敏、免疫治疗等方面的最新进展进行研讨，并对相关检测技术如儿童肺功能、过敏检测、适应症及最新咳嗽、喘鸣音监测介绍。参会人员包括各省市哮喘防治、呼吸领域的专家以及各级医疗人员。<br />      <span></span>相信本次学术论坛一定会使各位在学术与临床上获得进一步的经验知识，我们热切期待与各位相约姑苏，共享学术盛宴！<p>苏州大学附属儿童医院</p>", {
	  //                   "typing_interval": 100,
	  //                   "blink_interval": "1s",
	  //                   "cursor_color": "#fff"
	  //               }, function() {
	  //                   console.log( "END" );
	  //               });
	               
	  //           }, 100);
   //    		}else{
   //    			clearTimeout(timer)
   //    		}
  
	    },
		onTransitionEnd: function(swiper){
			swiperAnimate(swiper);
	    },
		
		watchSlidesProgress: true,

	  	onProgress: function(swiper){
	        for (var i = 0; i < swiper.slides.length; i++){
	          var slide = swiper.slides[i];
	          var progress = slide.progress;
	          var translate = progress*swiper.height/4;  
			  scale = 1 - Math.min(Math.abs(progress * 0.5), 1);
	          var opacity = 1 - Math.min(Math.abs(progress/2),0.5);
	          slide.style.opacity = opacity;
			  es = slide.style;
			  es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,'+translate+'px,-'+translate+'px) scaleY(' + scale + ')';

	        }
	  	},
		
	   	onSetTransition: function(swiper, speed) {
	        for (var i = 0; i < swiper.slides.length; i++){
	          es = swiper.slides[i].style;
			  es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';

	        }
	  	},
	
	
	
	})
 $(".globalAudio").bind("click",function(){
        var media = $(this).find("audio")[0];
        if(media.paused){
            media.play();
            audioPaused = true;
            $(this).addClass("play");
        }else{
            media.pause();
            audioPaused = false;
            $(this).removeClass("play");
        }
    });
	$(".pay_list_c1").on("click",function(){
	  $(this).addClass("on").siblings().removeClass("on");
	   $(this).siblings().find('input[type="radio"]').removeAttr('checked')
	  $(this).find('input[type="radio"]').attr('checked','checked')
	})


	$('#StayDate').change(function(){
		console.log($(this).val())
		$('input[name="StayDate"]').val($(this).val())
	})

	$('#outDate').change(function(){
		console.log($(this).val())
		$('input[name="outDate"]').val($(this).val())
	})


	$('#save').click(function(){

		var name=$('input[name="name"]').val()
		var sex=$('#sex').val();

		var nation=$('input[name="nation"]').val()
		var Post=$('input[name="Post"]').val()

		var unit=$('input[name="unit"]').val()
		var phone=$('input[name="phone"]').val()


		var radio=$('input[type="radio"]:checked').val()

		var StayDate=$('input[name="StayDate"]').val()
		var outDate=$('input[name="outDate"]').val()

		var adder=$('input[name="adder"]').val()
		var ZipCode=$('input[name="ZipCode"]').val()
		var mail=$('input[name="mail"]').val()
		var Remark=$('input[name="Remark"]').val()

		console.log()
		if(!name && name==""){
			alert("请输入您的姓名！")
			return;
		}
		if(!nation && nation==""){
			alert("请输入民族！")
			return;
		}
		if(!Post && Post==""){
			alert("请输入职务！")
			return;
		}
		if(!unit && unit==""){
			alert("请输入单位！")
			return;
		}

		if(!phone && phone==""){
			alert("请输入联系电话！")
			return;
		}


		if(StayDate!=""){
			StayDate = new Date(StayDate.replace(/-/, "/")) /1000
		}else{
			alert("请选择入住日期！")
			return;
		}

		var outDate=$('input[name="outDate"').val()
		if(outDate!=""){
			outDate = new Date(outDate.replace(/-/, "/")) /1000
		}else{
			alert("请选择退房日期！")
			return;
		}

		if(StayDate>outDate){
			alert("请选择正确日期！")
			return;
		}


		if(!mail && mail==""){
			alert("请输入E-Mail！")
			return;
		}



		var data={
			Name:name,
			Sex:sex,
			Nation:nation,
			Title:Post,
			Company:unit,
			Phone:phone,
			Accommodation:radio,
			CheckInDate:StayDate,
			CheckInOut:outDate,
			Address:adder,
			ZipCode:ZipCode,
			EMail:mail,
			Remark:Remark,
			BusinessChannel:1
		}

        $.ajax({
            url: 'http://www.yuer24h.com/app/Hotel/HotelSignUp',
            type: "POST",
            dataType: "json",
            data: data,
            success: function(value) {
            	alert('报名成功！')
            	console.log(value)
            }
        });




	})



	
})