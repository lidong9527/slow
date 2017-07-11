/**
 * Created by Administrator on 2017/6/24 0024.
 */
var Id = getNum(location.search);
var page = 1;
var pageCount = 0;
var s=true;
$(function () {

    //��ȡ��Ʒ�������
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getcategorybyid',
        data: {categoryid: Id},
        dataType: 'json',
        success: function (data) {
            data = (data.result)[0];
            $('.listHead>span').append('<a href="###">' + data.category + '</a>');

        }
    });
    //��ȡ��Ʒ�����б�
    getList(page);

    //����л�ҳ��
    $('#btnDown').click(function () {
        if (page < pageCount) {
            page++;
            getList();
            $('#se >option').each(function(index,value){
                if(value.selected){
                    value.innerText = page+'/'+pageCount;
                    getList();
                }
            });
        }
    });
    $('#btnUp').click(function () {
        if (page > 1) {
            page--;
            getList();
            $('#se >option').each(function(index,value){
                if(value.selected){
                    value.innerText = page+'/'+pageCount;
                    getList();
                }
            });
        }

    });
})

//��ȡ����
function getNum(text) {
    return value = text.replace(/[^0-9]/ig, "");
}
//��ȡ��Ʒ�����б�
function getList() {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getproductlist',
        dataType: 'json',
        data: {categoryid: Id, pageid: page},
        success: function (data) {
            pageCount = Math.ceil(data.totalCount / data.pagesize);  //��ҳ��
            data = data.result;
            var html = '';
            $(data).each(function (index, value) {
                console.log(value);
                html += '<li class="clearFix"> <a href="productDetail.html?productId='+value.productId+'&categoryId='+value.categoryId+'"><div class="left">' + value.productImg + '</div> <div class="right"> <p>' + value.productName + '</p> <p>' + value.productPrice + '</p> <div class="down"> <span>' + value.productQuote + '</span> <span>' + value.productCom + '</span> </div> </div> </a></li>';
            });
            $('#listUl').html(html);
            chooseClick();
        }
    });
}
//ѡ������ת
function chooseClick(){
    if(s){
        var count="";
        for(var i=0;i<pageCount;i++){
            count += '<option value="'+(i+1)+'">'+(i+1)+'/'+pageCount+'</option>';
        }
        $('#se').html(count);
        s = false;
    }

    $('#se').change(function(){
        change();

    });
}
//�ı�selectֵ�¼�
function change(){
    $('#se >option').each(function(index,value){
        if(value.selected){
            page = value.value;
            getList();
        }
    });
}