$(document).ready(function() {
    $('.sign-area').on('click', "div#sign-out", function() {
        $.cookie('cookie_info', '', { expires: -1 });
        window.location.href = "index_en.html?time=1526202842.html"
    });

    //if($.cookie('cookie_info') != undefined && $.cookie('cookie_info') != "" && $.cookie('cookie_info') != null) {
    if($.cookie('cookie_info')){
        var respJson = JSON.parse($.cookie('cookie_info'));
        if (!("username" in respJson) || !("identity" in respJson)) {
            $.cookie('cookie_info', '', { expires: -1 });
            window.location.href = "login_en.html?time=1526202842.html"
        }
        var username = JSON.parse($.cookie('cookie_info')).username;
        if(username == "xuebin") {
            $.cookie('cookie_info', '', { expires: -1 });
            return
        }
        var identity = JSON.parse($.cookie('cookie_info')).identity;

        $(".sign-area").empty();

        $(".sign-area").html("<span id=\"sign-area-name\"><a href=\"user_center_en.html?time=1526202842.html\">"+username+"&nbsp;</a></span><div id=\"sign-out\">Sign out</div>");
    }
});