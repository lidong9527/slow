/**
 * Created by Administrator on 2017/6/25 0025.
 */
var page = 0;
var pageSum = 0;
var s = true;
$(function () {

    getProduct();


//��ȡ�б�����
    function getProduct() {
        $.ajax({
            url: 'http://127.0.0.1:3000/api/getmoneyctrl',
            data: {pageid: page},
            dataType: 'json',
            success: function (data) {
                pageSum = Math.ceil(data.totalCount / data.pagesize);
                data = data.result;
                if (s) {
                    initPage();
                    s = false;
                }
                //console.log(11111111);
                //console.log($('#se').val());
                var html = '';
                $(data).each(function (index, value) {
                    html += '<li class="clearFix"><a href="moneyDetail.html?productId='+value.productId+'"> <span class="left">' + value.productImgSm + '</span> <span class="right"> <p><span>' + value.productName + '</span><span id="c">' + value.productPinkage + '</span></p> <div class="down"> <span> <span class="name">' + value.productFrom + '&nbsp;|</span> <span class="date">' + value.productTime + '</span> </span> <span> <span>' + value.productComCount + '</span> </span> </div> </span> </a></li>';
                })
                $('#listUl').html(html);
            }
        });
    }

//��ʼ��ҳ���
    function initPage() {
        var html = '';
        for (var i = 0; i < pageSum; i++) {
            html += '<option value="' + i + '">' + (i+1)  + '/' + pageSum + '</option>';
        }
        $("#se").html(html);
    }

    //����¼�
    $('#btnUp').click(function () {
        if (page > 0) {
            page--;
            //�ı�select���ֵ
            choose();
            getProduct();
        }
    })

    $('#btnDown').click(function () {
        if (page < pageSum-1) {

            page++;
            //�ı�select���ֵ
            choose();
            getProduct();
        }
    })
    //ҳ���ı��¼�
    $('#se').change(function () {
        //console.log();
        //$(this.children).each(function (index, value) {
            //if (value.selected) {
                page = $('#se').val();
                getProduct();
            //}
        //})
    });
    //ѡ����ı��ı��¼�
    function choose() {
        $('#se option').each(function (index, value) {
            if (value.value == page) {
                value.selected = true;
            }
        });
    }
});