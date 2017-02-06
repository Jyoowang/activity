
	var TrackApiUrl="https://www.yuer24h.com/webapi/API/Track/TrackReceive.ashx";
	$(document).ready( function(){
		SendPageViewTrack("nanke_20170112","nanke_20170112","");
	} );


	function sendTrack(userid,trackelement,trackevent,tracktype,trackcode,trackvalue,params,appid) {
		try {
			if(!userid || userid==null || userid=='null')userid=0;
			if(!appid) {
				appid=3;
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
	function SendPageViewTrack(pageid,trackcode,trackvalue)
	{
		var newJson =null;
		try
		{
			sendTrack(0,pageid,"view","page",trackcode,trackvalue);//跟踪代码
		}catch(ex){
			var a= ex;
		}
	}
