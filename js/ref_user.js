
//左侧导航条
// var url = "http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099/app/index.php/";
var url = "http://ndac.env.tsinghua.edu.cn/app/index.php/";
$(function () {
    // var username= $('.web-nametext').html();
    if($.cookie('cookie_info')){
        var username =JSON.parse($.cookie('cookie_info')).username;
        var identity =JSON.parse($.cookie('cookie_info')).identity;
    }else {
        var username = '';
        var identity = ''
    }
    // var username =JSON.parse($.cookie('cookie_info')).username;
    // var identity =JSON.parse($.cookie('cookie_info')).identity;


    var hash;
    var index=0;
    var showFlag;
    var page = 1;
    var pagesize = 10;
    // 权限逻辑管理
    if(identity.indexOf('contribute')>-1){
        if( identity=='contribute'){
            $('.title-contribute').addClass('user-block').addClass('on').siblings().removeClass('on');

        }else{
            $('.title-contribute').addClass('user-block').addClass('on').siblings().removeClass('on');
            $('.title-audit').addClass('user-block');

        }
        showFlag = 1;
        $('.user-contribute').addClass('active').siblings().removeClass('active');
        // $('.user-audit').addClass('active').siblings().removeClass('active');

        userInfo(username, showFlag);
        renderPwd(username, showFlag);

        contribution(username,page,pagesize);
        noAlreadyModify(username,page,pagesize);
        noAlreadyReview(username,page,pagesize);
        alreadyReview(username,page,pagesize);

        // modifyPwd(username);
        applyReview(username);
        submission(username);
        resHotel(username);

        window.setInterval(function () {
            showCountDown(2017, 9, 1);
        }, 1000);

    } else if (identity.indexOf('editor')>-1){
        showFlag = 2;
        $('.title-editor').addClass('user-block').addClass('on').siblings().removeClass('on');
        $('.user-editor').addClass('active').siblings().removeClass('active');

        hash=(!window.location.hash) ? "#edit1" : window.location.hash;
        window.location.hash=hash;
        var one = $('.edit-one');
        var two = $('.edit-two');
        var three = $('.edit-three');
        var four = $('.edit-four');
        var five = $('.edit-five');
        // var six = $('.edit-six');
        var editorRights = $('.edit-center-right');

        switch(hash){
            case "#edit1":
                one.addClass('on').siblings().removeClass('on');
                index = one.attr('data-id');
                editorRights.eq(index).addClass('active').siblings().removeClass('active');
                break;
            case "#edit2":
                two.addClass('on').siblings().removeClass('on');
                index = two.attr('data-id');
                editorRights.eq(index).addClass('active').siblings().removeClass('active');
                break;
            case "#edit3":
                three.addClass('on').siblings().removeClass('on');
                index = three.attr('data-id');
                editorRights.eq(index).addClass('active').siblings().removeClass('active');
                break;
            case "#edit4":
                four.addClass('on').siblings().removeClass('on');
                index = four.attr('data-id');
                editorRights.eq(index).addClass('active').siblings().removeClass('active');
                break;
            case "#edit5":
                five.addClass('on').siblings().removeClass('on');
                index = five.attr('data-id');
                editorRights.eq(index).addClass('active').siblings().removeClass('active');
                break;
            // case "#edit6":
            //     six.addClass('on').siblings().removeClass('on');
            //     index =six.attr('data-id');
            //     editorRights.eq(index).addClass('active').siblings().removeClass('active');
            //     break;
            default:
                one.addClass('on').siblings().removeClass('on');
                index = one.attr('data-id');
                editorRights.eq(index).addClass('active').siblings().removeClass('active');
        }
        nameListData(username);
        userInfo(username, showFlag);
        renderPwd(username, showFlag);
        noAlreadyAllocate(username,page,pagesize);
        alreadyAllocate(username,page,pagesize)

    }
    dateData();
    newsData();


    var oLis = $('.user-title-list a');
    var content = $('.user-detail');
    oLis.on('click', function () {
        var _this = $(this);
        var index = _this.index();
        _this.addClass('on').siblings().removeClass('on');
        content.eq(index).addClass('active').siblings().removeClass('active')
    });

});




//用户信息中心--稿件查询
function contribution(username,page,pagesize) {

    //请求稿件查询列表
    $.ajax({
        type: "POST",
        url:  url +"Document/show",
        data: {
            username: username,
            pagesize: pagesize || '10',
            page: page || '1',
            type: 'all'
        },
        dataType: 'json',
        success: function (res) {
            if(res.status==1){
                var data = res.data;
                var ele =$('.page .all-contribution');
                // var manageEle = $('.page .manage-all-contribution');
                if(data.length>0) {
                    var flag = 1;
                    renderList(res, username,flag);
                    initPagination(ele, res.info, page, pagesize, username, flag, 'all');
                    // initPagination(manageEle, res.info, pagesize, username, flag, 'all');
                }else {
                    ele.html('暂无此类数据');
                    // manageEle.html('暂无此类数据');
                }
            }else {
                console.log(res.info);
            }
        }

    });

}
function noAlreadyModify(username,page,pagesize){
    //待修改稿件查询列表
    $.ajax({
        type: "POST",
        url:  url +"Document/show",
        data: {
            username: username,
            pagesize: pagesize || '10',
            page: page || '1',
            type: 'doing'
        },
        dataType: 'json',
        success: function (res) {
            if(res.status==1){
                var data = res.data;
                var ele =$('.page .modify-contribution');
                if(data.length>0) {
                    var flag =2;
                    renderList(res, username,flag);
                    initPagination(ele, res.info, page, pagesize, username, flag, 'doing');
                }else {
                    ele.html('暂无此类数据');
                }
            }else {
                console.log(res.info);
            }
        }

    });
}
function noAlreadyReview(username,page,pagesize){
    //未审件查询列表
    $.ajax({
        type: "POST",
        url:  url +"Document/show",
        data: {
            username: username,
            pagesize: pagesize || '10',
            page: page || '1',
            type: 'not_audit'
        },
        dataType: 'json',
        success: function (res) {
            if(res.status==1){
                var data = res.data;
                var ele =$('.page .no-already-contribution');
                if(data.length>0) {
                    var flag =3;
                    renderList(res, username,flag);
                    initPagination(ele, res.info, page, pagesize, username, flag, 'not_audit')
                }else {
                    ele.html('暂无此类数据')
                }
            }else {
                console.log(res.info);
            }
        }

    });
}
function alreadyReview(username,page,pagesize){
    //已审稿件查询列表
    $.ajax({
        type: "POST",
        url:  url +"Document/show",
        data: {
            username: username,
            pagesize: pagesize || '10',
            page: page || '1',
            type: 'audit'
        },
        dataType: 'json',
        success: function (res) {
            if(res.status==1){
                var data = res.data;
                var ele =$('.page .already-contribution');
                if(data.length>0) {
                    var flag =4;
                    renderList(res, username, flag);
                    initPagination(ele, res.info, page, pagesize, username, flag, 'audit')
                }else {
                    ele.html('暂无此类数据')
                }
            }else {
                console.log(res.info);
            }
        }

    });
}
function noAlreadyAllocate(username,page,pagesize){
    //待分配稿件查询列表
    $.ajax({
        type: "POST",
        url:  url +"Document/show",
        data: {
            username: username,
            pagesize: pagesize || '10',
            page: page || '1',
            type: 'not_distribute'
        },
        dataType: 'json',
        success: function (res) {
            if(res.status==1){
                var data = res.data;
                var ele =$('.page .no-allocate-contribution');
                if(data.length>0) {
                    var flag =5;
                    renderList(res, username,flag);
                    initPagination(ele, res.info, page, pagesize, username, flag, 'not_distribute')
                }else {
                    ele.html('暂无此类数据')
                }
            }else {
                console.log(res.info);
            }
        }

    });
}
function alreadyAllocate(username,page,pagesize){

    //已分配稿件查询列表
    $.ajax({
        type: "POST",
        url:  url +"Document/show",
        data: {
            username: username,
            pagesize: pagesize || '10',
            page: page || '1',
            type: 'distribute'
        },
        dataType: 'json',
        success: function (res) {
            if(res.status==1){
                var data = res.data;
                var ele =$('.page .allocate-contribution');
                if(data.length>0) {
                    var flag =6;
                    renderList(res, username, flag);
                    initPagination(ele, res.info, page, pagesize, username, flag, 'distribute')
                }else {
                    ele.html('暂无此类数据');
                }
            }else {
                console.log(res.info);
            }
        }

    });
}
function renderList(res,username,flag) {

    var data = res.data;
    var total = res.info;
    var titleData;
    if(data.length>0){
        for(var i=0;i<data.length;i++){
            var curData = data[i];
            curData.audit_opinion = curData.audit_opinion || '暂无任何意见';

            curData.create_time = curData.create_time ? String(curData.create_time).substring(0, 10) : '—';
            curData.allocate_time = curData.allocate_time ? String(curData.allocate_time).substring(0, 10) : '—';
            curData.audit_time = curData.audit_time ? String(curData.audit_time).substring(0,10) : '—';
            curData.repair_over_time = curData.repair_over_time ? String(curData.repair_over_time).substring(0,10) : '——';
            curData.repair_time = curData.repair_time ? String(curData.repair_time).substring(0,10) : '—';

            curData.view = '<span class="contri-see" data-id="'+curData.docu_id+'">查看审稿意见</span>';
            curData.upload = '<span class="contri-upload" data-id="'+curData.docu_id+'">下载稿件</span><span class="contri-review-evaluate" data-id="'+curData.docu_id+'">稿件评价</span>';
            // curData.fullText = '<span class="contri-upload-fulltext" data-id="'+curData.docu_id+'">全文下载</span><span class="contri-upload-poster" data-id="'+curData.docu_id+'">海报下载</span>';
            // curData.look = '<span class="contri-look" data-id="'+curData .docu_id+'" data-title="'+curData.chineseTitle+'">审稿人</span>';

            if((curData.info & 2) == 2){
                curData.fullText = '<span class="contri-upload-fulltext" data-id="'+curData.docu_id+'">全文下载</span>';
            }else {
                curData.fullText = '-';
            }
            if((curData.info & 1) == 1){
                curData.poster = '<span class="contri-upload-poster" data-id="'+curData.docu_id+'">海报下载</span>';
            }else {
                curData.poster = '-';
            }

            curData.audit_user = curData.audit_user || '暂无';
            curData.operate = '<span class="contri-operate" data-id="'+curData.docu_id+'" data-status="'+curData.status+'" data-target="'+curData.username+'">稿件操作</span>';
            curData.distribution = '<span class="contri-distribution" data-id="'+curData.docu_id+'">稿件分配</span>';

            curData.chineseTitle ='<span class="contri-title" data-id="'+curData.docu_id+'" data-status="'+curData.status+'">'+curData.chineseTitle+'</span>';
            curData.edit = '<input class="contri-edit-upload" type="file" name="file'+curData.id+'" value="上传修改稿"/><button class="edit-upload-btn" data-id="'+curData.docu_id+'">上传</button>';
            if(curData.status==0){
                curData.status = '待提交';
            }else if (curData.status==1){
                curData.status = '已提交';

            }else if(curData.status==2){
                curData.status = '待审';
            } else if ( curData.status==3){
                var reg = new RegExp(',', 'g');
                var newFlag = curData.new_flag.match(reg);
                if(newFlag.length>=2){
                    curData.status = '已审';
                }else if(curData.new_flag.indexOf(username)>0){
                    curData.status = '已审';
                }else {
                    curData.status = '审稿中';
                }
            } else if (curData.status==4){
                curData.status = '已采纳';
            } else if (curData.status==5){
                curData.status = '不宜采纳';
            } else if (curData.status==6){
                curData.status = '待修改';
            }else {
                curData.status = '已提交';
            }
        }

        var alContribution =$('.al-contribution');
        var noContribution =$('.no-contribution');
        if(data.length>5){
            titleData=data.slice(0,5);
        }else {
            titleData=data;
        }
        if(flag ==1){
            bindData(titleData, alContribution);
            contriData(data,username);

        }else if(flag ==2){
            bindData(titleData, noContribution);
            contriDataModify(data,username);
        }else if(flag ==3){
            noReviewData(data,username);
        }else if(flag ==4){
            alreadyReviewData(data,username);
        }else if(flag ==5){
            noAlreadyAllocateData(data,username);

        } else if(flag ==6){
            alreadyAllocateData(data,username);
        }else if(flag ==7) {
            statusData(data);
        }


    }
}

