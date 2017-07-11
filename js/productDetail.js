/**
 * Created by Administrator on 2017/6/24 0024.
 */
var Id = location.search;
Id = Id.split("&");
var pId = getNum(Id[0]);
var cId = getNum(Id[1]);
$(function(){
    //设置头部三级菜单
    $.ajax({
        url:'http://127.0.0.1:3000/api/getproduct',
        data:{productid:pId},
        dataType:'json',
        success:function(data){
            //console.log(data);
            data = data.result;
            var html = '<div class="listMenu"> <p>'+data[0].productName+'</p> <div class="image">'+data[0].productImg+'</div> <div class="list_little"> <ul class="clearFix"><li><a href="###">比价购买</a></li><li><a href="###">产品参数</a></li><li><a href="###">评价(2322)</a></li></ul></div> <div class="much">'+data[0].bjShop+'</div> <div class="bottom"></div> </div>';
            $('.listHead>span').append('<a id="Name" href="###">'+(data[0].productName).substring(0,10)+'</a>');
            $('.listMenu').html(html);
            console.log(html);
        }
    });
    //设置头部二级菜单
    $.ajax({
        url:'http://127.0.0.1:3000/api/getcategorybyid',
        data:{categoryid:cId},
        daaType:'json',
        success:function(data){
            //console.log(data);
            data = data.result;
            $('.listHead>span>a:eq(1)').html(data[0].category);
            $('.listHead>span>a:eq(1)').attr('href','categoryDetail.html?category='+cId+'');
        }
    });
    //添加评论信息
    $.ajax({
        url:'http://127.0.0.1:3000/api/getproductcom',
        data:{productid:pId},
        dataType:'json',
        success:function(data){
            data = data.result;
            var html='';
            $(data).each(function(index,value){
                html += '<span>'+value.comName+'</span><span class="date">'+value.comTime+'</span> <p>'+value.comFrom+'</p> <div class="text">'+value.comContent+'</div>';
            });
            $('.comment').html(html);
        }
    });
});
//获取数字
function getNum(text) {
    return value = text.replace(/[^0-9]/ig, "");
}