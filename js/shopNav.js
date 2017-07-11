/**
 * Created by Administrator on 2017/6/27 0027.
 */
$(function(){
    //获取数据
    $.ajax({
        url:'http://127.0.0.1:3000/api/getsitenav',
        dataType:'json',
        success:function(data){
            var html = template('listM',data);
            $('#list').html(html);
        }
    });





})