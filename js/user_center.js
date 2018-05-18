$(document).ready(function() {
    var url = "http://ndac.env.tsinghua.edu.cn/app/index.php/";
    var username = '';
    var identity = '';
    if($.cookie('cookie_info')){
        username =JSON.parse($.cookie('cookie_info')).username;
        identity =JSON.parse($.cookie('cookie_info')).identity;

    }else {
        window.location.href = "login_en.html#signin"
    }
    if(identity.indexOf('audit') == -1){
        $("#audit-nav-button").remove()
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
                    if (curData["sex"] == "Male") {
                        $("button[data-id='personal_info_input_sex']").attr("title", "Male");
                        $("button[data-id='personal_info_input_sex'] .filter-option").text("Male")
                    }
                    else{
                        $("button[data-id='personal_info_input_sex']").attr("title", "Female");
                        $("button[data-id='personal_info_input_sex'] .filter-option").text("Female")
                    }

                    $("#personal_info_input_birth").attr("value", curData["birthDate"]);
                    $("#personal_info_input_school").attr("value", curData["school"]);
                    $("#personal_info_input_docno").attr("value", curData["docName"]);
                    $("#personal_info_input_addr").attr("value", curData["address"]);


                    /*填充tips*/
                    $("#school_name").text(curData["school"]);
                    $("#person_name").text(curData["stuName"]);
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
        var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
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
        var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
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
                            manuStatus = "";
                            break;
                        case "4":
                            manuStatus = "";
                            break;
                        case "5":
                            manuStatus = "Refused";
                            break;
                    }
                    $(modal_value[5]).text(manuStatus);
                    $(modal_value[6]).text(curData["audit_opinion"] || "Null");
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
});
