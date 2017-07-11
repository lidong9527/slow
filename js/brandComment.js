/**
 * Created by Administrator on 2017/6/28 0028.
 */

    //传递参数
var text = location.search;
text = text.split('&');
var id = getNum(text[0]);
var name = decodeURI(text[1].substring(text[1].indexOf('=')+1,text[1].length));
var sname = text[2].substring(text[2].indexOf('=')+1,text[2].length);
sname = decodeURI(sname);
var brandId = getNum(text[3]);

$('#re').attr('href','brandDetail.html?brandtitleid='+brandId+'&brandName='+name+'&Name='+sname+'');
$('.head').html(name+'最新评论');
$(function(){

    $.ajax({
        url:'http://127.0.0.1:3000/api/getproductcom',
        data:{productid :id},
        success:function(data){
            var html = template('listM',data);
            $('#list').html(html);
        }
    });

});

















//获取数字
function getNum(text) {
    return value = text.replace(/[^0-9]/ig, "");
}