jQuery.Code = function () {
    var code = $.query.get("ValidateCode").toString();
    var l = 6 - code.length;
    var s = "";
    if (l > 0) {
        for (var i = 0; i < l; i++) {
            s += "0";
        }
        code = s + code;
    }
    $("#inCode").text(code);
    var type = code.substring(5, 6);
    if (type == 1) {
        $("#invitationText").html("推荐个医生自由执业APP，帮我们<br/>开线上诊所，快来体验吧。<br/>注册时填写邀请码可以获取100元现金奖励。").css("color", "#3ec3ba").css('padding-left', '3%');
        $("#bgLogo").attr("src", "yishenglogo.png");
        
        $("#urlP").html("<a href='http://a.app.qq.com/o/simple.jsp?pkgname=com.shopkv.yuer.yisheng' style='color:#3ec3ba;font-size:32px'>立即下载</a>");
        $("#slogan").text("打造您的妈妈粉丝团");
        $("#footer").css("margin-bottom", "0").css("margin-top", "25px");
        $("#inCode").css("color", "#3ec3ba");
    }

}

$(function () {
    $.Code();
});