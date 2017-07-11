/**
 * Created by Administrator on 2017/6/27 0027.
 */

var shopId = 0;
var areaId = 0;
var shop = document.getElementById('shop');
var region = document.getElementById('region');

$(function(){

    //�����ʾ��������
    $('#shop').click(function(){
        if($(this).attr('flag') == 'true'){
            var html = template('ListH',shop);
            $('#headList').html(html);
            $(this).attr('flag','false');
            $(this.firstElementChild.firstElementChild).css({transform:'rotate(-90deg)'});
            $('#headList li').click(function(){
                this.innerText = (this.innerText).substring(0,4);
                $('#shop span').html(this.innerText+"<i> > </i>");
                $('#shop span').attr('shopId',$(this).attr('shopId'));
                initListA();
                shopId = $('#shop > span').attr('shopId');
                getList();
            });
        } else{
            initListA();
        }
    });
    //���������б�
    function initListA(){
        var html='';
        $('#headList').html(html);
        $('#shop').attr('flag','true');
        $(shop.firstElementChild.firstElementChild).css({transform:'rotate(90deg)'});
    }
    function initListB(){
        var html='';
        $('#headList').html(html);
        $('#region').attr('flag','true');
        $(region.firstElementChild.firstElementChild).css({transform:'rotate(90deg)'});
    }

    //�����ʾ��������
    $('#region').click(function(){
        if($(this).attr('flag') == 'true'){
            var html = template('ListR',region);
            $('#headList').html(html);
            $(this).attr('flag','false');
            $(this.firstElementChild.firstElementChild).css({transform:'rotate(-90deg)'});
            $('#headList li').click(function(){
                this.innerText = (this.innerText).substring(0,4);
                $('#region span').html(this.innerText+"<i> > </i>");
                $('#region span').attr('areaId',$(this).attr('areaId'));
                initListB();
                areaId = $('#region > span').attr('areaId');
                getList();
            });
        }else{
            initListB();
        }
    });

    //��ȡ��������
    $.ajax({
        url:'http://127.0.0.1:3000/api/getgsshop',
        dataType:'json',
        success:function(data){
            data = data.result;
            var arr= [];
            $(data).each(function(index,value){
                arr[index] = value;
            });
            shop.result = arr;
            //��ʼid�ı�
            $('#shop > span').html(data[0].shopName+"<i> > </i>");
            $('#shop > span').attr('shopId',data[0].shopId);
            shopId = $('#shop > span').attr('shopId');

            //��ȡ��������
            $.ajax({
                url:'http://127.0.0.1:3000/api/getgsshoparea',
                dataType:'json',
                success:function(data){
                    data = data.result;
                    var arr= [];
                    $(data).each(function(index,value){
                        arr[index] = value;
                    });
                    region.result = arr;
                    //��ʼid�ı�
                    $('#region > span').html(data[0].areaName+"<i> > </i>");
                    $('#region > span').attr('areaId',data[0].areaId);
                    areaId = $('#region > span').attr('areaId');
                    getList();

                }
            });
        }
    });

    ////��ȡ�б�����
    function getList(){
        $.ajax({
            url:'http://127.0.0.1:3000/api/getgsproduct',
            dataType:'json',
            data:{shopid:shopId,areaid:areaId},
            success:function(data){
                var html = template('listM',data);
                $('.listMenu').html(html);
            }
        });
    }

});

