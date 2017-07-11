/**
 * Created by Administrator on 2017/6/25 0025.
 */
var a=null;
$(function(){
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getinlanddiscount',
        dataType: 'json',
        success: function (data) {
            data = data.result;
            console.log(data);
            var html = '';
            $(data).each(function(index,value){
                html += ' <li>'
                    +' <a href="inlandDetail.html?productId='+value.productId+'">'
                    +'         <div class="images">'+value.productImg+'</div>'
                    +'         <p class="tit">'+value.productName+'</p>'
                    +'         <p class="much">'+value.productPrice+'</p>'
                    +'         <span><span class="from">'+value.productFrom+'</span>&nbsp;|&nbsp;<span class="date">'+value.productTime+'</span></span>'
                    +' </a>'
                    +'</li>';
            });
            $('#list').html(html);
            a = $('#list li').slice($('#list li').length-4,$('#list li').length);
            a.css({display:'none'});
        }
    });
    window.onscroll = function(){
        if(this.pageYOffset >= $('#list').height() - window.innerHeight){
            a.css({display:'block'});
        }
    }
});
