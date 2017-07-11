/**
 * Created by Administrator on 2017/6/22 0022.
 */
var flag = true;//状态标识
$(function(){


    Textload();
    detail();

    $('#ctrlHead').click(function(){
        liHeight = document.getElementById('active').offsetHeight;
        $('#ive').css({transition:'0.8s'});
        $(this.firstElementChild.nextElementSibling).toggleClass('act');
    });
    //点击显示更多
    $("#more").click(function(){
        var height = this.offsetHeight;
        var imgHeight = this.firstChild.firstChild.offsetHeight;
        if(flag){
            $("#ulShow li").each(function(index,value){
                $(value).css({height:height+'px',transition:'0.8s'});
            });
            $('#ulShow li p').each(function(index,value){
                $(value).css({display:'block'});
            })
            $('#ulShow li img').each(function(index,value){
                $(value).css({height:imgHeight+'px',transition:'0.8s'});
            })
            flag = false;
        }else{
            $("#ulShow li").each(function(index,value) {
                $(value).css({height:'0px'});
            });
            $('#ulShow li p').each(function(index,value){
                $(value).css({display:'none'});
            })
            $('#ulShow li img').each(function(index,value){
                $(value).css({height:0+'px'});
            })
            flag = true;
        }
    });

    /////返回顶部
    //$("goBack").click(function(){
    //
    //});






    //ajax获取数据
    function Textload(){
        $.ajax({
            url:'http://127.0.0.1:3000/api/getindexmenu',
            dataType:'json',
            success:function(data){
                var data = data.result;
                $('.menu li p').each(function(index,value){
                    $(value).html(data[index].name);
                    $(value.parentElement.firstElementChild).html(data[index].img);
                    //console.log(data[index]);
                })
            }
        });
    }
    function detail(){
        $.ajax({
            url:'http://127.0.0.1:3000/api/getmoneyctrl',
            dataType:'json',
            success:function(data){
                data = data.result;
                //console.log(data);
                //$(data).each(function(index,value){
                //    console.log(value.productImgSm);
                //})
                $(data).each(function(index,value){
                    var li = $("#active")[0].cloneNode(true);
                    li.id = 'li'+index;
                    li.style.display = "block";
                    //$(li.firstChild).html(value.productImgSm);
                    $(li.firstElementChild.nextElementSibling.firstElementChild.firstElementChild).html(value.productName);
                    $(li.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling).html(value.productPinkage);
                    $(li.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.firstElementChild).html(value.productFrom);
                    $(li.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild).html(value.productComCount);
                    $(li.firstElementChild).html(value.productImgSm);
                    document.getElementById("ulList").appendChild(li);
                });
            }
        });
    }
});