/**
 * Created by Administrator on 2017/6/24 0024.
 */
$(function(){
    init();



    //�Զ������б�
    function init(){
        $.ajax({
            url:'http://127.0.0.1:3000/api/getcategorytitle',
            dataType:'json',
            success:function(data){
                var data = data.result;
                var html = "";
                $(data).each(function(index,value){
                    html += '<li flag="false"><span>'+value.title+'</span><strong> > </strong></li><ul class="listSed"></ul>';
                    listSed(value.titleId);
                })
                $('#listUl').html(html);
                actionClick();
            }
        });
    }

    //�����б�
    function listSed(id){
        $.ajax({
            url:'http://127.0.0.1:3000/api/getcategory',
            dataType:'json',
            data:{titleid:id},
            success:function(data){
                data = data.result;
                var html = "";
                $(data).each(function(index,value){
                    html += '<li><a href="categoryDetail.html?categoryId='+value.categoryId+'">'+value.category+'</a></li>'
                });
                $($('ul .listSed')[id]).html(html);
            }
        });
    }
    //���չ��/����
    function actionClick(){

        $('#listUl > li').click(function(){
            if($(this).attr("flag") == "true"){
                $(this.lastElementChild).css({transition:'0.5s',transform:'rotate(0deg)'})
                $(this.nextElementSibling).css({display:'none'});
                $(this).attr("flag",false);
            }else{
                $(this.lastElementChild).css({transition:'0.5s',transform:'rotate(90deg)'});
                $(this.nextElementSibling).css({display:'block'});
                $(this).attr("flag",true);
            }
        });
    }
});