$(document).ready(function() {
    if ($.cookie('cookie_info')) {
        var username = JSON.parse($.cookie('cookie_info')).username;
        var identity = JSON.parse($.cookie('cookie_info')).identity;
        if(username == "xuebin") {
            $.cookie('cookie_info', '', { expires: -1 });
            return
        }

        window.location.href = "user_center_en.html?time=1526202842.html"
    }
    //tab切换
    var url = "http://ndac.env.tsinghua.edu.cn/app/index.php/";

    var ok1=false;
    var ok2=false;
    var ok3=false;
    var ok4=false;
    var ok5=false;
    var ok6=false;
    var ok7=false;
    var ok8=false;
    var ok9=false;
    var ok10=false;
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
        '中国林业研究院', '中国林业科学院', '中国科学院大学', '其他院校'

    ];
    initData(schoolData);
    function initData(data) {
        var str='';
        for(var i=0;i<data.length;i++){
            // str+='<option  selected="selected">'+data[0]+'</option>';
            str+='<option>'+data[i]+'</option>';

        }
        $('.input-res-school').html(str);

    }
    */
    function bindEvent() {
        $('#sign-up-btn').on('click', function () {
            // 验证用户名
            var userName = $.trim($('#sign-up-nickname').val());
            if(userName=='') {
                swal('Please input username.');
                return false
            }
            if(userName.length < 6){
                swal('Please input username longer than 6');
                return false
            }
            var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            var email = $.trim($('#sign-up-email').val());
            if(!(emailReg.test(email)) || email == ''){
                swal('Please input correct email');
                return false
            }

            var password = $('#sign-up-pwd').val();
            if(password.length<6 || password == ''){
                swal('Please input password longer than 6');
                return false
            }

            var dpwd = $('#sign-up-pwd-again').val();
            if(dpwd==''){
                swal('Please input confirmation of password');
                return false
            }
            if(dpwd!=password){
                swal('Password and confirmation are different');
                return false
            }

            var stuName = $.trim($('#sign-up-name').val());
            if(stuName=='') {
                swal('Please input name');
                return false
            }

            var sex = $('#sign-up-sex option:selected').val();//选中的值;
            if(sex=='') {
                swal('Please select sex');
                return false
            }

            var birthDate = $('#sign-up-birthday').val();

            var school = $('#sign-up-school option:selected').val();
            if(school=='') {
                swal('Please input school');
                return false
            }


            var docName = $.trim($('#sign-up-tutor').val());
            if(docName=='') {
                swal('Please input tutor');
                return false
            }


            var addressText = $.trim($('#sign-up-more-address').val());
            if(addressText=='') {
                swal('Please input address');
                return false
            }
            var address = resProvince +resCity+resCounty + String(addressText);

            $.ajax({
                type: "POST",
                url: url+"Form/sign",
                data: {
                    username: userName,
                    password: password,
                    email: email,
                    sex: sex,
                    birthDate: birthDate,
                    school: school,
                    stuName: stuName,
                    docName: docName,
                    address: address
                },
                dataType: 'json',
                beforeSend: function () {
                    $('#sign-up-btn a').attr('disabled', 'disabled');
                    $('#sign-up-btn').css({"background": "#388e3c"});
                },
                success: function (data) {
                    if (data.status == 1) {
                        //swal('注册成功', "","success");
                        swal({
                                title: "Register Successfully",
                                text: "",
                                type: "success",
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Confirm",
                                closeOnConfirm: false
                            }, function() {
                                window.location.href = "http://ndac.env.tsinghua.edu.cn/app/Engpage/login_en.html";
                            })
                    } else {
                        swal(data.info);
                        return false;
                    }

                },
                complete: function () {
                    $('#sign-up-btn a').removeAttr('disabled');
                    $('#sign-up-btn').css({"background": "#388e3c"});
                },
                error: function () {
                    swal('Sorry, please retry later', '', "error")
                }

            });
        });


        //登录
        $('#sign-in-btn').on('click',function () {
            //登录
            var uname = $.trim($('#sign-in-username').val());
            var upwd =$.trim($('#sign-in-pwd').val());
            if(uname && upwd){
                $.ajax({
                    type: "POST",
                    url: url +"Form/login",
                    data: {
                        username: uname,
                        password: upwd,
                    },
                    beforeSend: function () {
                        $('#sign-in-username a').attr('disabled', 'disabled');
                        $('#sign-in-pwd').css({"background": "#ccc"});
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 1) {
                            var cookie_info = {
                                username:data.data.username,
                                identity: data.data.identity
                            };
                            $.cookie('cookie_info', JSON.stringify(cookie_info));
                            window.location.href = "user_center_en.html";

                        } else {
                            swal("error", data.info, "error");
                            return false;

                        }
                    },
                    complete: function () {
                        $('#sign-in-username a').removeAttr('disabled');
                        $('#sign-in-pwd').css({"background": "#7ABC06"});
                    },

                })

            }else{
                swal("Please input username and password.");
                return false;
            }

        });

    }

    $('.input__label').on('click',function () {
        $("#sign-in-pwd").attr("style", "display:block");
        $("#sign-in-username").attr("style", "display:block");
    });



    //出生日期
    $('.form_datetime').datetimepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        minView: 2,
        pickerPosition: "bottom-left"
    });


    //找回密码
    $('#forget_pwd').on('click', function() {
        $('#forgetPwdModal').modal()
    });

    $('#modal-modify-pwd').on('click', function() {
        var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        var email = $.trim($('#forget_pwd_mail').val());
        if(!(emailReg.test(email)) || email == ''){
            swal('请填写正确格式的邮箱');
            return false
        }

        var phone = $.trim($('#forget_pwd_mobile').val());
        if(phone=='') {
            swal('请输入手机号');
            return false
        }


        var password = $('#forget_pwd_pwd').val();
        if(password.length<6 || password == ''){
            swal('请设置6位以上的密码');
            return false
        }

        var dpwd = $('#forget_pwd_pwd_again').val();
        if(dpwd==''){
            swal('请再次确认你的密码');
            return false
        }
        if(dpwd!=password){
            swal('两次输入密码不一致');
            return false
        }
        swal(
            {
                title: "确定修改吗？",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                closeOnConfirm: false
            }, function(){
                var data = new FormData();

                data.append('email', email);
                data.append('phone', phone);
                data.append('password', password);

                $.ajax({
                    type: "POST",
                    url: url +"Form/forgetPassword",
                    data: data,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.status == 1) {
                            swal("修改成功！", "", "success");
                            window.location.reload();
                        } else {
                            swal("出现问题", data.info, "error");
                            return false;
                        }
                    },
                    error: function () {
                        swal('网路不给力，请稍候再试');
                    }
                })
            });
    });



    bindEvent();
    // _init_area()
});

