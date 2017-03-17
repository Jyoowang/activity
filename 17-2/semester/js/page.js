
Whole.isLoading=false;    //数据是否请求完成
Whole.uid=0;
Whole.Url='https://www.yuer24h.com/wechat/view/';
Whole.Url='https://www.yuer24h.com/wechat/view/';
var TrackApiUrl="https://www.yuer24h.com/webapi/API/Track/TrackReceive.ashx";

Whole.isApp=false;


$(document).ready(function(){


    Page.init();



})


var Page = {
    proid:0,
    btnTag:0,//当前按钮
    Sum:1,//数量
    selectTag:0,
    init:function(){

        Page.render();

        Page.bind();

        //获取购物车数量
        Page.getCarCount();

    },

    bind:function(){

        //去购物车
        $(".nowsetll,.shop-car").on('click',function(){ //跳转到购物车
            Tool.goToUrl({
                appUrl:{type:22},
                h5Url: Whole.Url + 'shoppingcart.html?uid=' + Whole.uid
            });
        });

        //添加购物车
        $('.addbtn .car').on('click',Page.AddShopCartEvent);
        //立即购买
        $('.addbtn .buy').on('click',Page.NowProBuyEvent);



        //隐藏产品规格选择
        $('.mask-layer').on('click',function(){
            $('.product-attr-box').hide();
        });


        //产品数量加减
        $(".add").on('touchstart', Page.addSum);
        $(".less").on('touchstart', Page.lessSum);
        //继续逛逛
        $(".thenStroll").on('click', function() {
            $(".popups_add").hide();
        });

        //点击回到顶部
        $('#returntop').click(function () {
            $("body").animate({scrollTop : '0px'}, 200);
        });

        //产品详情
        $('.product-box .item-img').click(function () {

            Tool.sendTrack(Whole.uid,'2017开学季',"click",'产品详情','产品详情');

            var proid= $(this).parent().attr('data-proid');
            Tool.goToUrl({
                appUrl:{type:11,typeName:proid},
                h5Url: Whole.Url + 'proshow.html?uid=' + Whole.uid + '&proid=' + proid
            });


        });

    },
    render:function(){

        var tit = Tool.locationObject();
    
        if(tit){

            if(tit['uid']){
                Whole.uid = tit['uid'];
            }
            if(tit['isApp']){
                Whole.isApp = true;
            }
        }

        Tool.sendTrack(Whole.uid,'2017开学季',"view",'page','2017开学季');
    },

    //添加购物车
    AddShopCartEvent:function(){
        Tool.sendTrack(Whole.uid,'2017开学季',"click",'添加购物车','添加购物车');
        Page.proid = $(this).parents('.product-box').attr('data-proid');
        console.log(Page.proid);
        // $('.product-attr-box').show();
        Page.btnTag = 1;
        Page.getProDetail();
    },
    //立即购买
    NowProBuyEvent:function(){
        Tool.sendTrack(Whole.uid,'2017开学季',"click",'立即购买','立即购买');
        Page.proid = $(this).parents('.product-box').attr('data-proid');
        console.log(Page.proid);
        // $('.product-attr-box').show();
        Page.btnTag = 2;
        Page.getProDetail();
    },

    //获取产品详情
    getProDetail:function(){

        var data = {
            UserID: Whole.uid,
            ProductID: Page.proid,
            SpreadID: 0,
            SpreadType: 0,
        }

        Whole.isLoading = true;

        Tool.firstAjax({
            isload:{loadVal:true},
            url:'/app/Mall_HomeApi/GetProductDetatil2',
            value:data,
            success:function(value){

                Whole.isLoading = false;

                Page.ProData = value;

                if(!value.IsSale){ //产品是否下架 true 已下架
                    // proComponent.pushShelfHtml(value)
                }else{
                    Page.pushProInfo(value);
                    Page.processEvent();
                }
            }
        })

    },
    //控制按钮事件
    processEvent:function(){
        Page.Sum=1;

        if(Page.btnTag==1){ //加入购物车
            if(Page.judgmentSpecification()){
                Page.AddShopCart();
            }else{
                if(!Page.selectTag){
                    $('.sumAnd').html(Page.Sum);
                    $('.product-attr-box').show();

                    // shopHide();
                    $(".col-define").off('click');
                    $('.col-define').on('click', function(){Page.isButtonEvent(1)});
                }else{
                    popupsUtil.init({
                        msgText:'请选择规格',
                        yesEvent:function(){
                            return;
                        },
                        noEvent:function(){
                            console.log('取消');
                        }
                    })
                }
            }

        }else if(Page.btnTag==2){ //立即购买
            if(Page.judgmentSpecification()){
                Page.NowProBuy();
            }else{
                if(!Page.selectTag){
                    // shopHide();
                    $('.sumAnd').html(Page.Sum);
                    $('.product-attr-box').show();

                    $(".col-define").off('click');
                    $('.col-define').on('click', function(){Page.isButtonEvent(0)});
                }else{
                    popupsUtil.init({
                        msgText:'请选择规格',
                        yesEvent:function(){
                            return;
                        },
                        noEvent:function(){
                            console.log('取消');
                        }
                    })
                }
            }
        }

    },
    //加入购物车
    AddShopCart:function () {
        var keys = [];
        for (var key in Page.currentAttr) {
            if (Page.currentAttr[key]) {
                keys.push(Page.currentAttr[key]);
            }
        }

        var data = {
            UserID: Whole.uid,
            ProductID: Page.proid,
            AIDs: String(keys[0].AID) + "," + String(keys[1].AID),
            Pcount: Page.Sum,
            SpreadID: 0,
            SpreadType: 0,
            PackAgeID: 0, //是否为试用产品 默认为0,
            CourseID: 0,
        }

        var isloadObj = {
            loadVal:true,
            loadView:{
                loadText:false, // false   字符串
                isTransparent:true  //布尔值
            }
        }

        Whole.isLoading = true;

        Tool.firstAjax({

            isload: isloadObj, //页面load

            url:'/app/Mall_HomeApi/GetAddShopCart',

            value:data,

            success:function(value){

                Whole.isLoading = false;

                if (value.ResultCode == 1) {
                    $(".mask-layer").click();
                    //购物车数量
                    $(".shop-car span").html(value.ShopCartCount);
                    $(".popups_add").show();
                } else if (value.ResultCode == 100) {

                }
            }                   
        })
    },



    //立即购买
    NowProBuy:function () {
        var keys = [];
        for (var key in Page.currentAttr) {
            if (Page.currentAttr[key]) {
                keys.push(Page.currentAttr[key]);
            }
        }

        var data = {
            UserID: Whole.uid,
            ProductID: Page.proid,
            AIDs: String(keys[0].AID) + "," + String(keys[1].AID),
            Pcount: Page.Sum,
            SpreadID: 0,
            SpreadType: 0,
            PackAgeID: 0, //是否为试用产品 默认为0,
            CourseID: 0,
        }

        Whole.isLoading = true;

        Tool.firstAjax({
            isload:{loadVal:false}, //页面load
            url:'/app/Mall_HomeApi/GetOneKeyProductBuy',
            value: data,
            success:function(value){

               Whole.isLoading = false;

                if (value.ResultCode == 100) {
                    popupsUtil.init({
                        msgText:value.ResultMessage,
                        yesEvent:function(){
                            return;
                        },
                        noEvent:function(){
                            console.log('取消');
                        }
                    })
                }else{
                    var josn = Tool.getString(value,'Json');

                    Tool.SessionAttr.setSwssionAttr('jsonstring',josn);
                   
                    var josnObj = JSON.parse(josn);


                    Tool.goToUrl({
                        appUrl:{type:77,typeName:josnObj},
                        h5Url: Whole.Url + 'clearing.html?uid=' + Whole.uid 
                    });
                }
            }
        })
   

    },

    //
    judgmentSpecification:function(){
        if(!Whole.uid){
            Tool.isApp(function(){
                Tool.goToUrl({
                    appUrl:{type:76,typeName:Page.proid},
                });
            })
            return false;
        }

        var keys = [];
        for (var key in Page.currentAttr) {
            if (Page.currentAttr[key]) {
                keys.push(Page.currentAttr[key])
            }
        }
        if (keys.length == 2) {
            return true;
        }else{
            return false
        }
    },
    isButtonEvent:function (tag){ //0 立即购买 1添加购物车
        if(Page.judgmentSpecification()){
            if(tag){
                Page.AddShopCart();
            }else{
                Page.NowProBuy();
            }
        }else{
            popupsUtil.init({
                msgText:'请选择规格',
                yesEvent:function(){
                    return;
                },
                noEvent:function(){
                    console.log('取消');
                }
            })
        }
    },

    pushProInfo:function(value){

        //当前选择的规格
        Page.currentAttr = {}

        //规格数据
        Page.AttrData = value.Attrs;

        //库存
        Page.StocksList = {};

        Page.currPrice = value.StocksList[0]; //最小价格
        Page.earm = value.StocksList[0].Price; //最大分享赚
        Page.stock = 0; //总库存

        for (var i = 0; i < value.StocksList.length; i++) {
            var tempObj = value.StocksList[i];
            if (Page.currPrice.Price > tempObj.Price) {
                Page.currPrice = tempObj
            }
            if (Page.earm < tempObj.Price) {
                Page.earm = tempObj.Price
            }

            Page.stock += tempObj.Num
            Page.StocksList[tempObj.Specifications] = tempObj;
        }

        if (Page.AttrData) {
            if (Page.AttrData.length > 1) {
                var temp = Page.AttrData[0];
                var tempAr = temp["AttrValues"];
                if (tempAr.length > 0) {
                    var sel1 = tempAr[0];
                    Page.currentAttr[temp["AttID"]] = sel1;
                    var temp2 = Page.AttrData[1];
                    var tempAr2 = temp2["AttrValues"];
                    if (tempAr2.length == 1) {
                        var sel2 = tempAr2[0];
                        var tempNum = Page.getStocksInfo(sel1["AID"], sel2["AID"]);
                        if (tempNum && tempNum["Num"] > 0) {
                            Page.currentAttr[temp2["AttID"]] = sel2;
                        }
                    }
                    //计算当前最小价格
                    Page.currentMinPrice()
                }
            }

            // console.log(Page.currentAttr)

            //规格信息
            if (value.Attrs.length) {
                Page.pushAttrsHtml()
            }

        }

        var w = parseInt($(window).width()*0.4);
        var h = parseInt($(window).width()*0.38*0.9);

        $('.pro-info .pro-img').css({height:h+'px'})
        $('.pro-info .pro-img img').attr('src',Tool.getPicUrl(value.PicDomain + value.SmallImg,w,h));


    },

    //计算当前最小价格
    currentMinPrice:function (){
        var keys = [];

        for (var key in Page.currentAttr) {
            if (Page.currentAttr[key]) {
                keys.push(key);
            }
        }
        // console.log(keys);
        // console.log(Page.StocksList);
        if(keys.length==0){
            Page.stock=0;
            for (var key in Page.StocksList) {
                var tempObj = Page.StocksList[key];
                if (Page.currPrice.Price > tempObj.Price) {
                    Page.currPrice = tempObj
                }

                Page.stock += tempObj.Num
            }
        }else if(keys.length==1){
            var AID = Page.currentAttr[keys[0]].AID;
            var stockAr=[];
            for (var key in Page.StocksList) {
                if(key.indexOf(AID)!=-1){
                    // if()
                    stockAr.push(Page.StocksList[key]);
                }
            }

            // console.log(stockAr);

            if(stockAr.length){
                Page.currPrice = stockAr[0];
                Page.stock=0;
                for(var i=0; i<stockAr.length; i++){
                    if (Page.currPrice.Price > stockAr[i].Price) {
                        Page.currPrice = stockAr[i]
                    }

                    Page.stock += stockAr[i].Num
                }
            }
            // console.log(Page.currPrice);
            // console.log(Page.stock);
        }




    },

    selectAttrs:function (attrObj, attid) {
        if (Page.currentAttr[attid] && Page.currentAttr[attid].AID == attrObj.AID) {
            Page.currentAttr[attid] = null;
        } else {
            Page.currentAttr[attid] = attrObj;
        }

        Page.pushAttrsHtml()
    },

    getStocksInfo:function (aid1, aid2) {
        if (Page.StocksList[aid1 + "," + aid2]) {
            return Page.StocksList[aid1 + "," + aid2];
        } else if (Page.StocksList[aid2 + "," + aid1]) {
            return Page.StocksList[aid2 + "," + aid1];
        } else {
            return false;
        }
    },


    //产品规格
    pushAttrsHtml:function () {

        var keys = [];

        for (var key in Page.currentAttr) {
            if (Page.currentAttr[key]) {
                keys.push(key);
            }
        }
        // console.log(keys)
        var str = '';
        var str1 = '';

        for (var i = 0; i < Page.AttrData.length; i++) {

            var tempAttr = Page.AttrData[i];

            str += '<div class="param-box" >'
            str += '<p>' + tempAttr.AName + '</p>'
            str1 += '<em>' + tempAttr.AName + '</em>'
            str += '<div class="row" data-id="' + i + '">'

            for (var j = 0; j < tempAttr.AttrValues.length; j++) {
                var tempObj = tempAttr.AttrValues[j];
                if (Page.currentAttr[tempAttr.AttID] && tempObj.AID == Page.currentAttr[tempAttr.AttID].AID) {
                    str += '<span class="active"'
                } else {
                    if (keys.length <= 0) {
                        str += '<span '
                    } else if (keys.length == 1) {
                        if (keys[0] == tempAttr.AttID) {
                            str += '<span '
                        } else {
                            var tempStock = Page.getStocksInfo(Page.currentAttr[keys[0]].AID, tempObj.AID);
                            if (tempStock) {
                                if (tempStock.Num > 0) {
                                    str += '<span '
                                } else {
                                    str += '<span class="cur"'
                                }
                            } else {
                                str += '<span class="cur"'
                            }
                        }
                    } else if (keys.length == 2) {
                        var tempAttrs = '<span ';
                        if (keys[0] != tempAttr.AttID) {
                            var tempStock = Page.getStocksInfo(Page.currentAttr[keys[0]].AID, tempObj.AID);
                            if (tempStock) {
                                if (tempStock.Num > 0) {
                                    tempAttrs = '<span '
                                } else {
                                    tempAttrs = '<span class="cur"'
                                }
                            } else {
                                tempAttrs = '<span class="cur"'
                            }
                        }
                        if (keys[1] != tempAttr.AttID) {
                            var tempStock = Page.getStocksInfo(Page.currentAttr[keys[1]].AID, tempObj.AID);
                            if (tempStock) {
                                if (tempStock.Num > 0) {
                                    tempAttrs = '<span '
                                } else {
                                    tempAttrs = '<span class="cur"'
                                }
                            } else {
                                tempAttrs = '<span class="cur"'
                            }
                        }
                        str += tempAttrs;
                    };
                }
                str += 'data-id="' + j + '">' + tempObj.AValue + '<i></i></span>'
            }

            str += '</div>'
            str += '</div>'
        }

        $(".attr-boxs").html(str)
        $(".attr-boxs .param-box span").off('click')
        $(".attr-boxs .param-box span").on('click', function() {

            if (!$(this).hasClass('cur')) {
                var _thisJ = $(this).attr('data-id')
                var _thisI = $(this).parent().attr('data-id')

                // console.log(_thisJ,_thisI)
                Page.selectAttrs(Page.AttrData[_thisI].AttrValues[_thisJ], Page.AttrData[_thisI].AttID)
            }

        })


        //计算当前最小价格
        Page.currentMinPrice();

        var currPrice, stock, strTxt;
        var pdd = '请'

        // console.log(Page.currentAttr)
        if (keys.length == 2) {

            var dds = Page.getStocksInfo(Page.currentAttr[keys[0]].AID, Page.currentAttr[keys[1]].AID)
            // console.log(dds)
            currPrice = dds.Price;
            stock = dds.Num;
            strTxt = '<em>"' + Page.currentAttr[keys[0]].AValue + '"</em><em>"' + Page.currentAttr[keys[1]].AValue + '"</em></span>'

            pdd = '已'
            // proComponent.calculatePrice(dds)

        } else if (keys.length == 1) {
            // console.log(Page.currPrice)
            currPrice = Page.currPrice.Price;
            stock = Page.stock;
            if (Page.AttrData[0].AttID == keys[0]) {
                strTxt = '<em>"' + Page.AttrData[1].AName + '"</em>'
            } else {
                strTxt = '<em>"' + Page.AttrData[0].AName + '"</em>'
            }
            // proComponent.calculatePrice(Page.currPrice)
        } else {

            currPrice = Page.currPrice.Price
            stock = Page.stock
            strTxt = str1;
            // proComponent.calculatePrice(Page.currPrice)
            // console.log(strTxt)
        }

        $(".pro-text").html('<p>￥' + Tool.getPriceValue(currPrice) + '</p><em>库存' + stock + '件</em><span>' + pdd + '选择:' + strTxt + '</span>')

        // $(".pro-param .row").html(pdd + '选择:' + '<span class="col">' + strTxt + '</span>')

    },
    //获取购物车数量
    getCarCount:function (){

            var data = {
                UserID: Whole.uid,
            }

            Tool.firstAjax({
                isload:{
                    loadVal:true,
                    loadView:{
                        loadText:false, // false   字符串
                        isTransparent:true  //布尔值
                    }
                }, //页面load

                url:'/app/Mall_HomeApi/GetShopCartCount',
                value:data,
                success:function(value){
                    Whole.isLoading = false;
                    //购物车数量
                    $('.car span').html(value.ShopCartCount)
                }
            })

    },
     //商品数量
    quantity:function(tag, _this) {
        var sum = Number(_this.parent().find('.sumAnd').html())
        if (tag) {
            sum = sum + 1;
        } else {
            sum = sum - 1;
        }
        _this.parent().find('.sumAnd').html(sum)
        
        Page.Sum = sum;

        // Component.calculatePrice()
    },

    //商品数量加、减
    addSum:function() {
        Page.quantity(true, $(this))
    },

    lessSum : function() {
        if (Number($(this).parent().find('.sumAnd').html()) <= 1) {
            popupsUtil.init({
                msgText:'不能再减了哦~',
                yesEvent:function(){
                    return;
                },
                noEvent:function(){
                    console.log('取消');
                }
            })

        } else {
            Page.quantity(false, $(this))
        }
        return false
    }



}

