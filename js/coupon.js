/**
 * Created by Administrator on 2017/6/27 0027.
 */
$(function(){
    $.ajax({
        url:'http://127.0.0.1:3000/api/getcoupon',
        dataType:'json',
        success:function(data){
            console.log(data);
            var html = template('list',data);
            //console.log(html);
            $('.content > ul').html(html);
        }
    });
});