//数据绑定
function bindData(data,ele) {
    var str='';
    for(var i=0;i<data.length;i++){
        // data[i].create_time = String(data[i].create_time).substring(0,10);
        str +='<li class="content-menu-contribution-item">';
        str+='<span class="contribution-title">' +data[i].chineseTitle+'</span>';
        str+='<span>' +data[i].create_time+'</span>';
        str +='</li>';
    }
    ele.append(str);
}
//最新消息
function initNews(adatas) {
    var str='';
    for(var i=0;i<adatas.length;i++){
        str +='<li class="content-menu-contribution-item">';
        str+='<a href="'+adatas[i].value+'">' +adatas[i].text+'</a>';
        str +='</li>';
    }

    $('.content-menu-contribution-news').append(str);
    $('.review-news').append(str);
}

function dateData(){
    //日期获取
    $.ajax({
        type: "POST",
        url: url + "Manage/get",
        data: {
            content: 'date'
        },
        dataType: 'json',
        success: function (res) {
            if(res.status==1){
                var date =JSON.parse(res.data.date[0].value);
                $('.date-paper-end').html(date.paperEnd);
                $('.date-paper-hire').html(date.paperHire);
                $('.date-allpaper-end').html(date.allPaperEnd);
                $('.date-allpaper-day').html(date.allPaperDate);
            }else {
                console.log(res.info);
            }
        }

    });
}
function newsData(){
    //最新消息获取
    $.ajax({
        type: "POST",
        url: url + "Manage/getMessage",
        dataType: 'json',
        success: function (res) {
            if(res.status==1){
                var adatas=res.data;
                if(adatas.length>0){
                    if(adatas.length>5){
                        adatas=adatas.slice(0,5);

                    }
                    initNews(adatas);
                }else {
                    $('.content-menu-contribution-news').append('<li class="content-menu-contribution-item"></li>');
                    $('.review-news').append('<li class="content-menu-contribution-item"></li>');
                }


            }else {
                console.log(res.info);
            }
        }
    });
}

//投稿
function submission(username) {
    //提交
    $('.upload-btn-confirm').on('click', function () {
        var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        // var file = $('[type="file"]').get(0).files[0];
        // var fileSrc = $("input[name=fileString]").val();
        var fileSrc = $("input[name=fileString]")[0].files[0];
        var chineseTitle = $.trim($('#summary-chinese-title').val());
        var englishTitle = $.trim($('.val-english-tit').val());
        var keyChinese = $.trim($('.chinese-keywords').val());
        var keyEnglish = $.trim($('.english-keywords').val());
        var theme = $.trim($('.val-apply-theme option:selected').val());
        var authorName = $('.val-apply-name').val();
        var authorPing = $.trim($('.val-apply-ping').val());
        var authorEmail = $.trim($('.val-apply-email').val());
        var authorCompany = $.trim($('.val-apply-company').val());
        var remarks = $.trim($('.val-apply-remarks').val());

        var author = [{
            authorName: authorName,
            authorPing: authorPing,
            authorEmail: authorEmail,
            authorCompany: authorCompany
        }];
        var moreAuthor = $('.more-author-item');
        moreAuthor.each(function (i) {
            var item={};
            var addName=  $(this).attr('data-name');
            var addPing=  $(this).attr('data-ping');
            var addEmail=  $(this).attr('data-email');
            var addCompany=  $(this).attr('data-company');
            item.authorName =addName;
            item.authorPing =addPing;
            item.authorEmail =addEmail;
            item.authorCompany =addCompany;
            author.push(item);
        });
        var fileAccept = fileSrc.name.split(".")[1];//获取上传文件的后缀
        if( fileAccept!="doc" && fileAccept!="docx" ){
            $('.val-apply-file').html("只能上传.doc和.docx的文件！");
        }


        if(!/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(chineseTitle)){
            $('.chinese-tit-error').html('请填写中文标题');
            return false
        }
        if(!(/[\u4E00-\u9FA5\uF900-\uFA2D]||\，*||\,*/.test(keyChinese))){
            $('.chinese-tit-error').html('请填写不错过5个关键字，以逗号隔开');
            return false
        }
        if(authorName==''){
            $('.apply-name-error').html('请填写作者姓名');
            return false
        }
        if(authorPing==''||/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(authorPing)){

            $('.apply-ping-error').html('请填写作者拼音');
            return false
        }
        if(authorEmail==''||!(emailReg.test(authorEmail))){
            $('.apply-email-error').html('请填写作者邮箱');
            return false
        }
        if(authorCompany==''){
            $('.apply-name-error').html('请填写作者地址');
            return false
        }
        var data = new FormData();
        data.append('username', username);
        data.append('fileSrc', fileSrc);
        data.append('chineseTitle', chineseTitle);
        data.append('englishTitle', englishTitle);
        data.append('keyChinese', keyChinese);
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
                    alert('提交成功，请等待审核');
                    // window.location.reload();
                    window.location.href='/app/Tpl/Form/user.html'
                } else {
                    // $('.user-person-apply').append('<div class="pwd-error">'+data.info+'</div>');
                    alert(data.info);
                    return false;
                }
            },
            error: function () {
                alert('网路不给力，请稍候再试');
            }
        })
    });
    //添加更多作者
    $('.more-author').on('click', function () {
        popup.init();
        var tHtml = [], mHtml= [];
        tHtml.push('<span class="popup-title">添加作者</span><i class="popup-close">x</i>');
        $('.popup-header').html(tHtml.join(''));
        mHtml.push('<form class="extra-author">');
        mHtml.push('<div class="user-person-apply-list"> <label class="add-author-label">作者姓名：</label> <input type="text" class="user-person-apply-val add-author-name" /> <span class="pwd-error"></span> </div>');
        mHtml.push('<div class="user-person-apply-list"> <label class="add-author-label">作者拼音：</label> <input placeholder="" class="user-person-apply-val add-author-ping"/> <span class="pwd-error"></span> </div>');
        mHtml.push('<div class="user-person-apply-list"> <label class="add-author-label">邮箱地址：</label> <input placeholder="" class="user-person-apply-val add-author-email"/> <span class="pwd-error"></span> </div>');
        mHtml.push('<div class="user-person-apply-list"> <label class="add-author-label">作者单位：</label> <textarea class="user-person-apply-val add-author-company" rows="3" cols="30"></textarea> <span class="pwd-error"></span> </div>');
        mHtml.push('<div class="user-person-apply-list pwd-error add-author-error"></div>');
        mHtml.push('<div class="user-person-apply-val"><span class="edit-btn-cancel add-author-cancel">取消</span><span class="edit-btn-confirm add-author-confirm">确定</span> </div>');
        mHtml.push('</form>');
        $('.popup-edit').html(mHtml);
        $('.popup-footer').html('');
        popup.popupEvent();
        $('.extra-author input').on('keydown', function () {
            $('.add-author-error').html('');
        });
        $('.add-author-confirm').on('click', function () {
            var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            var addName = $.trim($('.add-author-name').val());
            var addPing = $.trim($('.add-author-ping').val());
            var addEmail = $.trim($('.add-author-email').val());
            var addCompany = $.trim($('.add-author-company').val());
            if(addName==''){
                $('.add-author-error').html('请填写作者姓名');
                return false
            }
            if(addPing==''||(/[\u4E00-\u9FA5\uF900-\uFA2D]/).test(addPing)){

                $('.add-author-error').html('请填写作者拼音');
                return false
            }
            if(addEmail==''||!(emailReg.test(addEmail))){
                $('.add-author-error').html('请填写作者邮箱');
                return false
            }
            if(addCompany==''){
                $('.add-author-error').html('请填写作者地址');
                return false
            }
            $('.popup').remove();
            $('.more-author-list').append('<span class="more-author-item" data-name='+addName+' data-ping='+addPing+' data-email='+addEmail+' data-company='+addCompany+'>'+addName+'</span>')
        });
        $('.add-author-cancel').on('click', function () {
            $('.popup').remove();
        })
    })
}


