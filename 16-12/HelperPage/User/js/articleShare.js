$(function () {
    $("body").hide();
    $.post('/api/UArtitleApp/PostShareArticleInfo', { aid: $.query.get("ArticleID"), "businesschannel": $.query.get("businesschannel") }, function (data) {

        if ($.query.get("businesschannel") == 2) {
            $(".down").hide();
        } else {
            $(".down").show();
        }

        window.share = {
            title: data.ShareTitle,
            desc: data.ShareContent,
            imgUrl: data.SharePic,
            link: data.ShareLink
        }

        window.share_wx_api()

        $("#bigTitle").text(data.Title);
        $("#title").text(data.Title);
        $("#author").text(data.Author);
        $("#publishedTime").text(data.Time);
        $("#content").html(data.Content);
        $("body").show();

        var attr = $('#gotoWeb').attr("data-href");
        if (attr) {
            var data = JSON.parse(attr.split('//')[1]);
            console.log(data)
            var UserID = 0;
            var info = locationObject()
            if (info) {
                if (info['UserID']) {
                    UserID = info['UserID'];
                }
            }
            $('#gotoWeb').click(function () {
                if (wechatBrowse()) {
                    var url = 'http://www.yuer24h.com/wechat2/simple/?uid=' + UserID + '&proid=' + data.TypeName + '#proshow'
                    window.open(url);

                } else {
                    window.open(attr)

                }
            })
        }


    });



    var wechatBrowse = function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            //alert('请在浏览器当中打开页面')
            return true;
        } else {
            return false;
        }
    }
    var locationObject = function () {
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



});