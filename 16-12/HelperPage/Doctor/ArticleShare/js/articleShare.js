$(function () {
    $("body").hide();
    var id = { ArticleID: $.query.get("ArticleID") }
    $.post('/api/DFiveInformationApp/PostArticleDetails', id, function (data) {
        window.share = {
            title: data.ShareTitle,
            desc: data.ShareContent,
            imgUrl: data.SharePic,
            link: data.ShareLink
        }

        window.share_wx_api();


        $("#bigTitle").text(data.Title);
        $("#title").text(data.Title);
        $("#author").text(data.Author);
        $("#publishedTime").text(data.Time);
        $("#content").html(data.Content);
        $("body").show();
    });
});