function showOpinion(username,cid){
    if(cid>0){
        $.ajax({
            type: "POST",
            url: url + "Document/showOpinion",
            data: {
                username: username,
                docu_id: cid
            },
            dataType: 'json',
            success: function (res) {
                if(res.status==1){
                    var data = res.data;
            
                    popup.init();
                    var tHtml = [],aHtml= [], lastData = [];
                    tHtml.push('<span class="popup-title">审稿意见</span><i class="popup-close">x</i>');
                    $('.popup-header').html(tHtml.join(''));
                    if(data && data.length>0){
                        var aTitles = [
                            {id: 'audit_user', title: '审批人'},
                            {id: 'audit_opinion', title: '意见'},
                            // {id: 'evaluate_text', title:'评价'},
                            // {id: 'version', title: '版本'}
                        ];
                        for(var i=0;i<data.length;i++){
                            var cur =data[i];
                            // cur.evaluate = JSON.parse(cur.evaluate);
                            if(cur.evaluate){
                                cur.oneData = JSON.parse(cur.evaluate);
                                cur.oneData.audit_user = cur.audit_user;
                            } else {
                                cur.oneData ={
                                    audit_user: cur.audit_user,
                                    creative:"暂无评价",
                                    application:"暂无评价",
                                    chineseLevel:"暂无评价",
                                    englishEevel:"暂无评价",
                                    evaluateRadio:"暂无评价"
                                };
                            }
                            lastData.push(cur.oneData);
                        }
                        var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 10});
                        aHtml.push(oNewTable.init());
                        for(var j =0;j<lastData.length;j++){
                            var curItem = lastData[j];
                            aHtml.push('<div class="opinion-evaluate-detail"><p style="color: #002a80"> 审稿人:'+curItem.audit_user+'</p><p> 创新型:'+curItem.creative+'</p><p> 应用型:'+curItem.application+'</p><p>中文摘要写作水平:'+curItem.chineseLevel+'</p><p> 英文摘要写作水平:'+curItem.englishEevel+'</p><p>论文总体评价:'+curItem.evaluateRadio+'</p></div>')
                        }


                    } else {
                        aHtml = '暂无审稿意见';
                    }
                    $('.popup-edit').html(aHtml);
                    // $('.opinion-evaluate').hover(function(){
                    //     $(this).find('.opinion-evaluate-detail').removeClass('hide');
                    // }, function(){
                    //     $(this).find('.opinion-evaluate-detail').addClass('hide');
                    // })
                    popup.popupEvent(function () {
                        $('.popup').remove();
                    });
                }else {
                    alert(res.info);
                }
            },
            error: function () {
                alert('服务器开小差，请稍候再试');
            }
        });
    }else {
        popup.init();
        var tHtml = [],aHtml= [];
        tHtml.push('<span class="popup-title">审稿意见</span><i class="popup-close">x</i>');
        $('.popup-header').html(tHtml.join(''));
        aHtml = '暂无审稿意见';
        $('.popup-edit').html(aHtml);
        popup.popupEvent(function(){
            $('.popup').remove();
        });
    }
}
//稿件查询
function contriData(data,username) {
    var defaultEle =$('.user-detail-contribution-default');
    var ele= $('.user-detail-contribution');
    var siblingEle= $('.user-detail-contribution-person');
    var aTitles = [{id: 'docu_id', title: '稿件编号'},
        {id: 'chineseTitle', title: '标题'},
        {id: 'create_time', title: '投稿时间'},
        {id: 'status', title: '稿件状态'},
        {id: 'view', title: '审稿意见'},
        // {id: 'edit', title: '上传修稿'}
    ];
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 5});
    var aHtml = [];
    aHtml.push(oNewTable.init());

    ele.html(aHtml);
    //点击某一个标题进入当前稿件的详情
    $('.user-detail-contribution .contri-title').on('click', function () {
        var _this = $(this);
        defaultEle.addClass('hide');
        siblingEle.removeClass('hide');
        var cid = _this.attr('data-id');
        var status = _this.attr('data-status');
        //请求当前稿件详情接口
        $.ajax({
            type: "POST",
            url: url + "Document/showById",
            data: {
                username: username,
                docu_id: cid
            },
            dataType: 'json',
            success: function (res) {
                if(res.status==1){
                    var data  =res.data[0];
                    personContri(data,defaultEle,siblingEle, status)
                }else {
                    alert(res.info);
                }
            },
            error: function () {
                alert('请重试');
            }

        });


    });

    //点击上传修改稿件
    $('.user-detail-contribution .edit-upload-btn').on('click', function () {
        var fileSrc = ($(this).siblings())[0].files[0];
        var cid = $(this).attr('data-id');
        var data = new FormData();
        var filePath = fileSrc.name;
        if (filePath == "") {
            alert("请选择上文件！");
            return;
        }
        var strExtension = filePath.substr(filePath.lastIndexOf('.') + 1);
        //判断上传文件的后缀名
        if (strExtension != 'doc' && strExtension != 'docx') {
            alert("请选择word文档上传");
            return;
        }
        data.append('username', username);
        data.append('fileSrc', fileSrc);
        data.append('docu_id', cid);
        console.log(data);
        $.ajax({
            type: "POST",
            url: url + "Document/resubmit",
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
                if(data.status==1){
                    alert('上传成功');

                }else {
                    alert(data.info);
                }
            },
            error: function () {
                alert('服务器开小差，请稍候再试');
            }
        });
    });


    //点击查看审核意见
    $('.user-detail-contribution .contri-see').on('click', function () {
        var _this = $(this);
        var cid = _this.attr('data-id');
        showOpinion(username,cid)
    });

}


//待修改稿件查询
function contriDataModify(data,username) {

    var defaultEle =$('.user-detail-contribution-modify-default');
    var ele= $('.user-detail-contribution-modify');
    var siblingEle= $('.user-detail-contribution-modify-person');
    var aTitles = [{id: 'docu_id', title: '稿件编号'},
        {id: 'chineseTitle', title: '标题'},
        {id: 'create_time', title: '投稿时间'},
        // {id: 'status', title: '稿件状态'},
        {id: 'view', title: '审稿意见'},
        {id: 'edit', title: '上传修稿'}
    ];
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 10});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    ele.html(aHtml);

    //点击某一个标题进入当前稿件的详情
    $('.user-detail-contribution-modify .contri-title').on('click', function () {
        var _this = $(this);
        var status = _this.attr('data-status');
        defaultEle.addClass('hide');
        siblingEle.removeClass('hide');
        var cid = _this.attr('data-id');
        //请求当前稿件详情接口
        $.ajax({
            type: "POST",
            url: url + "Document/showById",
            data: {
                username: username,
                docu_id: cid
            },
            dataType: 'json',
            success: function (res) {
                if(res.status==1){
                    var data  =res.data[0];
                    personContri(data, defaultEle,siblingEle, status);
                }else {
                    alert(res.info);
                }
            },
            error: function () {
                alert('服务器开小差，请稍候再试');
            }

        });


    });

    //点击上传修改稿件
    $('.edit-upload-btn').on('click', function () {
        var fileSrc = ($(this).siblings())[0].files[0];
        var cid = $(this).attr('data-id');
        var data = new FormData();
        var filePath = fileSrc.name;
        if (filePath == "") {
            alert("请选择上文件！");
            return;
        }
        var strExtension = filePath.substr(filePath.lastIndexOf('.') + 1);
        //判断上传文件的后缀名
        if (strExtension != 'doc' && strExtension != 'docx') {
            alert("请选择word文档上传");
            return;
        }
        data.append('username', username);
        data.append('fileSrc', fileSrc);
        data.append('docu_id', cid);
        console.log(data);
        $.ajax({
            type: "POST",
            url: url + "Document/resubmit",
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            beforeSend: function () {
                $('.edit-upload-btn').attr('disabled', 'disabled');
                $('.edit-upload-btn').css({"background": "#ccc"});
            },
            success: function (data) {

                if(data.status==1){
                    alert('上传成功');
                    window.location.reload();

                }else {
                    alert(data.info);
                }
            },
            complete: function () {
                $('.edit-upload-btn').removeAttr('disabled');
                $('.edit-upload-btn').css({"background": "#fff"});
            },
            error: function () {
                alert('服务器开小差，请稍候再试');
            }
        });
    });


    //点击查看审核意见
    $('.user-detail-contribution-modify .contri-see').on('click', function () {
        var _this = $(this);
        var cid = _this.attr('data-id');
        showOpinion(username,cid)


    });
}

