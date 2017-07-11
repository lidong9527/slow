/**
 * Created by Administrator on 2017/6/28 0028.
 */
var text = location.search;
text = text.split('&');
var id = getNum(text[0]);
var sname = decodeURI(text[1].substring(text[1].indexOf('=')+1,text[1].length));
var name = decodeURI(text[2].substring(text[2].indexOf('=')+1,text[2].length));

$('.head').html(name+"产品销量排行");
$('#listHead').append('<a href="javascript:;">'+sname+'</a>');
$(function(){
    $('#re').attr('href','brandRanking.html?id='+id+'&name='+name+'十大品牌');
    $.ajax({
        url:'http://127.0.0.1:3000/api/getbrandproductlist',
        data:{brandtitleid:id},//,pagesize :4
        success:function(data){
            console.log(data);
            $(data.result).each(function(index,value){
                value.sname = sname;
                value.name = name;
                value.id = id;
            });
            var html = template('listM',data);

            $('#list').html(html);
            $('.pMuch').css({lineHeight:$('.right').height()*0.3+'px'});
            $('.pPing').css({lineHeight:$('.right').height()*0.2+'px'});
        }
    });
});








//获取数字
function getNum(text) {
    return value = text.replace(/[^0-9]/ig, "");
}
//获取汉字
function getH(text) {
    return value = text.replace(/[^\u4e00-\u9fa5]/g, "");
}