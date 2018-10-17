$(document).ready(function() {
    var url = "http://ndac.env.tsinghua.edu.cn/app/index.php/";
    var username = '';
    var identity = '';
    if($.cookie('cookie_info')){
        username =JSON.parse($.cookie('cookie_info')).username;
        identity =JSON.parse($.cookie('cookie_info')).identity;

    }else {
        window.location.href = "login_en.html#signin";
    }
    //出生日期
    $('.form_datetime').datetimepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        minView: 2,
        pickerPosition: "bottom-left"
    });
/*
    var schoolData =[
        '清华大学','北京大学', '北京工业大学', '北京航空航天大学',
        '北京化工大学', '北京交通大学', '北京科技大学', '北京理工大学', '北京林业大学', '北京师范大学', '成都理工大学',
        '大连大学', '大连工业大学', '大连海事大学', '大连交通大学', '大连理工大学', '大连理工大学盘锦校区',
        '电子科技大学', '东北大学', '东北大学秦皇岛分校', '东北林业大学', '东北农业大学', '东北师范大学', '东华大学', '东南大学',
        '福州大学', '复旦大学', '广西大学', '广西师范大学', '广州大学', '贵州大学', '桂林理工大学', '哈尔滨工程大学',
        '哈尔滨工业大学', '哈尔滨工业大学(威海)', '海南大学', '合肥工业大学', '河北工业大学',
        '河北科技大学', '河海大学', '河南大学', '湖南大学', '湖南师范大学', '华北电力大学(保定)', '华北电力大学(北京)',
        '华东理工大学', '华东师范大学', '华南理工大学', '华南师范大学', '华中科技大学', '华中农业大学', '华中师范大学',
        '吉林大学', '暨南大学', '江南大学',
        '江苏大学', '解放军防化学院', '昆明理工大学', '兰州大学',
        '兰州交通大学', '辽宁大学', '辽宁工程技术大学', '辽宁石油化工大学', '南昌大学',
        '南京大学', '南京工业大学', '南京理工大学', '南京林业大学', '南京农业大学', '南京师范大学',
        '南开大学', '内蒙古大学', '内蒙古科技大学',
        '宁夏大学', '青岛大学', '青海大学', '厦门大学', '山东大学', '山东大学威海分校',
        '山西大学', '陕西师范大学', '上海大学', '上海交通大学', '上海理工大学', '沈阳大学',
        '沈阳化工大学', '沈阳建筑大学', '沈阳理工大学', '沈阳农业大学', '石河子大学', '四川大学', '四川农业大学',
        '苏州大学', '苏州科技学院', '太原理工大学', '天津城市建设学院',
        '天津大学', '天津工业大学', '同济大学', '武汉大学', '武汉纺织大学', '武汉工程大学', '武汉理工大学',
        '西安建筑科技大学', '西安交通大学', '西北大学', '西北工业大学', '西北农林科技大学', '西藏大学', '西南大学',
        '西南交通大学', '新疆大学', '延边大学', '云南大学', '长安大学', '长江大学',
        '浙江大学', '浙江工商大学', '浙江工业大学', '郑州大学', '中国地质大学(北京)', '中国地质大学(武汉)',
        '中国海洋大学', '中国环境科学研究院', '中国科学技术大学', '中国科学院成都山地灾害与环境研究所',
        '中国科学院城市环境研究所', '中国科学院大气物理研究所', '中国科学院地理科学与资源研究所', '中国科学院地球化学研究所',
        '中国科学院地球化学研究所', '中国科学院东北地理与农业生态研究所',
        '中国科学院广州地球化学研究所', '中国科学院广州能源研究所', '中国科学院海洋研究所',
        '中国科学院南海海洋研究所', '中国科学院南京地理与湖泊研究所',
        '中国科学院南京土壤研究所', '中国科学院上海高等研究院', '中国科学院沈阳应用生态研究所',
        '中国科学院生态环境研究中心', '中国科学院水生生物研究所',
        '中国科学院西北高原生物研究所', '中国科学院西北生态环境资源研究院',
        '中国科学院新疆生态与地理研究所', '中国矿业大学', '中国矿业大学(北京)', '中国农业大学',
        '中国农业科学院', '中国人民大学',
        '中国石油大学(北京)', '中国石油大学(华东)', '中国药科大学',
        '中南财经政法大学', '中南大学', '中山大学', '中央财经大学', '中央民族大学', '重庆大学', '重庆工商大学',
        '中国林业研究院', '中国林业科学院', '中国科学院大学'

    ];
    initData(schoolData);
    function initData(data) {
        var str='';
        for(var i=0;i<data.length;i++){
            // str+='<option  selected="selected">'+data[0]+'</option>';
            str+='<option>'+data[i]+'</option>';

        }
        $('#personal_info_input_school').html(str);

    };
*/
    fillPersonInfo();
    function fillPersonInfo() {
        $.ajax({
            type: "GET",
            url: url+"Form/getUserInfo",
            data: {
                username: username
            },
            dataType: 'json',
            success: function (data) {
                $('.selectpicker').selectpicker('refresh');
                if (data.status == 1) {
                    var curData = data.data;
                    $("#personal_info_input_username").attr("value", curData["username"]);
                    $("#personal_info_input_mail").attr("value", curData["email"]);
                    $("#personal_info_input_name").attr("value", curData["stuName"]);
                    if (curData["sex"] == "Ma") {
                        $("button[data-id='personal_info_input_sex']").attr("title", "Male");
                        $("button[data-id='personal_info_input_sex'] .filter-option").text("Male")
                    }
                    else if (curData["sex"] == "Fe"){
                        $("button[data-id='personal_info_input_sex']").attr("title", "Female");
                        $("button[data-id='personal_info_input_sex'] .filter-option").text("Female")
                    }
                    else {
                        $("button[data-id='personal_info_input_sex']").attr("title", "");
                        $("button[data-id='personal_info_input_sex'] .filter-option").text("")
                    }

                    $("#personal_info_input_birth").attr("value", curData["birthDate"]);
                    $("#personal_info_input_school").attr("value", curData["school"]);
                    $("#personal_info_input_docno").attr("value", curData["docName"]);
                    $("#personal_info_input_addr").attr("value", curData["address"]);


                    /*填充tips*/
                    $("#school_name").text(curData["school"]);
                    $("#person_name").text(curData["stuName"]);
                    if (curData["school"] == "" || curData["stuName"] == "") {
                        $(".welcome-tips-item").remove();
                    };

                } else {
                    swal(data.info);
                    return false;
                }

            },
            complete: function () {

            },
            error: function () {
                swal('Sorry, Please retry later', '', "error")
            }
        });
    }

    var isAbstractAc = false;
    contribution(username);
    function contribution(username) {
        //请求稿件查询列表
        $.ajax({
            type: "POST",
            url:  url +"Document/show",
            data: {
                username: username,
                type: 'all'
            },
            /*type: "GET",
            url: "./json/show_product.json",
            dataType: 'json',*/
            success: function (res) {
                if(res.status==1){
                    var data = res.data;
                    var ele =$('#manu-check-table');
                    if(data.length>0) {
                        if (data[0].status==3) {
                            isAbstractAc = true;
                        }
                        renderManuList(data);
                    }
                    else{
                        IsInfoTableEmpty();
                    }
                }else {
                    console.log(res.info);
                }
            }

        });

    }
    function renderManuList(data){
        var aimStr = "";
        for (i=0; i<data.length; i++){
            var curData = data[i];
            var curTitle = curData["englishTitle"];
            var curDate = curData["create_time"].split(" ")[0];
            var curDocuId = curData["docu_id"];
            if (i%2 == 1){
                aimStr += "<div class=\"manu-item manu-item-even\" docuid="+curDocuId+"><div class=\"manu-item-title\">"+curTitle+"</div><div class=\"manu-item-date\">"+curDate+"</div></div>"
            }
            else {
                aimStr += "<div class=\"manu-item manu-item-odd\" docuid="+curDocuId+"><div class=\"manu-item-title\">"+curTitle+"</div><div class=\"manu-item-date\">"+curDate+"</div></div>"
            }
        }
        ele = $("#manu-check-table");
        ele.html(aimStr);

        return
    }

    //添加更多作者
    $('#modal-add-author').on('click', function () {
        var emailReg=/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        var addName = $.trim($('#summary_input_more_author_name').val());
        //var addPing = $.trim($('#summary_input_more_spell').val());
        var addEmail = $.trim($('#summary_input_more_email').val());
        var addCompany = $.trim($('#summary_input_more_unit').val());
        var isCommuAuthor =document.getElementById("toggle-button").checked;
        if(addName==''){
            alert('Please input name');
            return false
        }
        if(addEmail==''||!(emailReg.test(addEmail))){
            alert('Plese input email');
            return false
        }
        if(addCompany==''){
            alert('Please input address');
            return false
        }
        if(isCommuAuthor){
            addName = addName + "(Corresponding)"
        }
        $('.more-author-list').append('<span class="more-author-item" data-name='+addName+' data-email='+addEmail+' data-company='+addCompany+'>'+addName+'</span>')
        if (!$("#more-author-show").attr("value")) {
            $('#more-author-show').attr("value", addName)
        }
        else {
            $('#more-author-show').attr("value", $('#more-author-show').attr("value")+";"+addName)
        }

        clearModal();
    });
    function clearModal() {
        $('#summary_input_more_author_name').val("");
        //$('#summary_input_more_spell').val("");
        $('#summary_input_more_email').val("");
        $('#summary_input_more_unit').val("");
        document.getElementById("toggle-button").checked = false;
        $('#myModal').modal('hide');
    }

    $("#clear-more-author").on('click', function () {
        $(".more-author-list").empty();
        $('#more-author-show').attr("value", "");
    });

    $('#btn-submit-summary').on('click', function () {
        var emailReg=/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        var fileSrc = $("input[name=fileString]")[0].files[0];
        var englishTitle = $.trim($('#summary_input_egls_title').val());
        var keyEnglish = $.trim($('#summary_input_egls_kwd').val());
        var theme = $.trim($('#summary_input_topic option:selected').val());
        var authorName = $('#summary_input_author_name').val();
        var authorEmail = $.trim($('#summary_input_email').val());
        var authorCompany = $.trim($('#summary_input_unit').val());
        var remarks = $.trim($('#summary_submit_remark').val());

        var author = [{
            authorName: authorName,
            authorEmail: authorEmail,
            authorCompany: authorCompany
        }];
        var moreAuthor = $('.more-author-item');
        moreAuthor.each(function (i) {
            var item={};
            var addName=  $(this).attr('data-name');
            var addEmail=  $(this).attr('data-email');
            var addCompany=  $(this).attr('data-company');
            item.authorName =addName;
            item.authorEmail =addEmail;
            item.authorCompany =addCompany;
            author.push(item);
        });
        var fileArray = fileSrc.name.split(".");//获取上传文件的后缀
        var fileAccept = fileArray[fileArray.length - 1]
        if( fileAccept!="doc" && fileAccept!="docx" ){
            swal("Only .doc and .docx allowed！");
            return false
        }
        if(authorName==''){
            swal('Please input name');
            return false
        }
        if(authorEmail==''||!(emailReg.test(authorEmail))){
            swal('Please input email');
            return false
        }
        if(authorCompany==''){
            swal('Please input address');
            return false
        }

        swal(
            {
                title: "Conform to submit？",
                text: "Only one manuscript can be uploaded, and forbidden to modify",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Confirmation",
                closeOnConfirm: false
            }, function(){
                var data = new FormData();
                data.append('username', username);
                data.append('fileSrc', fileSrc);
                data.append('englishTitle', englishTitle);
                data.append('keyEnglish', keyEnglish);
                data.append('theme', theme);
                data.append('author', JSON.stringify(author));
                data.append('remarks', remarks);

                $.ajax({
                    type: "POST",
                    url: url +"Document/submit",
                    data: data,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.status == 1) {
                            swal("Success！", "Pleae wait to audit。", "success");
                            window.location.reload();
                        } else {
                            swal("Error", data.info, "error");
                            return false;
                        }
                    },
                    error: function () {
                        swal('Please retry later');
                    }
                })
            });
    });

    $('#btn-submit-personal-info').on('click', function () {
        var userName = $.trim($('#personal_info_input_username').val());

        var email = $.trim($('#personal_info_input_mail').val());

        var stuName = $.trim($('#personal_info_input_name').val());
        if(stuName=='') {
            swal('Please input name');
            return false
        }

        var sex = $("button[data-id='personal_info_input_sex']").attr("title");
        if(sex=='') {
            swal('Please select sex');
            return false
        }

        var birthDate = $('#personal_info_input_birth').val();

        var school = $.trim($('#personal_info_input_school').val());
        if(school=='') {
            swal('Please input school');
            return false
        }

        //var userId = $.trim($('#personal_info_input_stuno').val());

        var docName = $.trim($('#personal_info_input_docno').val());
        if(docName=='') {
            swal('Please input tutor');
            return false
        }

        //地址拼接
        var address = $.trim($('#personal_info_input_addr').val());
        if(address=='') {
            swal('Please input address');
            return false
        }
        swal(
            {
                title: "Confirm to submit？",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Confirmation",
                closeOnConfirm: false
            }, function(){
                $.ajax({
                    type: "POST",
                    url: url+"Form/editUserInfo",
                    data: {
                        username: userName,
                        email: email,
                        sex: sex,
                        birthDate: birthDate,
                        school: school,
                        userID: userId,
                        stuName: stuName,
                        docName: docName,
                        phone: phone,
                        address: address
                    },
                    dataType: 'json',
                    beforeSend: function () {
                        $('#btn-submit-personal-info').css({"background": "rgba(11,11,11,0.1)"});

                    },
                    success: function (data) {
                        if (data.status == 1) {
                            swal('Success', "","success");
                            window.location.reload();

                        } else {
                            swal(data.info);
                            return false;
                        }

                    },
                    complete: function () {

                    },
                    error: function () {
                        swal('Sorry, please retry later', '', "error")
                    }
                });
            });
    });

    $('#btn-submit-modify-pwd').on('click', function () {
        var oldPwd = $('#modify_password_input_ori').val();
        var newPwd = $('#modify_password_input_new').val();
        var cPwd = $('#modify_password_input_again').val();

        if(oldPwd.length<6 || oldPwd == ''){
            swal('Please input old password');
            return false;
        }
        if(newPwd.length<6 || newPwd == ''){
            swal('Please input new password longer than 6');
            return false;
        }
        if(cPwd != newPwd || cPwd==''){
            swal('Please confirm password');
            return false;
        }

        swal(
            {
                title: "Confirm to submit？",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Confirmation",
                closeOnConfirm: false
            }, function(){
                $.ajax({
                    type: "POST",
                    url: url +"Form/modifyPassword",
                    data: {
                        username: username,
                        oldPwd: oldPwd,
                        newPwd: newPwd
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 1) {
                            swal({
                                title: "Success",
                                type: "success",
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Yes",
                                closeOnConfirm: false
                            }, function() {
                                $.cookie('cookie_info', '', {expires: -1});
                                window.location.href = "http://ndac.env.tsinghua.edu.cn/app/Engpage/login_en.html";
                            })
                        } else {
                            swal("Sorry, please modify again.");
                            return false;
                        }
                    },
                    error: function () {
                        swal('Sorry, please retry later');
                    }
                })
            });

    });


    function IsInfoTableEmpty(){
        var manu_check_table = $('#manu-check-table');
        if (manu_check_table.children().length == 0) {
            manu_check_table.attr("isPost", "0");
        }
        else {
            manu_check_table.attr("isPost", "1");
        }
    };


    $('.manu-check-area').on('click', "div.manu-item", function() {
        var docuid = $(this).attr("docuid");
        if(!docuid) {
            return
        }
        $.ajax({
            type: "POST",
            url:  url +"Document/showById",
            data: {
                username: username,
                docu_id: docuid
            },
            /*
            type: "GET",
            url: "./json/product_detail.json",
            dataType: 'json',
            */
            success: function (res) {
                if (res.status == 1) {
                    var data = res.data;
                    var curData = data[0];
                    $('#manuDetailModal').modal()
                    var modal_value = $(".detail-modal-content");
                    $(modal_value[0]).text(curData["docu_id"]);
                    $(modal_value[1]).text(curData["englishTitle"]);
                    $(modal_value[2]).text(curData["keyEnglish"]);
                    $(modal_value[3]).text(curData["theme"]);
                    $(modal_value[4]).text(curData["create_time"]);
                    var manuStatus = "NULL";
                    switch(curData["status"]) {
                        case "1":
                            manuStatus = "Submit";
                            break;
                        case "2":
                            manuStatus = "To Audit";
                            break;
                        case "3":
                            manuStatus = "Accepted";
                            break;
                        case "4":
                            manuStatus = "Rejected";
                            break;
                    }
                    $(modal_value[5]).text(manuStatus);
                    $(modal_value[6]).text("Null");
                    if (curData["audit_opinion"]) {
                        var trans_audit_opinion = JSON.parse(curData["audit_opinion"]);
                        if (trans_audit_opinion) {
                            $(modal_value[6]).text(trans_audit_opinion["comment_text"]);
                        }

                    }
                    $(modal_value[7]).html("<span id=\"download_abstract\" docuid="+curData["filename"]+"><a>Download</a></span>");
                } else {
                    console.log(res.info);
                }
            }
        })
    });

    $('#manuDetailModal').on('click', "span#download_abstract", function() {
        var cid = $(this).attr("docuid");
        window.open('http://ndac.env.tsinghua.edu.cn' + '/app/data/'+cid);
    });

    $('#acco_input_acco').on('changed.bs.select',function(e){
        if ($("button[data-id='acco_input_acco']").attr("title") == "Yes") {
            $("#is_acco_area").show();
        }
        else {
            $("#is_acco_area").hide();
        }
    });

    $('#reimburse_input_ticket_type').on('changed.bs.select',function(e){
        if ($("button[data-id='reimburse_input_ticket_type']").attr("title") == "flight ticket") {
            $("#is_air_area").show();
            $("#is_railway_area").hide();
        }
        else {
            $("#is_railway_area").show();
            $("#is_air_area").hide();
        }
    });
    $('#reimburse_input_contact').on('changed.bs.select',function(e){
        if ($("button[data-id='reimburse_input_contact']").attr("title") == "Yes") {
            $("#more_air_area").show();
            $("#more_railway_area").show();
        }
        else {
            $("#more_air_area").hide();
            $("#more_railway_area").hide();
        }
    });


    $('.user-nav-bottom-item,.user-nav-item')
        .click(
            function(){
                var id_array = ($(this).attr("id")).split("-");
                var index = parseInt(id_array[id_array.length - 1]);

                if (index == 1) {
                    var manu_list = $("#manu-check-table");
                    if (manu_list.attr("isPost") != "0"){
                        swal("Sorry, you have submited.");
                        return
                    }
                }
                if (index == 2) {
                    if (!isAbstractAc) {
                        swal("Your manuscript has not been accepted yet", "Please pay close attention to your remark");
                        return;
                    }
                }
                if (index == 3) {
                    if(!isFulltextSubmit) {
                        swal("Sorry, please submit fulltext firstly.");
                        return;
                    }
                }
                if (index == 4) {
                    if(!isRegisterInfoSubmit) {
                        swal("Sorry, please register firstly.");
                        return;
                    }
                }

                for (i = 0; i < 7; i++) {
                    var x = $("#user-center-show-body-"+i);
                    if (i == index) {
                        x.show()
                    }
                    else {
                        x.hide()
                    }
                    if (i >= 1 && i <= 4) {
                        var y = $("#user-nav-item-"+i);
                        if (i==index) {
                            y.addClass("active")
                        }
                        else {
                            y.removeClass("active")
                        }
                    }
                    else if(i>4) {
                        var y=$("#user-nav-bottom-item-"+i);
                        if (i==index) {
                            y.addClass("user-nav-bottom-item-active")
                        }
                        else {
                            y.removeClass("user-nav-bottom-item-active")
                        }
                    }
                }
                if (index == 2) {
                    if (isFulltextSubmit) {
                        return
                    }
                    index2Cal();
                }
            }
        );

    var isFulltextSubmit = false;
    var isFulltextPostBoth = false;
    var isRegisterInfoSubmit = false;
    function index2Cal() {
        isFulltextPostBoth = false;
        $('#oral_report_area').hide();
        swal(
            {
                title: "Will you give an oral presentation?",
                type: "warning",
                text: "If you have any questions, please email to ndac@tsinghua.edu.cn for consultation.",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                closeOnConfirm: true
            }, function(){
                isFulltextPostBoth = true;
                $('#oral_report_area').show();
                return true;
            });
    };

    $('#btn-submit-fulltext').on('click', function () {
        var filePoster = $("input[name=filePoster]")[0].files[0];
        var fileFulltext = $("input[name=fileFulltext]")[0].files[0];
        if (filePoster == undefined) {
            swal('Please Upload Poster');
            return;
        }

        if (isFulltextPostBoth && fileFulltext == undefined) {
            swal('Please Upload Fulltext');
            return;
        }


        var isRecoVol = $("button[data-id='fulltext_reco_vol']").attr("title");
        if(isRecoVol=='Please Choose') {
            swal('Please Choose to Open to Fulltext Set');
            return false
        }


        var isRecoCol = $("button[data-id='fulltext_reco_col']").attr("title");
        if(isRecoCol=='FESE: Frontiers of Environmental Science & Engineering') {
            swal('Please Choose to Recomend to FESE');
            return false
        }


        var filePosterName = filePoster.name.split(".");//获取上传文件的后缀
        var filePosterSuf = filePosterName[filePosterName.length - 1];
        if( filePosterSuf!="pptx" && filePosterSuf!="ppt" ){
            swal("Only Poster With Format of pptx and ppt Allowed！");
            return
        }
        if(filePoster.name != "poster.ppt" && filePoster.name != "poster.pptx") {
            swal("Please Rename Poster to poster.ppt or poster.pptx！");
            return
        }

        var isFull = "false";

        if (isFulltextPostBoth) {
            var fileFulltextName = fileFulltext.name.split(".");//获取上传文件的后缀
            var fileFulltextSuf = fileFulltextName[fileFulltextName.length - 1];
            if( fileFulltextSuf!="doc" && fileFulltextSuf!="docx" ){
                swal("Only Fulltext With Format of docx and doc Allowed！");
                return
            }
            if(fileFulltext.name != "fulltext.docx" && fileFulltext.name != "fulltext.doc") {
                swal("Please Rename fulltext to fulltext.doc or fulltext.docx！");
                return
            }
            isFull = "true";
        }


        swal(
            {
                title: "Conform to submit?",
                text: "Only one manuscript can be uploaded, and forbidden to modify",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Confirmation",
                closeOnConfirm: false
            }, function(){
                var data = new FormData();
                data.append('username', username);
                data.append('poster', filePoster);
                data.append('fulltext', fileFulltext);
                data.append('publish', isRecoCol);
                data.append('recommend', isRecoVol);
                data.append('isFull', isFull);

                $.ajax({
                    type: "POST",
                    url: url +"Document/submitDetail",
                    data: data,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.status == 1) {
                            swal("Success！", "", "success");
                            window.location.reload();
                        } else {
                            swal("Error", data.info, "error");
                            return false;
                        }
                    },
                    error: function () {
                        swal('Sorry, Please retry later', '', "error");
                    }
                })
            });
    });

    fullText(username);
    function fullText(username) {
        //请求稿件查询列表
        $.ajax({
            type: "Get",
            url:  url +"Document/getDetail?username=" + username,
            /*
            data: {
                username: username,
                type: 'all'
            },
            */
            /*type: "GET",
            url: "./json/show_product.json",*/
            dataType: 'json',
            success: function (res) {
                if(res.status==1){
                    var data = res.data;
                    if (!data) {
                        return
                    }
                    var area =$('#fulltext_uploaded');
                    var upload_input_area=$('#fulltext_ready_upload');
                    var ele =$('#fulltext_download_area');
                    isFulltextSubmit = true;
                    var htmlStr = "";
                    if ("fulltext" in data) {
                        if (data["fulltext"] != "") {
                            htmlStr += "<p style=\"font-size: 20px;margin-top: 20px;\"><a href=\"http://ndac.env.tsinghua.edu.cn/"+ data["fulltext"] +"\">Fulltext（Download）</a></p>"
                        }
                    }
                    if ("poster" in data) {
                        if (data["poster"] != "") {
                            htmlStr += "<p style=\"font-size: 20px;\"><a href=\"http://ndac.env.tsinghua.edu.cn/"+ data["poster"] +"\">Poster（Download）</a></p>"
                        }
                    }
                    ele.html(htmlStr);
                    upload_input_area.hide();
                    area.show();

                }
            }

        });
    }

    $('#btn-submit-acco').on('click', function () {
        var name = $.trim($('#acco_input_name').val());
        if(name=='') {
            swal('Please input name');
            return false
        }
        var sex = $.trim($('#acco_input_sex').val());
        if(sex=='') {
            swal('Please input gender');
            return false
        }
        var school = $.trim($('#acco_input_school').val());
        if(school=='') {
            swal('Please input university');
            return false
        }

        var area_name = $("button[data-id='acco_input_area']").attr("title");
        var area_more = $.trim($('#acco_input_more_area').val());
        if(area_name=='Please choose') {
            swal('Please choose the country/area');
            return false
        }
        if(area_name=='Others') {
            if (area_more == "") {
                swal('Please input detailed country/area name');
                return false
            }
        }

        var meal = $("button[data-id='acco_input_meal']").attr("title");
        var meal_more = $.trim($('#acco_input_meal_more').val());
        if(meal=='Please choose') {
            swal('Please choose dietary requirements');
            return false
        }
        if(meal=='Other; please specify') {
            if (meal_more == "") {
                swal('Please specify dietary requirements');
                return false
            }
            meal = meal+";"+meal_more
        }

        var schoolTravel = $("button[data-id='acco_input_school_travel']").attr("title");
        if(schoolTravel=='4pm-5pm, Oct. 17') {
            swal('Please choose whether to attend the tour to THU');
            return false
        }

        var eveParty = $("button[data-id='acco_input_eve_party']").attr("title");
        if(eveParty=='6pm-8:30pm, Oct. 18') {
            swal('Please choose whether to attend the welcome reception');
            return false
        }

        var fieldTrip = $("button[data-id='acco_input_field_trip']").attr("title");
        if(fieldTrip=='To OriginWater Technology Co., Ltd, on morning and afternoon, Oct. 19') {
            swal('Please choose whether to attend field trip');
            return false
        }

        var accoChoice = $("button[data-id='acco_input_acco']").attr("title");
        if(accoChoice=='Only available for delegates from outside Beijing.') {
            swal('Please choose whether to Require accommodation');
            return false
        }
        var idType = "";
        var idNum  = "";
        var mobile = "";
        var boardDates = "";

        if(accoChoice=='Yes') {
            idType = $.trim($('#acco_input_id_type').val());
            if(idType=='') {
                swal('Please choose id type');
                return false
            }
            idNum = $.trim($('#acco_input_id_num').val());
            if(idNum=='') {
                swal('Please input id num');
                return false
            }
            mobile = $.trim($('#acco_input_mobile').val());
            if(mobile=='') {
                swal('Please input mobile No.');
                return false
            }
            boardDates = $("button[data-id='acco_input_board_dates']").attr("title");
            if(boardDates=='Please select all that apply:') {
                swal('Please select dates of stay');
                return false
            }
        }


        swal(
            {
                title: "Confirm to submit？",
                text: "Only once can be submitted, and forbidden to modify",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Confirmation",
                closeOnConfirm: false
            }, function(){
                var data = new FormData();
                data.append('username', username);
                data.append('name', name);
                data.append('sex', sex);
                data.append('school', school);
                data.append('area', area_name);
                data.append('area_more', area_more);
                data.append('is_muslim', meal);
                data.append('is_school_travel', schoolTravel);
                data.append('is_eve_party', eveParty);
                data.append('is_field_trip', fieldTrip);
                data.append('is_acco', accoChoice);
                data.append('id_type', idType);
                data.append('id_num', idNum);
                data.append('mobile', mobile);
                data.append('board_dates', boardDates);


                $.ajax({
                    type: "POST",
                    url: url +"Document/addRegisterInfo",
                    data: data,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.status == 1) {
                            swal("Success！", "", "success");
                            window.location.reload();
                        } else {
                            swal("Error", data.info, "error");
                            return false;
                        }
                    },
                    error: function () {
                        swal('Sorry, Please retry later', '', "error");
                    }
                })
            });
    });

    registerInfo(username);
    function registerInfo(username) {
        //请求稿件查询列表
        $.ajax({
            type: "Get",
            url:  url +"Document/getRegisterInfo?username=" + username,
            //url:  "./json/register.json",
            dataType: 'json',
            success: function (res) {
                if(res){
                    $('.selectpicker').selectpicker('refresh');
                    var curData = res;
                    if (!curData) {
                        return
                    }
                    isRegisterInfoSubmit = true;
                    var nameEle =$('#acco_input_name');
                    var sexEle=$('#acco_input_sex');
                    var schoolEle =$('#acco_input_school');
                    var areaEle=$('#acco_input_area');
                    var areaMoreEle =$('#acco_input_more_area');
                    var isMuslimEle=$('#acco_input_meal');
                    var isMuslimMoreEle=$('#acco_input_meal_more');
                    var isSchoolTravelEle =$('#acco_input_school_travel');
                    var isEvePartyEle=$('#acco_input_eve_party');
                    var isFieldTripEle =$('#acco_input_field_trip');
                    var isAccoEle=$('#acco_input_acco');
                    var idTypeEle =$('#acco_input_id_type');
                    var idNumEle=$('#acco_input_id_num');
                    var mobileEle =$('#acco_input_mobile');
                    var boardDatesEle=$('#acco_input_board_dates');



                    nameEle.attr("value", curData["name"]);
                    if (curData["sex"] == "Male") {
                        $("button[data-id='acco_input_sex']").attr("title", "Male");
                        $("button[data-id='acco_input_sex'] .filter-option").text("Male")
                    }
                    else if (curData["sex"] == "Female"){
                        $("button[data-id='acco_input_sex']").attr("title", "Female");
                        $("button[data-id='acco_input_sex'] .filter-option").text("Female")
                    }
                    else {
                        $("button[data-id='acco_input_sex']").attr("title", "");
                        $("button[data-id='acco_input_sex'] .filter-option").text("")
                    }
                    schoolEle.attr("value", curData["school"]);
                    if (curData["area"] == "Mainland; China") {
                        $("button[data-id='acco_input_area']").attr("title", "Mainland; China");
                        $("button[data-id='acco_input_area'] .filter-option").text("Mainland; China")
                    }
                    else if (curData["area"] == "Hong Kong; China"){
                        $("button[data-id='acco_input_area']").attr("title", "Hong Kong; China");
                        $("button[data-id='acco_input_area'] .filter-option").text("Hong Kong; China");
                    }
                    else if (curData["area"] == "Macao; China"){
                        $("button[data-id='acco_input_area']").attr("title", "Macao; China");
                        $("button[data-id='acco_input_area'] .filter-option").text("Macao; China");
                    }
                    else if (curData["area"] == "Taiwan; China"){
                        $("button[data-id='acco_input_area']").attr("title", "Taiwan; China");
                        $("button[data-id='acco_input_area'] .filter-option").text("Taiwan; China");
                    }
                    else if (curData["area"] == "Others"){
                        $("button[data-id='acco_input_area']").attr("title", "Others");
                        $("button[data-id='acco_input_area'] .filter-option").text("Others");

                        areaMoreEle.attr("value", curData["area_more"]);
                        $("#is_acco_implement_area").show()
                    }


                    var is_muslim = curData["is_muslim"].split(";")[0];
                    if (is_muslim == "Halal") {
                        $("button[data-id='acco_input_meal']").attr("title", "Halal");
                        $("button[data-id='acco_input_meal'] .filter-option").text("Halal")
                    }
                    else if (is_muslim == "Vegetarian"){
                        $("button[data-id='acco_input_meal']").attr("title", "Vegetarian");
                        $("button[data-id='acco_input_meal'] .filter-option").text("Vegetarian")
                    }
                    else if (is_muslim == "Other"){
                        $("button[data-id='acco_input_meal']").attr("title", "Other; please specify");
                        $("button[data-id='acco_input_meal'] .filter-option").text("Other; please specify");

                        if (curData["is_muslim"].split(";").length > 2) {
                            isMuslimMoreEle.attr("value", curData["is_muslim"].split(";")[2]);
                            $("#meal_more_area").show()
                        }

                    }
                    else if (is_muslim == "None"){
                        $("button[data-id='acco_input_meal']").attr("title", "None");
                        $("button[data-id='acco_input_meal'] .filter-option").text("None")
                    }


                    if (curData["is_school_travel"] == "Yes") {
                        $("button[data-id='acco_input_school_travel']").attr("title", "Yes");
                        $("button[data-id='acco_input_school_travel'] .filter-option").text("Yes")
                    }
                    else if (curData["is_school_travel"] == "No"){
                        $("button[data-id='acco_input_school_travel']").attr("title", "No");
                        $("button[data-id='acco_input_school_travel'] .filter-option").text("No")
                    } else {
                        $("button[data-id='acco_input_school_travel']").attr("title", "");
                        $("button[data-id='acco_input_school_travel'] .filter-option").text("")
                    }


                    if (curData["is_eve_party"] == "Yes") {
                        $("button[data-id='acco_input_eve_party']").attr("title", "Yes");
                        $("button[data-id='acco_input_eve_party'] .filter-option").text("Yes")
                    }
                    else if (curData["is_eve_party"] == "No"){
                        $("button[data-id='acco_input_eve_party']").attr("title", "No");
                        $("button[data-id='acco_input_eve_party'] .filter-option").text("No")
                    } else {
                        $("button[data-id='acco_input_eve_party']").attr("title", "");
                        $("button[data-id='acco_input_eve_party'] .filter-option").text("")
                    }


                    if (curData["is_field_trip"] == "Yes") {
                        $("button[data-id='acco_input_field_trip']").attr("title", "Yes");
                        $("button[data-id='acco_input_field_trip'] .filter-option").text("Yes")
                    }
                    else if (curData["is_field_trip"] == "No"){
                        $("button[data-id='acco_input_field_trip']").attr("title", "No");
                        $("button[data-id='acco_input_field_trip'] .filter-option").text("No")
                    } else {
                        $("button[data-id='acco_input_field_trip']").attr("title", "");
                        $("button[data-id='acco_input_field_trip'] .filter-option").text("")
                    }



                    if (curData["is_acco"] == "Yes") {
                        $("button[data-id='acco_input_acco']").attr("title", "Yes");
                        $("button[data-id='acco_input_acco'] .filter-option").text("Yes")

                        $("#is_acco_area").show();
                        if (curData["id_type"] == "Resident Identity Card; PRC") {
                            $("button[data-id='acco_input_id_type']").attr("title", "Resident Identity Card; PRC");
                            $("button[data-id='acco_input_id_type'] .filter-option").text("Resident Identity Card; PRC")
                        }
                        else if (curData["id_type"] == "Mainland Travel Permit for Hong Kong and Macao Residents"){
                            $("button[data-id='acco_input_id_type']").attr("title", "Mainland Travel Permit for Hong Kong and Macao Residents");
                            $("button[data-id='acco_input_id_type'] .filter-option").text("Mainland Travel Permit for Hong Kong and Macao Residents");
                        }
                        else if (curData["id_type"] == "Mainland Travel Permit for Taiwan Residents"){
                            $("button[data-id='acco_input_id_type']").attr("title", "Mainland Travel Permit for Taiwan Residents");
                            $("button[data-id='acco_input_id_type'] .filter-option").text("Mainland Travel Permit for Taiwan Residents");
                        }
                        else if (curData["id_type"] == "Passport"){
                            $("button[data-id='acco_input_id_type']").attr("title", "Passport");
                            $("button[data-id='acco_input_id_type'] .filter-option").text("Passport");
                        }

                        idNumEle.attr("value", curData["id_num"]);
                        mobileEle.attr("value", curData["mobile"]);

                        $("button[data-id='acco_input_board_dates']").attr("title", curData["board_dates"]);
                        $("button[data-id='acco_input_board_dates'] .filter-option").text(curData["board_dates"])
                    }
                    else if (curData["is_acco"] == "No"){
                        $("button[data-id='acco_input_acco']").attr("title", "No");
                        $("button[data-id='acco_input_acco'] .filter-option").text("No")
                    } else {
                        $("button[data-id='acco_input_acco']").attr("title", "");
                        $("button[data-id='acco_input_acco'] .filter-option").text("")
                    }


                    nameEle.attr('disabled',true);
                    sexEle.attr('disabled',true);
                    schoolEle.attr('disabled',true);
                    areaEle.attr('disabled',true);
                    areaMoreEle.attr('disabled',true);
                    isMuslimEle.attr('disabled',true);
                    isMuslimMoreEle.attr('disabled',true);
                    isSchoolTravelEle.attr('disabled',true);
                    isEvePartyEle.attr('disabled',true);
                    isFieldTripEle.attr('disabled',true);
                    isAccoEle.attr('disabled',true);
                    idTypeEle.attr('disabled',true);
                    idNumEle.attr('disabled',true);
                    mobileEle.attr('disabled',true);
                    boardDatesEle.attr('disabled',true);

                    $("#btn-submit-acco").hide();

                }
            }

        });


    }

    $('#acco_input_acco').on('changed.bs.select',function(e){
        if ($("button[data-id='acco_input_acco']").attr("title") == "Yes") {
            $("#is_acco_area").show();
        }
        else {
            $("#is_acco_area").hide();
        }
    });


    $('#acco_input_area').on('changed.bs.select',function(e){
        if ($("button[data-id='acco_input_area']").attr("title") == "Others") {
            $("#is_acco_implement_area").show();
        }
        else {
            $("#is_acco_implement_area").hide();
        }
    });


    $('#acco_input_meal').on('changed.bs.select',function(e){
        $("#meal_more_area").hide();
        if ($("button[data-id='acco_input_meal']").attr("title") == "Other; please specify") {
            $("#meal_more_area").show();
        }
    });


    $('#btn-submit-reimburse').on('click', function () {
        var name = $.trim($('#reimburse_input_name').val());
        if(name=='') {
            swal('Please input name');
            return false
        }

        var is_board_evi = $("button[data-id='reimburse_input_board_evidence']").attr("title");
        if(is_board_evi=='only used for reimbursement of single-trip ticket. Available at the registration venue') {
            swal('Please select whether to need hotel receipt');
            return false
        }

        var is_ticket_evi = $("button[data-id='reimburse_input_ticket_evidence']").attr("title");
        if(is_ticket_evi=='only used for reimbursement of single-trip ticket. Available at the registration venue') {
            swal('Please select whether to need receipt of train/flight ticket reimbursement?');
            return false
        }

        var zhifubao = $.trim($('#reimburse_input_zhifubao').val());
        if(zhifubao=='') {
            swal('Please input alipay');
            return false
        }

        var is_contact = $("button[data-id='reimburse_input_contact']").attr("title");
        if(is_contact=='Please select') {
            swal('Please whether you are the contact person of your university?');
            return false
        }

        var ticket_type = $("button[data-id='reimburse_input_ticket_type']").attr("title");
        if(ticket_type=='Please select') {
            swal('Please select ticket type');
            return false
        }


        var traffic_id = "";
        var traffic_begin = "";
        var traffic_end = "";
        var seat_type = "";
        var traffic_price = "";
        var ret_traffic_id = "";
        var ret_traffic_begin = "";
        var ret_traffic_end = "";
        var ret_seat_type = "";
        var ret_traffic_price = "";
        if(ticket_type=='flight ticket') {
            traffic_id = $.trim($('#reimburse_input_air_num').val());
            if(traffic_id=='') {
                swal('Please input flight number');
                return false
            }
            traffic_begin = $.trim($('#reimburse_input_air_begin').val());
            if(traffic_begin=='') {
                swal('Please input departure (city)');
                return false
            }
            var traffic_begin_airport = $.trim($('#reimburse_input_air_begin_port').val());
            if(traffic_begin_airport=='') {
                swal('Please input departure (airport)');
                return false
            }
            traffic_begin = traffic_begin + ";" + traffic_begin_airport;

            traffic_end = $.trim($('#reimburse_input_air_end').val());
            if(traffic_end=='') {
                swal('Please input arrival (city)');
                return false
            }
            var traffic_end_airport = $.trim($('#reimburse_input_air_end_port').val());
            if(traffic_end_airport=='') {
                swal('Please input arrival (airport)');
                return false
            }
            traffic_end = traffic_end + ";" + traffic_end_airport;

            seat_type = $("button[data-id='reimburse_input_air_type']").attr("title");
            if(seat_type=='Please select') {
                swal('Please select seat type');
                return false
            }

            traffic_price =  $.trim($('#reimburse_input_air_price').val());
            if(traffic_price=='') {
                swal('Please input ticket price at face value');
                return false
            }
        }
        else if(ticket_type=='train ticket') {
            traffic_id = $.trim($('#reimburse_input_railway_num').val());
            if(traffic_id=='') {
                swal('Please input train number');
                return false
            }
            traffic_begin = $.trim($('#reimburse_input_railway_begin').val());
            if(traffic_begin=='') {
                swal('Please input departure (city)');
                return false
            }

            traffic_end = $.trim($('#reimburse_input_railway_end').val());
            if(traffic_end=='') {
                swal('Please input arrival (city)');
                return false
            }
            seat_type = $("button[data-id='reimburse_input_railway_type']").attr("title");
            if(seat_type=='Please select') {
                swal('Please select seat type');
                return false
            }

            traffic_price =  $.trim($('#reimburse_input_railway_price').val());
            if(traffic_price=='') {
                swal('Please input ticket price at face value');
                return false
            }
        }

        if(is_contact=='Yes') {
            if(ticket_type=='flight ticket') {
                ret_traffic_id = $.trim($('#reimburse_input_air_num_more').val());
                if (ret_traffic_id == '') {
                    swal('Please input return trip-Flight Number');
                    return false
                }
                ret_traffic_begin = $.trim($('#reimburse_input_air_begin_more').val());
                if (ret_traffic_begin == '') {
                    swal('Please input return trip-Departure (city)');
                    return false
                }
                var ret_traffic_begin_airport = $.trim($('#reimburse_input_air_begin_port_more').val());
                if (ret_traffic_begin_airport == '') {
                    swal('Please input return trip-Departure (airport)');
                    return false
                }
                ret_traffic_begin = ret_traffic_begin + ";" + ret_traffic_begin_airport;

                ret_traffic_end = $.trim($('#reimburse_input_air_end_more').val());
                if (ret_traffic_end == '') {
                    swal('Please input return trip-Arrival (city)');
                    return false
                }
                var ret_traffic_end_airport = $.trim($('#reimburse_input_air_end_port_more').val());
                if (ret_traffic_end_airport == '') {
                    swal('Please input return trip-Arrival (airport)');
                    return false
                }
                ret_traffic_end = ret_traffic_end + ";" + ret_traffic_end_airport;

                ret_seat_type = $("button[data-id='reimburse_input_air_type_more']").attr("title");
                if (ret_seat_type == 'Please select') {
                    swal('Please select seat type');
                    return false
                }

                ret_traffic_price = $.trim($('#reimburse_input_air_price_more').val());
                if (ret_traffic_price == '') {
                    swal('Please input ticket price at face value');
                    return false
                }
            }
            else if(ticket_type=='train ticket') {
                ret_traffic_id = $.trim($('#reimburse_input_railway_num_more').val());
                if(ret_traffic_id=='') {
                    swal('Please input return trip-train number');
                    return false
                }
                ret_traffic_begin = $.trim($('#reimburse_input_railway_begin_more').val());
                if(ret_traffic_begin=='') {
                    swal('Please input return trip-departure (city)');
                    return false
                }

                ret_traffic_end = $.trim($('#reimburse_input_railway_end_more').val());
                if(ret_traffic_end=='') {
                    swal('Please input return trip-arrival (city)');
                    return false
                }
                ret_seat_type = $("button[data-id='reimburse_input_railway_type_more']").attr("title");
                if(ret_seat_type=='Please select') {
                    swal('Please select return trip-seat type');
                    return false
                }

                ret_traffic_price =  $.trim($('#reimburse_input_railway_price_more').val());
                if(ret_traffic_price=='') {
                    swal('Please input return trip-ticket price at face value');
                    return false
                }
            }
        }


        swal(
            {
                title: "Confirm to submit？",
                text: "Only once can be submitted, and forbidden to modify",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Confirmation",
                closeOnConfirm: false
            }, function(){
                var data = new FormData();
                data.append('username', username);
                data.append('name', name);
                data.append('is_board_evi', is_board_evi);
                data.append('is_ticket_evi', is_ticket_evi);
                data.append('zhifubao', zhifubao);
                data.append('is_contact', is_contact);
                data.append('ticket_type', ticket_type);
                data.append('traffic_id', traffic_id);
                data.append('traffic_begin', traffic_begin);
                data.append('traffic_end', traffic_end);
                data.append('seat_type', seat_type);
                data.append('traffic_price', traffic_price);
                data.append('ret_traffic_id', ret_traffic_id);
                data.append('ret_traffic_begin', ret_traffic_begin);
                data.append('ret_traffic_end', ret_traffic_end);
                data.append('ret_seat_type', ret_seat_type);
                data.append('ret_traffic_price', ret_traffic_price);


                $.ajax({
                    type: "POST",
                    url: url +"Document/addPaymentInfo",
                    data: data,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.status == 1) {
                            swal("Success！", "", "success");
                            window.location.reload();
                        } else {
                            swal("Error", data.info, "error");
                            return false;
                        }
                    },
                    error: function () {
                        swal('Sorry, Please retry later', '', "error");
                    }
                })
            });
    });

    reimbuseInfo(username);
    function reimbuseInfo(username) {
        $.ajax({
            type: "Get",
            url:  url +"Document/getPaymentInfo?username=" + username,
            //url:  "./json/reimburse.json",
            dataType: 'json',
            success: function (res) {
                if(res){
                    $('.selectpicker').selectpicker('refresh');
                    var curData = res;
                    if (!curData) {
                        return
                    }
                    $('#reimburse_input_name').attr("value", curData["name"]);

                    $("button[data-id='reimburse_input_board_evidence']").attr("title", curData["is_board_evi"]);
                    $("button[data-id='reimburse_input_board_evidence'] .filter-option").text(curData["is_board_evi"]);

                    $("button[data-id='reimburse_input_ticket_evidence']").attr("title", curData["is_board_evi"]);
                    $("button[data-id='reimburse_input_ticket_evidence'] .filter-option").text(curData["is_board_evi"]);

                    $('#reimburse_input_zhifubao').attr("value", curData["zhifubao"]);

                    $("button[data-id='reimburse_input_contact']").attr("title", curData["is_contact"]);
                    $("button[data-id='reimburse_input_contact'] .filter-option").text(curData["is_contact"]);

                    $("button[data-id='reimburse_input_ticket_type']").attr("title", curData["ticket_type"]);
                    $("button[data-id='reimburse_input_ticket_type'] .filter-option").text(curData["ticket_type"]);

                    if(curData["ticket_type"]=='flight ticket') {
                        var traffic_begin = "";
                        var traffic_begin_airport="";
                        if (curData["traffic_begin"].split(";").length==2) {
                            traffic_begin = curData["traffic_begin"].split(";")[0];
                            traffic_begin_airport = curData["traffic_begin"].split(";")[1];
                        }

                        var traffic_end = "";
                        var traffic_end_airport="";
                        if (curData["traffic_end"].split(";").length==2) {
                            traffic_end = curData["traffic_end"].split(";")[0];
                            traffic_end_airport = curData["traffic_end"].split(";")[1];
                        }

                        $('#reimburse_input_air_num').attr("value", curData["traffic_id"]);
                        $('#reimburse_input_air_begin').attr("value", traffic_begin);
                        $('#reimburse_input_air_begin_port').attr("value", traffic_begin_airport);
                        $('#reimburse_input_air_end').attr("value", traffic_end);
                        $('#reimburse_input_air_end_port').attr("value", traffic_end_airport);

                        $("button[data-id='reimburse_input_air_type']").attr("title", curData["seat_type"]);
                        $("button[data-id='reimburse_input_air_type'] .filter-option").text(curData["seat_type"]);

                        $('#reimburse_input_air_price').attr("value", curData["traffic_price"]);
                        if(curData["is_contact"] == "Yes") {
                            var ret_traffic_begin = "";
                            var ret_traffic_begin_airport="";
                            if (curData["ret_traffic_begin"].split(";").length==2) {
                                ret_traffic_begin = curData["ret_traffic_begin"].split(";")[0];
                                ret_traffic_begin_airport = curData["ret_traffic_begin"].split(";")[1];
                            }

                            var ret_traffic_end = "";
                            var ret_traffic_end_airport="";
                            if (curData["ret_traffic_end"].split(";").length==2) {
                                ret_traffic_end = curData["ret_traffic_end"].split(";")[0];
                                ret_traffic_end_airport = curData["ret_traffic_end"].split(";")[1];
                            }

                            $('#reimburse_input_air_num_more').attr("value", curData["ret_traffic_id"]);
                            $('#reimburse_input_air_begin_more').attr("value", ret_traffic_begin);
                            $('#reimburse_input_air_begin_port_more').attr("value", ret_traffic_begin_airport);
                            $('#reimburse_input_air_end_more').attr("value", ret_traffic_end);
                            $('#reimburse_input_air_end_port_more').attr("value", ret_traffic_end_airport);

                            $("button[data-id='reimburse_input_air_type_more']").attr("title", curData["ret_seat_type"]);
                            $("button[data-id='reimburse_input_air_type_more'] .filter-option").text(curData["ret_seat_type"]);

                            $('#reimburse_input_air_price_more').attr("value", curData["ret_traffic_price"]);
                            $("#more_air_area").show()
                        }

                        $("#is_air_area").show()
                    }
                    else if(curData["ticket_type"]=='train ticket') {
                        var traffic_begin = curData["traffic_begin"];
                        var traffic_end = curData["traffic_end"];

                        $('#reimburse_input_railway_num').attr("value", curData["traffic_id"]);
                        $('#reimburse_input_railway_begin').attr("value", traffic_begin);
                        $('#reimburse_input_railway_end').attr("value", traffic_end);

                        $("button[data-id='reimburse_input_railway_type']").attr("title", curData["seat_type"]);
                        $("button[data-id='reimburse_input_railway_type'] .filter-option").text(curData["seat_type"]);

                        $('#reimburse_input_railway_price').attr("value", curData["traffic_price"]);
                        if(curData["is_contact"] == "Yes") {
                            var ret_traffic_begin = curData["ret_traffic_begin"];
                            var ret_traffic_end = curData["ret_traffic_end"];

                            $('#reimburse_input_railway_num_more').attr("value", curData["ret_traffic_id"]);
                            $('#reimburse_input_railway_begin_more').attr("value", ret_traffic_begin);
                            $('#reimburse_input_railway_end_more').attr("value", ret_traffic_end);

                            $("button[data-id='reimburse_input_railway_type_more']").attr("title", curData["ret_seat_type"]);
                            $("button[data-id='reimburse_input_railway_type_more'] .filter-option").text(curData["ret_seat_type"]);

                            $('#reimburse_input_railway_price_more').attr("value", curData["ret_traffic_price"]);
                            $("#more_railway_area").show()
                        }

                        $("#is_railway_area").show()
                    }


                    $('#reimburse_input_name').attr('disabled',true);
                    $('#reimburse_input_board_evidence').attr('disabled',true);
                    $('#reimburse_input_ticket_evidence').attr('disabled',true);
                    $('#reimburse_input_zhifubao').attr('disabled',true);
                    $('#reimburse_input_contact').attr('disabled',true);
                    $('#reimburse_input_ticket_type').attr('disabled',true);
                    $('#reimburse_input_air_num').attr('disabled',true);
                    $('#reimburse_input_air_begin').attr('disabled',true);
                    $('#reimburse_input_air_begin_port').attr('disabled',true);
                    $('#reimburse_input_air_end').attr('disabled',true);
                    $('#reimburse_input_air_end_port').attr('disabled',true);
                    $('#reimburse_input_air_type').attr('disabled',true);
                    $('#reimburse_input_air_price').attr('disabled',true);
                    $('#reimburse_input_air_num_more').attr('disabled',true);
                    $('#reimburse_input_air_begin_more').attr('disabled',true);
                    $('#reimburse_input_air_begin_port_more').attr('disabled',true);
                    $('#reimburse_input_air_end_more').attr('disabled',true);
                    $('#reimburse_input_air_end_port_more').attr('disabled',true);
                    $('#reimburse_input_air_type_more').attr('disabled',true);
                    $('#reimburse_input_air_price_more').attr('disabled',true);
                    $('#reimburse_input_railway_num').attr('disabled',true);
                    $('#reimburse_input_railway_begin').attr('disabled',true);
                    $('#reimburse_input_railway_end').attr('disabled',true);
                    $('#reimburse_input_railway_type').attr('disabled',true);
                    $('#reimburse_input_railway_price').attr('disabled',true);
                    $('#reimburse_input_railway_num_more').attr('disabled',true);
                    $('#reimburse_input_railway_begin_more').attr('disabled',true);
                    $('#reimburse_input_railway_end_more').attr('disabled',true);
                    $('#reimburse_input_railway_type_more').attr('disabled',true);
                    $('#reimburse_input_railway_price_more').attr('disabled',true);

                    $("#btn-submit-reimburse").hide();

                }
            }

        });


    }

});