//渲染当前稿件详情
function personContri(data, ele, siblingEle,status) {
    var bHtml = [], cHtml= [], dHtml=[], eHtml=[];
    var cid = data.docu_id ;
    bHtml.push('<span class="contri-callback">返回</span> <span class="contribute-upload-single upload-on" data-id="'+ data.docu_id+'"><i class="iconfont icon-download upload-icon"></i>下载原始摘要</span><span class="contribute-upload-all upload-on hide" data-id="'+ data.docu_id+'"><i class="iconfont icon-download upload-icon"></i>下载原始全文</span><span class="contribute-upload-poster upload-on hide" data-id="'+ data.docu_id+'"><i class="iconfont icon-download upload-icon"></i>下载海报</span>');
    $('.contribute-upload').html(bHtml);

    cHtml.push('<p> <span class="user-contribute-list-title">稿件编号</span> <a title='+ data.docu_id+'>'+ data.docu_id+'</a></p>');
    cHtml.push('<p> <span class="user-contribute-list-title">中文标题</span> <a title='+ data.chineseTitle+'>'+data.chineseTitle+'</a></p>');
    cHtml.push('<p> <span class="user-contribute-list-title">英文标题</span> <a title='+ data.englishTitle+'>'+data.englishTitle+'</a></p>');
    cHtml.push('<p> <span class="user-contribute-list-title">中文关键字</span> <a title='+ data.keyChinese+'>'+data.keyChinese+'</a></p>');
    cHtml.push('<p><span class="user-contribute-list-title">英文关键字</span> <a title='+ data.keyEnglish+'>'+data.keyEnglish+'</a></p>');
    cHtml.push('<p> <span class="user-contribute-list-title">主题</span> <a title='+ data.theme+'>'+data.theme+'</a></p>');
    cHtml.push('<p> <span class="user-contribute-list-title">投稿日期</span> <a>'+String(data.create_time).substring(0,10)+'</a></p>');
    $('.user-contribute-list').html(cHtml);
    if(status == 4){
        uploadFulltext(cid);
    }


    if((data.info & 2) == 2){
        $('.contribute-upload-all').removeClass('hide');
    }

    if((data.info & 1) == 1){
        $('.contribute-upload-poster').removeClass('hide');
    }

    //点击返回
    $('.contri-callback').on('click', function () {
        var _this = $(this);
        ele.removeClass('hide');
        siblingEle.addClass('hide');
    });
    //点击稿件下载
    $('.contribute-upload-single').on('click', function () {
        // var cid = $(this).attr('data-id');
        window.open('http://ndac.env.tsinghua.edu.cn' + '/app/data/'+cid+'.tar.gz');
         // window.open('http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099' + '/app/data/'+cid+'.tar.gz');
    });

    //点击全文下载
    $('.contribute-upload-all').on('click', function () {
        // var cid = $(this).attr('data-id');
        window.open('http://ndac.env.tsinghua.edu.cn' + '/app/data/'+cid +'.quanwen.tar.gz');
        // window.open('http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099' + '/app/data/'+cid+'.quanwen.tar.gz');
    });

    //点击海报下载
    $('.contribute-upload-poster').on('click', function () {
        // var cid = $(this).attr('data-id');
        window.open('http://ndac.env.tsinghua.edu.cn' + '/app/data/'+cid +'.haibao.tar.gz');
        // window.open('http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099' + '/app/data/'+cid+ '.haibao.tar.gz');
    });

    var authorData = JSON.parse(data.author)|| 0;
    var versionData = JSON.parse(data.version) || 0;
    if(authorData.length>0){
        contriAuthor(authorData);
    }
    if(versionData.length>0) {
        contriStage(versionData);
    }
}

//上传全文和海报
function uploadFulltext(cid) {
    var sHtml = [];
    sHtml.push('<p class="full-contribute"><label>全文上传：</label><input type="file" name="fulltext"/><a class="upload-fulltext" href="javascript:void(0);">上传</a></p>');
    sHtml.push('<p class="full-contribute"><label>海报上传：</label><input type="file" name="poster"><a class="upload-poster" href="javascript:void(0);">上传</a></p>');
    sHtml.push('<p class="upload-error-show"></p>');
    $('.user-contribute-full').html(sHtml);


    //点击全文上传
    $('.upload-fulltext').on('click', function () {
        var fileSrc = $("input[name=fulltext]")[0].files[0];
        var data = new FormData();
        var filePath = fileSrc.name;
        if (filePath == "") {
            alert("请选择上文件！");
            return;
        }
        var strExtension = filePath.substr(filePath.lastIndexOf('.') + 1);
        //判断上传文件的后缀名
        if (strExtension != 'doc' && strExtension != 'docx') {
            alert("请选择word文档上传");
            return;
        }
        data.append('quanwen', 'quanwen');
        data.append('fileSrc', fileSrc);
        data.append('docu_id', cid);
        $.ajax({
            type: "POST",
            url: url + "Document/submitDetail",
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            beforeSend: function () {
                $('.upload-fulltext').attr('disabled', 'disabled');
                $('.upload-fulltext').css({"color": "#ccc"});
            },
            success: function (data) {
                if (data.status == 1) {
                    alert('上传成功');
                    window.location.reload();

                } else {
                    $('.upload-error-show').html(data.info);
                }
            },
            complete: function () {
                $('.upload-fulltext').removeAttr('disabled');
                $('.upload-fulltext').css({"color": "#006dcc"});
            },
            error: function () {
                alert('服务器开小差，请稍候再试');
            }
        });

    });

    $('.upload-poster').on('click', function (e) {
        var image = $("input[name=poster]")[0].files[0];
        var data = new FormData();
        var imgPath = image.name;
        if (imgPath == "") {
            alert("请选择上传图片！");
            return;
        }
        //判断上传文件的后缀名
        var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
        if (strExtension != 'jpg' && strExtension != 'gif'
            && strExtension != 'png' && strExtension != 'bmp') {
            alert("请选择图片文件");
            return;
        }
        data.append('haibao', 'haibao');
        data.append('fileSrc', image);
        data.append('docu_id', cid);
        //请求上传图片接口
        $.ajax({
            type: "POST",
            url: url + "Document/submitDetail",
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            beforeSend: function () {
                $('.upload-poster').attr('disabled', 'disabled');
                $('.upload-poster').css({"color": "#ccc"});
            },
            success: function (data) {
                if (data.status == 1) {
                    alert('上传成功');
                    window.location.reload();
                } else {
                    $('.upload-error-show').html(data.info);
                }
            },
            complete: function () {
                $('.upload-poster').removeAttr('disabled');
                $('.upload-poster').css({"color": "#006dcc"});
            },
            error: function () {
                alert('服务器开小差，请稍候再试')
            }

        });
    });
    $('input').on('change', function () {
        $('.upload-error-show').html('');
    });
}

//稿件详情--作者
function contriAuthor(data) {

    var aTitles = [{id: 'authorName', title: '作者'},
        // {id: 'authorPing', title: '姓名'},
        {id: 'authorEmail', title: '邮箱'},
        {id: 'authorCompany', title: '单位'}
    ];
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 10});
    var aHtml = [];
    aHtml.push(oNewTable.init());
   $('.user-contribute-author').html(aHtml);
}

//稿件详情--审稿阶段
function contriStage(data) {

    var aTitles = [{id: 'vesion', title: '审稿阶段'},
        {id: 'allocate_time', title: '送审时间'},
        {id: 'audit_time', title: '审回时间'},
        {id: 'repair_time', title: '退修时间'},
        {id: 'repair_over_time', title: '修回时间'},
        {id: 'upload', title: '下载修改稿'},
        {id: 'view', title: '意见'},
    ];
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 10});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    $('.user-contribute-abstract').html(aHtml);
}

// DONE
//展示个人信息
function userInfo(username, flag) {
    showNotice();
    $.ajax({
        type: "POST",
        // url: url +"Form/searchUser",
        url: "searchUser.json",
        data: {
            username: username
        },
        dataType: 'json',
        success: function (data) {
            if (data.status == 1) {

                $('#school_name').html(data.data[0].school);
                $('#person_name').html(data.data[0].stuName);

                perInfo(data.data[0], flag);

            } else {
                alert(data.info);
                return false;
            }
        }

    });
}

function showNotice() {
    $('.detail-right-title-img').hover(function () {
        $('.upload-notice').removeClass('hide');
    },function () {
        $('.upload-notice').addClass('hide');
    })
}

//进行上传头像
function uploadImg(username) {
    $('.upload-img').on('change', function(e) {
        var image =  $("input[name=uploading]")[0].files[0];
        var data = new FormData();
        var imgPath = $("#upload-img").val();
        if (imgPath == "") {
            alert("请选择上传图片！");
            return;
        }
        //判断上传文件的后缀名
        var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
        if (strExtension != 'jpg' && strExtension != 'gif'
            && strExtension != 'png' && strExtension != 'bmp') {
            alert("请选择图片文件");
            return;
        }
        data.append('username', username);
        data.append('imgSrc', image);
        //请求上传图片接口
        $.ajax({
            type: "POST",
            url: url +"Form/setImage",
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.status == 1) {
                    $('.upload-notice').addClass('hide');
                    window.location.reload();
                } else {
                    alert(data.info);
                    return false;
                }
            },
            error: function () {
                alert('服务器开小差，请稍候再试')
            }

        });
    });
}

//TODO
//渲染个人信息页面
function perInfo(data) {
    $('#personal_info_input1').val(data.username);
    $('#personal_info_input2').val(data.email)
    $('#personal_info_input3').val(data.stuName)
    $('#personal_info_input4').val(data.sex)
    $('#personal_info_input5').val(data.birthDate)
    $('#personal_info_input6').val(data.school)
    $('#personal_info_input7').val(data.userID)
    $('#personal_info_input8').val(data.docName)
    $('#personal_info_input9').val(data.phone)
    $('#personal_info_input10').val(data.address)

    if($('.val-sex').attr('data-sex')==1){
        $('.val-sex-girl').attr('selected', 'selected');
        $('.val-sex-boy').attr('selected', false);
    }else {
        $('.val-sex-girl').attr('selected', false);
        $('.val-sex-boy').attr('selected', 'selected');
    }
    $('.user-person-info input').on('keydown', function () {
        $('.edit-info-error').html('');
    });
    $('.person-info-btn').on('click', function () {
        personModify();
    });

    //出生日期
    $('.form_datetime').datetimepicker({
        language: 'zh-CN',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        minView: 2,
        pickerPosition: "bottom-left"
    });
}

