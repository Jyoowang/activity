var TrackApiUrl="https://www.yuer24h.com/webapi/API/Track/TrackReceive.ashx";


$(document).ready(function(){

    Page.init();



});


var Page = {
	uid:0,
    ApiUrls:'https://www.yuer24h.com',
	pageData:null,
	init:function () {

		//获取url 参数
		this.locationObject();

        Page.sendTrack(Page.uid,'新年红包2017',"view",'page','新年红包2017');

        Page.isAppTool(function(){
            Page.yuer24hshare()
        })

		//初始化事件
        this.initEvent();



    },
	initEvent:function () {
        //抽奖
        $(".red-img").click(function(){
            $(this).addClass('shake-rotate');

            Page.sendTrack(Page.uid,'新年红包2017',"click",'领取红包','领取红包');

            Page.getLotteryData();

        });


        //已领过需要给red-page 添加 Has-broughtpage

        //2月1号真正抢完后需要给finished-box 添加 finished1



        //规则显示按钮
        $('.rule-btn').click(function(){
            Page.sendTrack(Page.uid,'新年红包2017',"click",'查看规则','查看规则');

            $('.rule-box').show();
            $('.rule-img').addClass('rule-show');
            setTimeout(function(){
                $('.decorate').addClass('decorate-show')
            },4300);
            setTimeout(function(){
                $('.rule-box .close-btn').fadeIn();
            },4500)

        });

        //关闭规则
        $('.rule-box .close-btn').click(function(){
            $('.rule-box').fadeOut(500,function(){
                $('.rule-img').removeClass('rule-show');
                $('.decorate').removeClass('decorate-show');
                $('.rule-box .close-btn').hide();
            });
        });


        // 打开分享提示
        $('.share-btn').click(function(){
            $('.share-box').show();
        });
        //关闭分享提示
        $('.share-box .close-btn').click(function(){
            $('.share-box').hide();
        });

		//到钱包
		$('.goto-wallet').click(function () {
            Page.sendTrack(Page.uid,'新年红包2017',"click",'查看钱包','查看钱包');
   

            Page.isAppTool(function(){
                Page.yuer24hGoto({type:16})
            },function(){
                if(Page.isShare){
                    $('.erwei-box p span').html('查看我的钱包')
                    $('.erwei-box').show();
                }else{
                    Page.goToUrl({
                        'h5Url':'https://www.yuer24h.com/wechat/view/wallet.html?uid=' + Page.uid
                    })
                }
            })

        });
        //到代金券
        $('.goto-voucher').click(function () {
            Page.sendTrack(Page.uid,'新年红包2017',"click",'查看代金券','查看代金券');

            Page.isAppTool(function(){
                Page.yuer24hGoto({type:20})
            },function(){
                if(Page.isShare){
                    $('.erwei-box p span').html('查看我的代金券')
                    $('.erwei-box').show();
                }else{
                    Page.goToUrl({
                        'h5Url':'https://www.yuer24h.com/wechat/view/vouchers.html?uid=' + Page.uid
                    })
                }
            })


        });
        //打开二维码提示（代金券）

        //关闭二维码提示
        $('.erwei-box .close-btn').click(function(){
            $('.erwei-box').hide();
        });


        //到新年商城活动
        $('.goto-new').click(function () {
            Page.sendTrack(Page.uid,'新年红包2017',"click",'到新年活动','到新年活动');

            var url = 'http://www.yuer24h.com/ActivityPage/purchase2/index.html';

            Page.goToUrl({
                appUrl:{type:1,typeName:url,title:'年货购'},
                h5Url:decodeURIComponent(url)
            });
        });




        // shareSuccess()
    },
	//抽奖
	getLotteryData:function () {
        $.ajax({
            url: Page.ApiUrls + '/Mall_HomeApi/GetReceiveRedPacket' ,
            type: "POST",
            dataType: "jsonp",
            data: {
                UserID: Page.uid
			},
            success: function(response) {
            	setTimeout(function () {
                    $(".red-img").removeClass('shake-rotate');

                    //TOTO 整体接口返回判断
                    if(response.ResultCode>0){

                        Page.dealWithResult(response)


                    }else{
                        // ResultMessage
                        if(response.ResultCode){

                            alert(response.ResultMessage);
                            // alert(data.message);
                        }else{
                            alert('系统错误！');

                        }
                    }

                },1000);

            },
            error:function(xhr, status, err){
                if (err) {
                    console.log(err.toString());
                };
                //弹出系统异常
            }
        });
    },
	//处理抽奖结果
    dealWithResult:function (value) {
		console.log(value);

		switch(value.ResultCode){
			case 1:

				$('.money-sum span').html(value.Value);

                $('.red-page').fadeIn(1000,function () {
                    $('.money-sum').addClass('amountScale');
                    $('.home-page').hide();
                });
				break;
			case 2:
                $('.red-page').addClass('Has-broughtpage');
                $('.red-page').fadeIn(1000,function () {
                    $('.home-page').hide();
                });

				break;
            case 3:
                $('.finished-box').fadeIn(1000,function () {
                    $('.home-page').hide();
                });
                break;
            case 4: //活动已领完，没有其他活动了

				$('.finished-box').addClass('finished1');
                $('.finished-box').fadeIn(1000,function () {
                    $('.home-page').hide();
                });

                break;

			default:
                $('.finished-box').addClass('finished1');
                $('.finished-box').fadeIn(1000,function () {
                    $('.home-page').hide();
                });
		}

    },
    //地址传递的参数
    locationObject: function() {
        if (window.location.search) {
            var tt = String(window.location.search).replace('?', '');
            var arr = tt.split('&');
            // var retu = {};
            for (var i = 0; i < arr.length; i++) {
                var newp = arr[i].split('=');
                Page[newp[0]] = newp[1]
            }
            // return retu
        } else {
            // return null
        }
    },
    isAppTool : function(fun1,fun2){
        if(Page.isApp){
            //app 跳转
            if(fun1){
                fun1()
            }
        }else{
            if(fun2){
                fun2()
            }
        }
    },
    //页面跳转
    goToUrl:function(UrlVale){
        Page.isAppTool(function(){
			Page.yuer24hGoto(UrlVale.appUrl)
        },function(){
			window.location='' + UrlVale.h5Url
        })
    },
    yuer24hGoto : function(option){
        var urls;
        switch(parseInt(option.type)){
            case 1: //跳转url网页
                urls = '{"Type": "' + String(option.type) + '","TypeName": "' + String(option.typeName) + '","ShortSummary":"'+ String(option.title) +'"}'
                break;
            case 12: //不跳转
                break;
            case 16: //育儿钱包
            case 20: //代金券
                urls = '{"Type": "' + String(option.type) + '"}';
                break;
            default:
                urls = '{"Type": "' + String(option.type) + '","TypeName": "' + String(option.typeName) + '"}'
        }
        window.location.href="yuer24hGoto://" + encodeURIComponent(urls)
    },
    yuer24hshare :function (){
        var urls = '{"title": "开工大吉，红包请收下~","imgUrl":"http://www.yuer24h.com/ActivityPage/newyear2017/images/200X200.png","link":"http://api.yuer24h.com/app/Share/GetCode?target=9_518*https%3a%2f%2fwww.yuer24h.com%2fActivityPage%2fnewyear2017%2findex.html%3fuid%3d%7b0%7d","desc":"老板发了开工红包吔，撸起袖子拼命抢！！抢完集中精力干工作，手慢无。"}'

        window.location.href = "yuer24hshare://" + encodeURIComponent(urls)
    },
    //判断是否为微信
    wechatBrowse: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            //alert('请在浏览器当中打开页面')
            return true;
        } else {
            return false;
        }
    },
    //判断设备
    iosBrowse: function() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs) {
            return 'ios';
        } else if (bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return 'android';
        } else {
            return 'cao'
        }
    },

    sendTrack : function (userid,trackelement,trackevent,tracktype,trackcode,trackvalue,params,appid) {
        try {
            if(!userid || userid==null || userid=='null')userid=0;
            if(!appid) {
                appid=3;
                if(Page.isApp)
                {
                    var bro = Page.iosBrowse();
                    console.log(bro);
                    if(bro && bro=="ios")
                    {
                        appid=2;
                    }
                    else if(bro && bro=="android")
                    {
                        appid=1;
                    }
                }
                else
                {
                    var iswx = Page.wechatBrowse();
                    if(iswx)
                    {
                        appid =3;
                    }
                    else
                    {
                        appid =5;
                    }

                }
            }

            if(!params)params={};
            if(!trackvalue||trackvalue==null)trackvalue="";
            var senddata={
                method:"QuickSoft.AppService.TrackService.TrackReceive",
                userid:userid,
                usertype:1,
                trackelement:trackelement,//填写PageID页面编号
                trackevent:trackevent,//add,click,view等，表示是点击，还是打开页面等
                tracktype:tracktype,//app,button,a,page等,触发元素的类型
                trackcode:trackcode,//跟踪编码，判断是哪种跟踪
                trackvalue:trackvalue,//当前页面的主键，如：商品详情，就是商品的ID，课程详情，就是课程编号
                params:JSON.stringify(params),//其他扩展参数，key：value，如：课程详情中点击产品广告，保存产品的编号进扩展参数
                pageurl:window.location.href,
                appid:appid,//来源：1,安卓,2.IOS，3.微信,4 后台,5其他浏览器
                sign:"",
                timestamp:""
            }

            $.ajax({
                url: TrackApiUrl,
                type: "post",
                dataType: "text",
                async:false,
                data: senddata,
                success: function (response) {

                }
            });
        }catch(e){
            console.log("error",e);

        }

       }


};





//分享成功
function getShareDate() {
    $.ajax({
        url: Page.ApiUrls + '/Mall_HomeApi/GetShareRedPacket' ,
        type: "POST",
        dataType: "jsonp",
        data: {
            UserID: Page.uid
        },
        success: function(response) {
            Page.sendTrack(Page.uid,'新年红包2017',"message",'分享成功','分享成功');
            //TOTO 整体接口返回判断

            if(response.ResultCode>0){
            	if(response.ResultCode==1){


                    $('.home-page,.red-page,.finished-box,.share-box').hide();

                    $('.voucher-info span em').html( response.Value );
                    $('.voucher-info p').html( response.Name + ',已放入您的账户.');

                    $('.share-page').show();
				}

            }else{
                // ResultMessage
                if(Math.abs(response.ResultCode)){
                	if(response.ResultCode!=-2 && response.ResultCode!=-1){
                        alert(response.ResultMessage);
					}
                    // alert(data.message);
                }else{
                    alert('系统错误！');
                }
            }
        },
        error:function(xhr, status, err){
            if (err) {
                console.log(err.toString());
            };
            //弹出系统异常
        }
    });
}




