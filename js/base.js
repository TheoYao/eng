$(document).ready(function() {

    var url = "http://ndac.env.tsinghua.edu.cn/app/index.php/";
    /*********** video-modal **********/

    var videoUrl = $("#cartoonVideo").attr('src');

    $("#myModal").on('hide.bs.modal', function(){
        $("#cartoonVideo").attr('src', '');
    });


    $("#myModal").on('show.bs.modal', function(){
        $("#cartoonVideo").attr('src', videoUrl);
    });

    $("#slider-with-video").on('click', function(){
        $("#modal-show-video").html("<iframe width=\"560\" height=\"315\" src=\"./videos/marvel.mp4\" scrolling=\"no\" frameborder=\"no\" allowfullscreen></iframe>")
    });

    /************ count down***********/

    var clock;
    var currentDate = new Date();
    var futureDate  = new Date();
    var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
    clock = $('.clock').FlipClock(diff, {
        clockFace: 'DailyCounter',
        countdown: false,
        autoStart: false
    });


    $(".cfr-topic-item").mouseover(function(){
        var item_list = $(".cfr-topic-item");
        var this_id = $(this).attr("id").split("-")[1];

        for(i=0; i<item_list.length; i++) {
            $(item_list[i]).css("z-index", 10-i);
            $(item_list[i]).css("margin-top", "20px");
            $(item_list[i]).css("height", "420px");
            $(item_list[i]).css("opacity", 0.8);
        }
        $(this).css("z-index", 17);
        $(this).css("margin-top", 0);
        $(this).css("height", "450px");
        $(this).css("z-index", 99);
        $(this).css("opacity", 1.0);
        //$("p").css("background-color","yellow");
    });

    //loadNews();
    function loadNews() {
        $.ajax({
            type: "GET",
            //url: url+"Inner/getNews",
            url: "json/getNews.json?time=20180507.json",
            dataType: 'json',
            success: function (data) {
                if(data.length == 0) {
                    return
                }
                var htmlStr = "";
                var maxNewsLength = 6;
                $(".info-main-area").empty();
                for(var i=0; i<data.length&&i<maxNewsLength; i++) {
                    var title = data[i].title.slice(0, 24);
                    var content = data[i].content.slice(0, 150)+"...";
                    var newsId = data[i].id;

                    htmlStr += ("<div class=\"info-item\" news_id=" + newsId + "><div class=\"info-title\">" + title + "</div>");
                    if (newsId == 11 || newsId == 10 || newsId == 2) {
                        htmlStr += ("<div class=\"image-cover\"><div class=\"info-content\"><div class=\"content-value\"><span class=\"content-cover\">"+content+" </span></div></div>");
                        htmlStr += ("<div class=\"image-locate\"><img src=\"images/info_card/info_card"+newsId+".jpg?time=20180507.jpg\"></div></div></div>");
                    }
                    else{
                        htmlStr += ("<div class=\"image-cover no-cover\"><div class=\"info-content\"><div class=\"content-value\"><span class=\"content-cover\">"+content+" </span></div></div>");
                        htmlStr += ("</div></div>");
                    }
                }
                $(".info-main-area").html(htmlStr);
            },
            complete: function () {

            },
            error: function () {
                swal('对不起，当前服务器开小差，请稍候再试', '', "error")
            }

        });
    }

    $('.info-main-area').on('click', "div.info-item", function() {
        var news_id = $(this).attr("news_id");
        window.location.href = "./news_info.html#"+news_id;
    });
});