//个人信息编辑接口
function personModify() {
    var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    var userName = $.trim($('.val-username').val());
    var email = $.trim($('.val-email').val());
    var sex = $('.val-sex option:selected').val();//选中的值;
    // var birthDate = ($('.val-date').val()).replace(/-/g,"");
    var birthDate = $('.val-date').val();
    var school = $('.val-school').val();
    var userId = $.trim($('.val-userid').val());
    var stuName = $.trim($('.val-stuname').val());
    var docName = $.trim($('.val-docname').val());
    var phone = $.trim($('.val-phone').val());
    var address = $.trim($('.val-address').val());
    if(userName==''){
        $('.edit-info-error').html('请填写用户名');
        return false
    }

    if(!(emailReg.test(email)) || email == ''){
        $('.edit-info-error').html('请填写你的邮箱');

    }

    if(birthDate==''){
        $('.edit-info-error').html('请选择你的出身日期');
        return false
    }

    if(stuName==''){
        $('.edit-info-error').html('请填写你的名字');
        return false

    }
    if(docName==''){
        $('.edit-info-error').html('请填写导师姓名');
        return false
    }

    if(!(/^1[3456789]\d{9}$/.test(phone))){
        $('.edit-info-error').html('请填写正确的电话号码');
        return false
    }
    if(address==''){
        $('.edit-info-error').html('请填写你的地址');
        return false
    }

    $.ajax({
        type: "POST",
        url: url +"Form/modifyUser",
        data: {
            username: userName,
            email: email,
            stuName: stuName,
            sex: sex,
            birthDate: birthDate,
            school: school,
            userID: userId,
            docName: docName,
            phone: phone,
            address: address
        },
        dataType: 'json',
        success: function (data) {
            if (data.status == 1) {
                alert('修改成功');
                window.location.reload();
            } else {
                // $('.user-person-info').append('<div class="pwd-error">'+data.info+'</div>');
                alert(data.info);
                return false;
            }
        },
        error: function () {
            alert('网路不给力，请稍候再试');
        }

    })
}

//渲染修改密码
function renderPwd(username, flag) {
    var rhtml = [];
    rhtml.push('<div class="user-detail-pwd-list">');
    rhtml.push('<p><label>旧密码</label><input type="password" class="user-old-pwd"/> <span class="old-pwd-error pwd-error"></span></p>');
    rhtml.push('<p> <label>新密码</label><input type="password"  class="user-new-pwd"/> <span class="new-pwd-error pwd-error"></span></p>');
    rhtml.push(' <p> <label>确认密码</label><input type="password"  class="user-confirm-pwd"/> <span class="confirm-pwd-error pwd-error"></span></p>');
    rhtml.push('</div>');
    rhtml.push('<div class="pwd-edit-btn"> <span class="edit-btn-cancel">取消</span> <span class="edit-btn-confirm pwd-confirm">提交</span></div>');

    if(flag==1){
        $('.user-person-pwd').html(rhtml);
        //  $('.review-person-pwd').html(rhtml);
    }else if(flag==2){
        $('.edit-person-pwd').html(rhtml);
    }


    modifyPwd(username);
}

//修改密码
function modifyPwd(username) {
    $('.pwd-confirm').on('click', function () {
        var oldPwd = $('.user-old-pwd').val();
        var newPwd = $('.user-new-pwd').val();
        var cPwd = $('.user-confirm-pwd').val();

        if(oldPwd.length<6 || oldPwd == ''){
            $('.old-pwd-error').html('请填写你原来的密码');
            return false;
        }
        if(newPwd.length<6 || newPwd == ''){
            $('.new-pwd-error').html('请设置6位以上的密码');
            return false;
        }
        if(cPwd!=newPwd || cPwd==''){
            $('.confirm-pwd-error').html('请再次确认你的密码');
            return false;
        }

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
                    alert('设置成功');
                    window.location.reload();
                } else {
                   $('.user-detail-pwd-list').append('<p class="pwd-error">'+data.info+'</p>');

                    return false;
                }
            },
            error: function () {
                alert('网路不给力，请稍候再试');
            }

        })
    })

}

//申请成为审稿人
function applyReview(username){
    $('.user-person-apply').on('keydown', function () {
        $('pwd-error').html('');
    });
    $('.apply-btn-confirm').on('click', function () {
        var major = $.trim($('.val-major').val());
        var education = $.trim($('.val-education option:selected').val());
        var positio = $('.val-positio').val();
        var field = $('.val-field option:selected').val();
        var gain = $.trim($('.val-gain').val());
        var direction = $.trim($('.val-direction').val());
        var name = $.trim($('.val-name').val());
        var bank = $.trim($('.val-bank').val());
        var account = $.trim($('.val-account').val());
        var data ={
            username: username,
            major: major,
            education: education,
            positio: positio,
            field: field,
            gain: gain,
            direction: direction,
            name: name,
            bank: bank,
            account: account,
            target: 'audit'
        };
        if(major==''){
            $('.major-error').html('请填写你的专业');
            return false
        }
        if(positio==''){
            $('.positio-error').html('请填写你的职称');
            return false
        }
        if(direction==''){
            $('.direction-error').html('请填写你的研究方向');
            return false
        }
        if(name==''){
            $('.name-error').html('请填写持卡人姓名');
            return false
        }
        if(bank==''){
            $('.bank-error').html('请填写持卡人银行');
            return false
        }
        if(account==''){
            $('.account-error').html('请填写持卡账号');
            return false
        }

        $.ajax({
            type: "POST",
            url: url +"Form/applyIdentity",
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.status == 1) {
                    alert('提交成功，请等待审核');
                    window.location.reload();
                } else {
                    // $('.user-person-apply').append('<div class="pwd-error">'+data.info+'</div>');
                    alert(data.info);
                    return false;
                }
            },
            error: function () {
                alert('网路不给力，请稍候再试');
            }

        })
    })
}

//住宿登记
function resHotel(username) {
    var ok1=false;
    var ok2=false;
    var ok3=false;
    $('.val-hotel-name').focus(function(){
        $('.pwd-error').html('');
    }).blur(function(){
        var name = $.trim($('.val-hotel-name').val());
        if(name==''){
            $('.pwd-name-error').html('真实姓名');

        }else{
            $('.pwd-name-error').html('输入成功').addClass('res-success');
            ok1=true
        }
    });
    $('.val-hotel-phone').focus(function(){
        $('.pwd-error').html('');
    }).blur(function(){
        var phone = $.trim($('.val-hotel-phone').val());
        if(!(/^1[3456789]\d{9}$/.test(phone))){
            $('.pwd-phone-error').html('请填写11位数字的电话号码');

        }else{
            $('.pwd-phone-error').html('输入成功').addClass('res-success');
            ok2=true
        }
    });
    $('.val-card').focus(function(){
        $('.pwd-error').html('');
    }).blur(function(){
        var card = $.trim($('.val-card').val());
        if(card){
            $('.pwd-card-error').html('请填写你的身份证号');

        }else{
            $('.pwd-card-error').html('输入成功').addClass('res-success');
            ok3=true
        }
        });
    $('.hotel-btn-confirm').on('click', function () {
        if(ok1&&ok2&&ok3){
            var name =  $.trim($('.val-hotel-name').val());
            var sex = $('.doc-content-res-sex option:selected').val();//选中的值;
            var phone = $.trim($('.val-hotel-phone').val());
            var card = $.trim($('.val-card').val());
            $.ajax({
                type: "POST",
                url: url +"Manage/signForStay",
                data: {
                    username: username,
                    name: name,
                    sex: sex,
                    phone: phone,
                    card: card
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == 1) {
                        alert('登记成功');
                        window.location.reload();
                    } else {
                        $('.hotel-confirm-error').html(data.info);
                        return false;
                    }
                },
                error: function () {
                    alert('网路不给力，请稍候再试');
                }

            })
        }else {

        }
    })
}


// 审稿中心

//未审稿件
function noReviewData(data,username) {
    var ele= $('.no-already-review');
    var aTitles = [{id: 'docu_id', title: '稿件编号'},
        {id: 'chineseTitle', title: '标题'},
        {id: 'status', title: '稿件状态'},
        {id: 'allocate_time', title: '送审时间'},
        {id: 'audit_time', title: '审回时间'},
        {id: 'upload', title: '操作'},
    ];

    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 10});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    ele.html(aHtml);

    //点击稿件评价
    $('.no-already-review .contri-review-evaluate').on('click', function () {
        var _this = $(this);
        // ele.addClass('hide');
        var cid = _this.attr('data-id');
        popup.init();
        var tHtml = [],aHtml= [];
        tHtml.push('<span class="popup-title">审稿评价</span><i class="popup-close">x</i>');
        $('.popup-header').html(tHtml.join(''));
        aHtml.push(' <p style="height: 26px;line-height: 26px;"> <label>创新型:</label> <input type="radio" name="creative" value="很高">很高 <input type="radio" name="creative" value="较高">较高 <input type="radio" name="creative" value="一般">一般 <input type="radio" name="creative" value="低">低 </p>');
        aHtml.push('<p style="height: 26px;line-height: 26px;"><label>应用型:</label> <input type="radio" name="application" value="很高">很高<input type="radio" name="application" value="较高">较高 <input type="radio" name="application" value="一般">一般 <input type="radio" name="application" value="低">低 </p>');
        aHtml.push('<p style="height: 26px;line-height: 26px;"> <label>中文摘要写作水平:</label> <input type="radio" name="chinese-level" value="很高">很高 <input type="radio" name="chinese-level" value="较高">较高 <input type="radio" name="chinese-level" value="一般">一般 <input type="radio" name="chinese-level" value="低">低 </p>');
        aHtml.push('<p style="height: 26px;line-height: 26px;"> <label>英文摘要写作水平:</label> <input type="radio" name="english-level" value="很高">很高 <input type="radio" name="english-level" value="较高">较高 <input type="radio" name="english-level" value="一般">一般 <input type="radio" name="english-level" value="低">低 </p>');
        aHtml.push('<p style="height: 26px;line-height: 26px;"><label>论文总体评价:</label><input type="radio" name="evaluate" value="很好">很好 <input type="radio" name="evaluate" value="较好">较好 <input type="radio" name="evaluate" value="一般">一般 <input type="radio" name="evaluate" value="差">差 </p>');
        aHtml.push(' <p> <label style="float:left;">具体意见:</label> <textarea class="opinoin-text" name="" id="" cols="40" rows="5" placeholder="请做不少于25字的评价"></textarea> </p>');
        aHtml.push(' <p class="evalute-error" style="margin-top: 5px; color: #f00"></p>');
        $('.popup-edit').html(aHtml);
        $('.opinoin-text').on('keydown', function(){
            $('.evalute-error').html('');
        });
        popup.popupEvent(function() {
            ////审稿人评价操作
            var _this = $('.popup-confirm');
            var creative = $("input[name='creative']:checked").val();
            var application = $("input[name='application']:checked").val();
            var chineseLevel = $("input[name='chinese-level']:checked").val();
            var englishEevel = $("input[name='english-level']:checked").val();
            var evaluateRadio = $("input[name='evaluate']:checked").val();
            var evaluate = {
                creative: creative,
                application: application,
                chineseLevel: chineseLevel,
                englishEevel: englishEevel,
                evaluateRadio: evaluateRadio
            };
            var opinion = $('.opinoin-text').val();
            if(creative && application && chineseLevel&& englishEevel && evaluateRadio &&( opinion.length<25)){
                $('.evalute-error').html('请给每一项评价,并给出不少于25字的意见');
                return false
            }
            $.ajax({
                url: url + 'Document/audit',
                data: {
                    username: username,
                    document: cid,
                    evaluate: JSON.stringify(evaluate),
                    opinion: opinion
                },
                type: 'POST',
                dataType: 'json',
                before: function () {
                    _this.attr("disabled", true);
                    _this.css({"background": "#ccc"});
                },
                success: function (res) {
                    _this.attr("disabled", false);
                    _this.css({"background": "#20c2d2"});
                    if (res.status == 1) {
                        $('.popup').remove();
                        $('.popup-confirm').removeClass('confirming');
                        var page =ele.next().find('.current').not('.prev, .next').text(),
                            pagesize = 10;
                        noAlreadyReview(username,page,pagesize);
                        // window.location.reload();
                    } else {
                        $('.evalute-error').html(res.info);
                    }
                },
                error: function () {
                    _this.attr("disabled", false);
                    _this.css({"background": "#20c2d2"});
                    $('.evalute-error').html('服务器开小差，请重试');
                }
            });
        });
    });



    //下载稿件
    $('.contri-upload').on('click', function () {
        var cid = $(this).attr('data-id');
        window.open('http://ndac.env.tsinghua.edu.cn' + '/app/data/'+cid+'.tar.gz');
        // window.open('http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099' + '/app/data/'+cid+'.tar.gz');
    });

}



