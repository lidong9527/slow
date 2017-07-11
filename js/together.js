/**
 * Created by Administrator on 2017/6/27 0027.
 */

var shopId = 0;
var areaId = 0;
var shop = document.getElementById('shop');
var region = document.getElementById('region');

$(function(){

    //点击显示店铺名称
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
    //重置下拉列表
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

    //点击显示区域名称
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

    //获取店铺名称
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
            //初始id文本
            $('#shop > span').html(data[0].shopName+"<i> > </i>");
            $('#shop > span').attr('shopId',data[0].shopId);
            shopId = $('#shop > span').attr('shopId');

            //获取区域名称
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
                    //初始id文本
                    $('#region > span').html(data[0].areaName+"<i> > </i>");
                    $('#region > span').attr('areaId',data[0].areaId);
                    areaId = $('#region > span').attr('areaId');
                    getList();

                }
            });
        }
    });

    ////获取列表数据
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

