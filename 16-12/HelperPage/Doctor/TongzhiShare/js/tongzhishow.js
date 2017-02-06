$(function () {
    $("body").hide();
    $.post('/api/UPersonalCenterMessageApp/PostUShareSystemNotice', { bid: $.query.get("bid") }, function (data) {
        $("#bigTitle").text(data.Title);
        $("#title").text(data.Title);
        $("#author").text(data.Author);
        $("#publishedTime").text(data.Time);
        $("#content").html(data.Content);
        $("body").show();
    });
});