//已审稿件
function alreadyReviewData(data,username) {
    var ele= $('.already-review');
    var aTitles = [{id: 'docu_id', title: '稿件编号'},
        {id: 'chineseTitle', title: '标题'},
        {id: 'status', title: '稿件状态'},
        // {id: 'allocate_time', title: '送审时间'},
        {id: 'audit_time', title: '审回时间'},
        {id: 'view', title: '意见'},
    ];

    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 10});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
    ele.html(aHtml);

    //点击查看审核意见
    $('.already-review .contri-see').on('click', function () {
        var _this = $(this);
        var cid = _this.attr('data-id');
        showOpinion(username,cid)


    });
}


//编辑中心

//审稿名单数据获取
function nameListData(username)  {
    $.ajax({
        type: "POST",
        url:  url +"Form/showAuditUser",
        data: {
            username: username,
        },
        dataType: 'json',
        success: function (res) {
            if (res.status == 1) {
                var nameDatas = res.data;
                var ele= $('.name-list');
                if (nameDatas.length > 0) {
                
                    var aTitles = [{id: 'name', title: '姓名'},
                        {id: 'positio', title: '职称'},
                        {id: 'school', title: '院校'},
                        {id: 'field', title: '研究主题'},
                    ];
                    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: nameDatas, maxline: 30});
                    var aHtml = [];
                    aHtml.push(oNewTable.init());
                    ele.html(aHtml);

                } else {
                    ele.html('暂无数据');

                }
            }else {
                console.log(res.info);
            }
        }
    });
}




//待分配稿件
function noAlreadyAllocateData(adatas,username) {
    var nameDatas=[];
    var defaultEle = $('.edit-no-allocate-default');
    var ele= $('.edit-no-allocate');
    var siblingEle= $('.edit-no-allocate-detail');
    if(adatas.length>0){
        var aTitles = [
            {id: 'docu_id', title: '稿件编号'},
            {id: 'username', title: '用户名'},
            {id: 'chineseTitle', title: '标题'},
            {id: 'create_time', title: '投稿时间'},
            // {id: 'status', title: '稿件状态'},
            {id: 'distribution', title: '稿件分配'},
            {id: 'operate', title: '稿件操作'},
        ];

        var oNewTable = new CreateTable({aTitles: aTitles, aDatas: adatas, maxline: 10});
        var aHtml = [];
        aHtml.push(oNewTable.init());
        // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
        ele.html(aHtml);

        // //点击某一个标题进入当前稿件的详情
        // $('.edit-no-allocate .contri-title').on('click', function () {
        //     var _this = $(this);
        //     defaultEle.addClass('hide');
        //     siblingEle.removeClass('hide');
        //     var id = _this.attr('data-id');
        //     //请求当前稿件详情接口
        //     $.ajax({
        //         type: "POST",
        //         url: url + "Document/showById",
        //         data: {
        //             username: username,
        //             docu_id: id
        //         },
        //         dataType: 'json',
        //         success: function (data) {
        //             if(data.status==1){
        //                 var data  =data.data[0];
        //                 personContri(data,ele,siblingEle)
        //             }else {
        //                 alert(data.info);
        //             }
        //         },
        //         error: function () {
        //             alert('请重试');
        //         }
        //
        //     });
        //
        //
        // });


        $.ajax({
            type: "POST",
            url: url + "Form/showAuditUser",
            data: {
                username: username,
            },
            dataType: 'json',
            success: function (res) {
                if (res.status == 1) {
                    var data = res.data;
                    if (data.length > 0) {
                        nameDatas=data;
                    }
                }
            }
        });
        //点击分配审稿人
        $('.edit-no-allocate .contri-distribution').on('click', function () {
            var _this = $(this);
            var cid = _this.attr('data-id');
            popup.init();
            var tHtml = [],aHtml= [];
            tHtml.push('<span class="popup-title">审稿人名单</span><i class="popup-close">x</i>');
            $('.popup-header').html(tHtml.join(''));
            if(nameDatas.length>1){
                var aTitles = [
                    {id: 'checkBox', title: '分配'},
                    {id: 'username', title: '姓名'},
                    // {id: 'positio', title: '职称'},
                    {id: 'school', title: '院校'}
                ];
                for(var i =0; i<nameDatas.length;i++){
                    var curData = nameDatas[i];
                    curData.checkBox = '<input type="checkbox" class="contri-checkbox" name="namelist" value="'+curData.username+'"/>';
                }
                var oNewTable = new CreateTable({aTitles: aTitles, aDatas: nameDatas, maxline: 30});

                aHtml.push(oNewTable.init());
            } else {
                aHtml = '缺少审稿人';
            }
            $('.popup-edit').html(aHtml);
            popup.popupEvent(function () {
                var _this= $('.popup-confirm');
                var target = [];
                var num=0;
                $('input[name="namelist"]:checked').each(function(i){
                    num++;
                    target.push($(this).val());
                });
                if(num==2){
                    $.ajax({
                        type: "POST",
                        url:  url +"Document/distribute",
                        data: {
                            username: username,
                            document: cid,
                            target: target.join(',')
                        },
                        dataType: 'json',
                        beforeSend: function () {
                            _this.attr('disabled', 'disabled');
                            _this.css({"background": "#ccc"});
                        },
                        success: function (data) {
                            if (data.status == 1) {
                                $('.popup').remove();
                                var page =ele.next().find('.current').not('.prev, .next').text(),
                                    pagesize = 10;
                                noAlreadyAllocate(username,page,pagesize);
                                // window.location.reload();
                            } else {
                                alert(data.info);
                            }
                        },
                        complete: function () {
                            _this.removeAttr('disabled');
                            _this.css({"background": "#388e3c"});
                        },
                        error: function () {
                            alert('服务器开小差，请稍候再试');
                        }
                    })
                }else {
                    alert('有且仅能选择两个审稿人')
                }
            });

        });


        // 编辑操作
        $('.edit-no-allocate .contri-operate').on('click', function () {
            var _this = $(this);
            var cid = _this.attr('data-id');
            popup.init();
            var tHtml = [],aHtml= [];
            tHtml.push('<span class="popup-title">稿件审核</span><i class="popup-close">x</i>');
            $('.popup-header').html(tHtml.join(''));
            aHtml.push('<p><label>选择：</label><select class="operate-status"><option value="5">拒稿</option></select>');
            $('.popup-edit').html(aHtml);
            popup.popupEvent(function () {
                var _this= $('.popup-confirm');
                var status = $('.operate-status option:selected').val();
                $.ajax({
                    type: "POST",
                    url:  url +"Document/handle",
                    data: {
                        username: username,
                        document: cid,
                        status: status
                    },
                    dataType: 'json',
                    beforeSend: function () {
                        _this.attr('disabled', 'disabled');
                        _this.css({"background": "#ccc"});
                    },
                    success: function (data) {
                        if (data.status == 1) {
                            $('.popup').remove();
                            var page =ele.next().find('.current').not('.prev, .next').text(),
                                pagesize = 10;
                            noAlreadyAllocate(username,page,pagesize);
                            // window.location.reload();
                        } else {
                            alert(data.info);

                        }
                    },
                    complete: function () {
                        _this.removeAttr('disabled');
                        _this.css({"background": "#388e3c"});
                    },
                    error: function () {
                        alert('服务器开小差，请稍候再试');
                    }
                })
            });

        });
    }else {
        ele.html('暂无数据')
    }

}

