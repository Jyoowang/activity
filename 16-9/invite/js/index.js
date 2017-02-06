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
	   	preventClicks : false,
	   	onInit: function(swiper){
		   swiperAnimateCache(swiper);
		   swiperAnimate(swiper);
	  	},
	   	onSlideChangeEnd: function(swiper){
			swiperAnimate(swiper);
			// console.log(mySwiper)


	    },
		onTransitionEnd: function(swiper){
			swiperAnimate(swiper);
	    },
		

	  	onProgress: function(swiper){
	 
	  	}
		
	
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


	$('#save').on('click',function(){
		var name=$('input[name="name"]').val()
		var sex=$('#sex').val();

		var nation=$('input[name="nation"]').val()
		var Post=$('input[name="Post"]').val()

		var unit=$('input[name="unit"]').val()
		var phone=$('input[name="phone"]').val()


		var radio=$('input[type="radio"]:checked').val();

		var StayDate=$('input[name="StayDate"]').val()
		var outDate=$('input[name="outDate"]').val()


		var adder=$('input[name="adder"]').val()
		var ZipCode=$('input[name="ZipCode"]').val()
		var mail=$('input[name="mail"]').val()
		var Remark=$('input[name="Remark"]').val()

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
			Remark:Remark
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