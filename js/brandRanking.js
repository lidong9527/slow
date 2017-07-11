/**
 * Created by Administrator on 2017/6/28 0028.
 */
var text = location.search;
text = text.split('&');
var id = getNum(text[0]);
var name = decodeURI(text[1].substring(text[1].indexOf('=')+1,text[1].length));
name = name.substring(0,name.length-4);


$(function(){


    //设置头部标题
    $('.head').html(name+'哪个牌子好');
    $('#listHead').append('<a href="javascript:;">'+name+'</a>');
    console.log($('#listHead'));
    //获取列表数据
    $.ajax({
        url:'http://127.0.0.1:3000/api/getbrand',
        data:{brandtitleid:id},
        success:function(data){
            $(data.result).each(function(index,value){
                value.name = name;
            });
            var html = template('listM',data);
            $('#list').html(html);
            setNum();

        }
    });

    //获取所有num元素添加内容
    function setNum(){
        var i=1;
        $('.num').each(function(index,value){
            value.innerHTML = i;
            i++;
        });
    }












});


//获取数字
function getNum(text) {
    return value = text.replace(/[^0-9]/ig, "");
}