//已分配稿件
function alreadyAllocateData(data,username) {
    var ele= $('.edit-allocate');
    var aTitles = [{id: 'docu_id', title: '稿件编号'},
        {id: 'chineseTitle', title: '标题'},
        {id: 'status', title: '稿件状态'},
        {id: 'audit_user', title: '审稿人'},
        {id: 'operate', title: '稿件操作'},
        {id: 'view', title: '审稿意见'},
        {id: 'fullText', title: '全文下载'},
        {id: 'poster', title: '海报下载'},
    ];

    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 10});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
    ele.html(aHtml);

    // 编辑操作
    $('.edit-allocate .contri-operate').on('click', function () {
        var _this = $(this);
        var cid = _this.attr('data-id');
        popup.init();
        var tHtml = [],aHtml= [];
        tHtml.push('<span class="popup-title">稿件审核</span><i class="popup-close">x</i>');
        $('.popup-header').html(tHtml.join(''));
        aHtml.push('<p><label>选择：</label><select class="contri-operate-status"><option value="4">采纳</option><option value="6">返修</option><option value="5">拒稿</option></select>');
        $('.popup-edit').html(aHtml);
        popup.popupEvent(function () {
            var _this= $('.popup-confirm');
            var status = $('.contri-operate-status option:selected').val();
            $.ajax({
                type: "POST",
                url:  url +"Document/handle",
                data: {
                    username: username,
                    document: cid,
                    status: status
                },
                dataType: 'json',
                beforeSend: function () {
                    _this.attr('disabled', 'disabled');
                    _this.css({"background": "#ccc"});
                },
                success: function (data) {
                    if (data.status == 1) {
                        $('.popup').remove();
                        var page =ele.next().find('.current').not('.prev, .next').text(),
                            pagesize = 10;
                        alreadyAllocate(username,page,pagesize);
                        // window.location.reload();
                    } else {
                        alert(data.info);

                    }
                },
                complete: function () {
                    _this.removeAttr('disabled');
                    _this.css({"background": "#388e3c"});
                },
                error: function () {
                    alert('服务器开小差，请稍候再试');
                }
            })
        });

    });
    //点击查看审核意见
    $('.edit-allocate .contri-see').on('click', function () {
        var _this = $(this);
        var cid = _this.attr('data-id');
        showOpinion(username,cid)
    });

    //下载全文
    $('.edit-allocate .contri-upload-fulltext').on('click', function () {
        var cid = $(this).attr('data-id');
        window.open('http://ndac.env.tsinghua.edu.cn' + '/app/data/'+cid+'.quanwen.tar.gz');
        // window.open('http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099' + '/app/data/'+cid+'.quanwen.tar.gz');
    });
    //下载海报
    $('.edit-allocate .contri-upload-poster').on('click', function () {
        var cid = $(this).attr('data-id');
        window.open('http://ndac.env.tsinghua.edu.cn' + '/app/data/'+cid+'.haibao.tar.gz');
        // window.open('http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099' + '/app/data/'+cid+'.haibao.tar.gz');
    });

}


//管理员中心



//时间编辑
function dateEdit(username) {
    var flag= false;
    $('.date-edit-start').on('click', function () {
        $('.manage-date input').attr('disabled', false);
        flag = true;
    });
    $('.manage-date-confirm').on('click', function(){
        if(flag){
            var dateDatas = {};
            dateDatas.paperEnd =$.trim($('.manage-date-paper-end').val());
            dateDatas.paperHire =$.trim($('.manage-date-paper-hire').val());
            dateDatas.allPaperEnd =$.trim($('.manage-date-allpaper-end').val());
            dateDatas.allPaperDate =$.trim($('.manage-date-allpaper-day').val());
            $.ajax({
                type: "POST",
                url: url + "Manage/modify",
                data: {
                    username: username,
                    content: 'date',
                    value: JSON.stringify(dateDatas)
                },
                dataType: 'json',
                success: function (data) {
                    if(data.status==1){
                        $('.manage-date input').attr('disabled', true);
                        flag = false;
                        window.location.reload();
                    }else {
                        console.log(data.info);
                    }
                }

            });
        }
    });
    $('.manage-date-cancel').on('click', function () {
        $('.manage-date input').attr('disabled', true);
        flag = false;
    })
}


//news编辑
function newsEdit(username) {
    //最新消息编辑
    $('.manage-news-confirm').on('click', function () {
        var newUrl = $.trim($('.manage-news-edit-url').val());
        var newTitle = $.trim($('.manage-news-edit-title').val());
        var newsData = [
            {
                value: newUrl,
                text: newTitle,
            }
        ];
        if(newUrl==''){
            $('.manage-news-error').html('请填写地址');
            return false
        }
        if(newTitle==''){
            $('.manage-news-error').html('请填写名称');
            return false
        }
        $.ajax({
            type: "POST",
            url: url + "Manage/setMessage",
            data: {
                username: username,
                value: JSON.stringify(newsData)
            },
            dataType: 'json',
            success: function (data) {
                if(data.status==1){
                    window.location.reload();
                }else {
                    $('.manage-news-error').html(data.info);
                    // console.log(data.info);
                }
            }
        });
    });
    $('.manage-news-edit input').on('keydown', function () {
        $('.manage-news-error').html('');
    })

}


//轮播图片编辑
function bannerEdit(data,username) {
    var ele= $('.manage-banner-table');
    var aTitles = [{id: 'img_title', title: '图片名'},
        {id: '_imgSrc', title: '图片地址'},
        // {id: 'imgEdit', title: '图片编辑'}
    ];
    for(var i = 0; i<data.length;i++){
        var curImg = data[i];
        curImg.img_title = '图片'+(i+1);
        // curImg.imgSrc = curImg.imgSrc;
        curImg._imgSrc = '<input type="text" class="manage-banner-src" value="'+ curImg.imgSrc+'"/>';
        // curImg.imgEdit = '<span class="manage-banner-imgEdit" data-src="'+ curImg.imgSrc+'"></span> ';
    }
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 15});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
    ele.html(aHtml);
    $('.manage-banner-confirm').on('click',function () {
        var imgDatas = [];
        $('.manage-banner-src').each(function (i) {
            var _this = $(this).val();
            var item = {
                imgSrc: _this,

            };
            imgDatas.push(item);
        });
        $.ajax({
            type: "POST",
            url: url + "Manage/modify",
            data: {
                username: username,
                content: 'banner',
                value: JSON.stringify(imgDatas)
            },
            dataType: 'json',
            success: function (data) {
                if(data.status==1){

                }else {

                }
            }
        });
    });
}

function imgAdd(data,username) {
    $('.manage-banner-add').on('click', function () {
        var imgItemSrc =  {
            imgSrc: $('.manage-banner-edit-url').val(),
            text: "111"
        };
        data.push(imgItemSrc);
        $('.manage-banner-edit-url').val('');
        bannerEdit(data,username);
    });
}

//住宿人员名单
function checkStay(username, page, pagesize) {
    $.ajax({
        type: "POST",
        url: url + "Manage/checkStay",
        data: {
            username: username,
            pagesize: pagesize || '10',
            page: page || '1'
        },
        dataType: 'json',
        success: function (res) {
            if(res.status==1){
                var data = res.data;
                if(data.length>0){
                    var pageEle =$('.page .stay-contribution');
                    renderStay(data);
                    stayPagination(pageEle,res.info, pagesize,username)

                }else {
                    $('.manage-stay-list').html('暂无数据');
                }

            }else {
                console.log(res.info);
            }
        }

    });
}

function renderStay(data){
    var ele =$('.manage-stay-list');
    var aTitles = [{id: 'name', title: '姓名'},
        {id: 'sex', title: '性别'},
        {id: 'phone', title: '电话'},
        {id: 'card', title: '身份证号'},

    ];
    for(var i=0; i<data.length;i++){
        var curStay = data[i];
        curStay.sex = curStay.sex ? '男': '女';
    }
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 10});
    var aHtml = [];
    aHtml.push(oNewTable.init());

    ele.html(aHtml);
}

//编辑人员名单
function showEditor(username) {
    var ele =$('.manage-editor-list');
    $.ajax({
        type: "POST",
        url: url + "Form/showEditor",
        data: {
            username: username,
        },
        dataType: 'json',
        success: function (res) {
            if(res.status==1){
                var data = res.data;
                if(data &&data.length>0){
                    var aTitles = [{id: 'username', title: '用户名'},
                        {id: 'email', title: '邮箱'},

                    ];
                    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 20});
                    var aHtml = [];
                    aHtml.push(oNewTable.init());
                    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
                    ele.html(aHtml);
                }else {
                    ele.html('暂无数据')
                }


            }else {
                console.log(res.info);
            }
        }

    });
}

//申请审稿人名单
function manageReview(username, page, pagesize) {
    $.ajax({
        type: "POST",
        url: url + "Manage/showApply",
        data: {
            username: username,
            pagesize: pagesize || '10',
            page: page|| '1'
        },
        dataType: 'json',
        success: function (res) {
            if(res.status==1){
                var data = res.data;
               if(data.length>0){
                   var ele = $('.page .manage-allocate-contribution');
                   renderManageReview(data, username);
                   reviewPagination(ele,res.info, pagesize,username)
               }else {
                   $('.manage-edit-allocate').html('暂无数据')
               }
            }else {
                console.log(res.info);
            }
        }

    });

}

function renderManageReview(data, username){
    var ele = $('.manage-edit-allocate');
    var aTitles = [{id: 'name', title: '姓名'},
        {id: 'major', title: '专业'},
        {id: 'education', title: '学历'},
        {id: 'positio', title: '职称'},
        {id: 'direction', title: '研究方向'},
        {id: 'field', title: '研究主题'},
        {id: 'gain', title: '研究成果'},
        {id: 'operate', title: '操作'},
    ];
    for(var i=0;i<data.length;i++){
        var curItem = data[i];
        curItem.operate = '<span class="manage-operate" data-target="'+curItem.username+'">操作</span>';
        curItem.gain = curItem.gain || '暂无';
        curItem.major =  curItem.major || '--';
        curItem.education =  curItem.education || '暂无';
        curItem.positio =  curItem.positio || '暂无';
        curItem.direction =  curItem.direction || '暂无';
        curItem.gain =  curItem.gain || '暂无';
        curItem.field =  curItem.field || '暂无';
        curItem.name =  curItem.name || curItem.username;
    }
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 20});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
    ele.html(aHtml);

    $('.manage-operate').on('click', function () {
        var _this = $(this);
        var target =_this.attr('data-target');
        popup.init();
        var tHtml = [],aHtml= [];
        tHtml.push('<span class="popup-title">审核</span><i class="popup-close">x</i>');
        $('.popup-header').html(tHtml.join(''));
        aHtml.push('<p><label>选择：</label><select class="operate-auth"><option value="audit">采纳</option><option value="contribute">拒绝</option><option class="hide" value="editor">编辑</option><option class="hide" value="manager">管理员</option></select>');
        $('.popup-edit').html(aHtml);
        popup.popupEvent(function () {
            var _this= $('.popup-confirm');
            var value = $('.operate-auth option:selected').val();
            $.ajax({
                type: "POST",
                url:  url +"Manage/auth",
                data: {
                    username: username,
                    value: value,
                    target: target
                },
                beforeSend: function () {
                    _this.attr('disabled', 'disabled');
                    _this.css({"background": "#ccc"});
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == 1) {
                        $('.popup').remove();
                        var page =ele.next().find('.current').not('.prev, .next').text(),
                            pagesize = 10;
                        manageReview(username,page,pagesize);
                        // window.location.reload();
                    } else {
                        alert(data.info);

                    }
                },
                complete: function () {
                    _this.removeAttr('disabled');
                    _this.css({"background": "#388e3c"});
                },
                error: function () {
                    alert('服务器开小差，请稍候再试');
                }
            })
        });

    })
}

