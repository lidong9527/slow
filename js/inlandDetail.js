/**
 * Created by Administrator on 2017/6/25 0025.
 */
var ID = getNum(location.search);
$(function(){
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getdiscountproduct',
        dataType: 'json',
        data: {productid : ID},
        success: function (data) {
            //console.log(data);
            data = data.result;
            var html = ' <div class="title">'
                +'         <h1>'+data[0].productName+'</h1>'
                +'         </div>'
                +'         <p><span>'+data[0].productFrom+'</span><span>'+data[0].productTime+'</span><span>'+data[0].productTips+'</span></p>'
                +' <div class="text clearFix">'
                +'         <span class="left">'+data[0].productInfo+'</span>'
                +'         <div class="right"> '+data[0].productImg+'</div>'
                +'         <p></p>'
                +'         <div class="images">'+data[0].productImg+'</div>'
                +'         </div>'
                +' <input type="button" value="前往购买" class="buy"/>'
                //+'         <div class="list">'+data[0].productCity+'</div>'
                +'         <div class="table"><img src="../images/table.bmp" alt=""/></div>'
                +'         <div class="take clearFix">'+data[0].productComment+'</div>';
            $('.content1').html(html);
        }
    });



});
//获取数字
function getNum(text) {
    return value = text.replace(/[^0-9]/ig, "");
}