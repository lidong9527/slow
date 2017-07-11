/**
 * Created by Administrator on 2017/6/27 0027.
 */
var id = getNum(location.search.split('&')[0]);
var name = getH(decodeURI(location.search.split('&')[1]));
$(function () {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getcouponproduct',
        data: {couponid: id},
        success: function (data) {
            var html = template('list', data);
            //console.log(html);
            $('.list > ul').html(html);
            $('#name').html(name);
            leftClick();
            init();
            leftRight();
        }
    });
});

//遮罩层设置样式
function init() {

    $('.box').css({width: $('.list').width()});
    $('.box .images .img img').click(function () {
        $('.box').css({background: 'rgba(0,0,0,0)'});
        $('.box .images').css({opacity:'0'});
        setTimeout(function(){
            $('.box').css({display: 'none'});
        },1000)



    });
}

var demo = null;
//添加左侧图片点击事件
function leftClick() {
    $('.leftImg').click(function () {
        $('.box').css({display: 'block'});
        $('.box .images img').attr('src', $(this.firstElementChild).attr('src'));
        demo = $(this);
        setTimeout(function(){
            $('.box').css({background: 'rgba(0,0,0,0.8)'});
            $('.box .images').css({opacity:'1'});
        },200);

    });
}

//图片左右箭头样式
function leftRight() {
    console.log($('.box .images').height());
    console.log($('.box .images').height());
    $('.box .images .left').css({height: $('.box .images').height(), lineHeight: $('.box .images').height() + 'px'});
    $('.box .images .right').css({height: $('.box .images').height(), lineHeight: $('.box .images').height() + 'px'});

//图片左右箭头样式点击事件
    $('.box .images .right').click(function () {


        try{
            $('.box .images .img img').attr('src', $((demo.parent().next().children().first()[0]).firstElementChild).attr('src'));
            demo = demo.parent().next().children().first();
        }catch(e){
            console.log('图片不存在');
        }

    });


    $('.box .images .left').click(function () {
        try{
            $('.box .images .img img').attr('src', $((demo.parent().prev().children().first()[0]).firstElementChild).attr('src'));
            demo = demo.parent().prev().children().first();
        } catch(e) {
            console.log('图片不存在');
        }
    });

}


function getNum(text) {
    return value = text.replace(/[^0-9]/ig, "");
}

function getH(text) {
    return value = text.replace(/[^\u4e00-\u9fa5]/g, "");
}