//稿件查询分页
function initPagination(ele,total, page, pagesize,username,flag,type) {
    ele.pagination(total, {
        num_edge_entries: 1, //两侧首尾分页条目数
        num_display_entries: 4, //连续分页主体部分分页条目数
        items_per_page: pagesize, //每页显示条数
        current_page: page-1, //当前页索引
        //callback: home.clickPaination  //翻页回调
        callback: function () {
            if (ele.find(".current.prev").length == 1) {
                page = 1;
            } else if (ele.find(".current.next").length == 1) {
                page = Math.ceil(total / 10);
            } else {
                page = ele.find(".current").text();
            }
            $.ajax({
                url: url + "Document/show",
                type: "POST",
                data: {
                    username: username,
                    pagesize: 10,
                    page: page,
                    type: type
                },

                dataType: 'json',
                success: function (res) {
                    if (res.status == 1) {
                        if(res.data.length>0){
                            renderList(res, username, flag);
                        }

                    } else {
                        console.log(res.info);
                    }
                }
            });
        }
    });
}

//审稿人审核分页
function reviewPagination(ele,total, pagesize,username) {
    ele.pagination(total, {
        num_edge_entries: 1, //两侧首尾分页条目数
        num_display_entries: 4, //连续分页主体部分分页条目数
        items_per_page: pagesize, //每页显示条数
        // current_page: page, //当前页索引
        //callback: home.clickPaination  //翻页回调
        callback: function () {
            var page = 1;
            if (ele.find(".current.prev").length == 1) {
                page = 1;
            } else if (ele.find(".current.next").length == 1) {
                page = Math.ceil(total / 10);
            } else {
                page = ele.find(".current").text();
            }
            $.ajax({
                url: url + "Manage/checkStay",
                type: "POST",
                data: {
                    username: username,
                    pagesize: 10,
                    page: page,
                },

                dataType: 'json',
                success: function (res) {
                    if (res.status == 1) {
                        if(res.data.length>0){
                            renderManageReview(res.data, username);
                        }

                    } else {
                        console.log(res.info);
                    }
                }
            });
        }
    });
}

//住宿登记分页
function stayPagination(ele,total, pagesize,username) {
    ele.pagination(total, {
        num_edge_entries: 1, //两侧首尾分页条目数
        num_display_entries: 4, //连续分页主体部分分页条目数
        items_per_page: pagesize, //每页显示条数
        // current_page: page, //当前页索引
        //callback: home.clickPaination  //翻页回调
        callback: function () {
            var page = 1;
            if (ele.find(".current.prev").length == 1) {
                page = 1;
            } else if (ele.find(".current.next").length == 1) {
                page = Math.ceil(total / 10);
            } else {
                page = ele.find(".current").text();
            }
            $.ajax({
                url: url + "Manage/checkStay",
                type: "POST",
                data: {
                    username: username,
                    pagesize: 10,
                    page: page,
                },

                dataType: 'json',
                success: function (res) {
                    if (res.status == 1) {
                        if(res.data.length>0){
                            renderStay(res.data);
                        }

                    } else {
                        console.log(res.info);
                    }
                }
            });
        }
    });
}


function showCountDown(year, month, day) {
    var now = new Date();
    var endDate = new Date(year, month - 1, day);
    var leftTime = endDate.getTime() - now.getTime();
    var leftsecond = parseInt(leftTime / 1000);
    //var day1=parseInt(leftsecond/(24*60*60*6));
    var day1 = Math.floor(leftsecond / (60 * 60 * 24));
    var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
    var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
    var show = $('.hotel-res-date-down');
    var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);

    if((day1 <0) && (hour<0) && (minute<0)&& (second<0)){
        $('.hotel-btn-confirm').attr('disabled', 'disabled');
        $('.hotel-btn-confirm').css({"background": "#388e3c"});
        show.html("住宿登记已截止");
    } else{
        show.html("提示距离截止时间" + "还有：" + day1 + "天" + hour + "小时" + minute + "分" + second + "秒");
    }
}


//稿件状态

function statusData(data) {

    var ele= $('.manage-table-list');
    var aTitles = [{id: 'docu_id', title: '稿件编号'},
        {id: 'chineseTitle', title: '标题'},
        {id: 'status', title: '稿件状态'},
        {id: 'create_time', title: '投稿时间'},
    ];

    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 10});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
    ele.html(aHtml);
}
function statusManage(username, page, pagesize) {
    var flag =7;
    allDatas(username,pagesize, page,flag);
    $('.manage-status-data-all').on('click', function () {
        //请求稿件查询列表
        var _this = $(this);
        _this.addClass('on').siblings().removeClass('on');
        allDatas(username,pagesize, page,flag);
    });
    $('.manage-status-data-not-audit').on('click', function () {
        //请求稿件查询列表
        var _this = $(this);
        _this.addClass('on').siblings().removeClass('on');
        $.ajax({
            type: "POST",
            url:  url +"Document/show",
            data: {
                username: username,
                pagesize: pagesize || '10',
                page: page || '1',
                type: 'not_audit'
            },
            dataType: 'json',
            success: function (res) {
                if(res.status==1){
                    var data = res.data;
                    var ele =$('.page .manage-all-contribution');
                    var manageEle =$('.manage-table-list');
                    if(data.length>0) {

                        renderList(res, username,flag);
                        initPagination(ele, res.info, page, pagesize, username, flag, 'not_audit');

                    }else {
                        manageEle.html('暂无此类数据');
                        ele.html('');
                    }
                }else {
                    console.log(res.info);
                }
            }

        });
    });
    $('.manage-status-data-audit').on('click', function () {
        //请求稿件查询列表
        var _this = $(this);
        _this.addClass('on').siblings().removeClass('on');
        $.ajax({
            type: "POST",
            url:  url +"Document/show",
            data: {
                username: username,
                pagesize: pagesize || '10',
                page: page || '1',
                type: 'audit'
            },
            dataType: 'json',
            success: function (res) {
                if(res.status==1){
                    var data = res.data;
                    var ele =$('.page .manage-all-contribution');
                    var manageEle =$('.manage-table-list');
                    if(data.length>0) {
                        var flag = 1;
                        renderList(res, username,flag);
                        initPagination(ele, res.info, page, pagesize, username, flag, 'audit');

                    }else {
                        manageEle.html('暂无此类数据');
                        ele.html('');
                    }
                }else {
                    console.log(res.info);
                }
            }

        });
    });
    $('.manage-status-data-not-distribute').on('click', function () {
        //请求稿件查询列表
        var _this = $(this);
        _this.addClass('on').siblings().removeClass('on');
        $.ajax({
            type: "POST",
            url:  url +"Document/show",
            data: {
                username: username,
                pagesize: pagesize || '10',
                page: page || '1',
                type: 'not_distribute'
            },
            dataType: 'json',
            success: function (res) {
                if(res.status==1){
                    var data = res.data;
                    var ele =$('.page .manage-all-contribution');
                    var manageEle =$('.manage-table-list');
                    if(data.length>0) {
                        renderList(res, username,flag);
                        initPagination(ele, res.info, pagesize, username, flag, 'not_distribute');

                    }else {
                        manageEle.html('暂无此类数据');
                        ele.html('');
                    }
                }else {
                    console.log(res.info);
                }
            }

        });
    });
    $('.manage-status-data-distribute').on('click', function () {
        //请求稿件查询列表
        var _this = $(this);
        _this.addClass('on').siblings().removeClass('on');
        $.ajax({
            type: "POST",
            url:  url +"Document/show",
            data: {
                username: username,
                pagesize: pagesize || '10',
                page: page || '1',
                type: 'distribute'
            },
            dataType: 'json',
            success: function (res) {
                if(res.status==1){
                    var data = res.data;
                    var ele =$('.page .manage-all-contribution');
                    var manageEle =$('.manage-table-list');
                    if(data.length>0) {
                        renderList(res, username,flag);
                        initPagination(ele, res.info, page, pagesize, username, flag, 'distribute');

                    }else {
                        manageEle.html('暂无此类数据');
                        ele.html('');
                    }
                }else {
                    console.log(res.info);
                }
            }

        });
    })
}

function allDatas(username,pagesize,page,flag){
    $.ajax({
        type: "POST",
        url:  url +"Document/show",
        data: {
            username: username,
            pagesize: pagesize || '10',
            page: page || '1',
            type: 'all'
        },
        dataType: 'json',
        success: function (res) {
            if(res.status==1){
                var data = res.data;
                var ele =$('.page .manage-all-contribution');
                var manageEle =$('.manage-table-list');
                if(data.length>0) {
                    renderList(res, username,flag);
                    initPagination(ele, res.info, page, pagesize, username, flag, 'all');

                }else {
                    manageEle.html('暂无此类数据');
                    ele.html('');
                }
            }else {
                console.log(res.info);
            }
        }

    });
}