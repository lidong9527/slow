/**
 * Created by Administrator on 2017/6/25 0025.
 */
var flag = true;
$(function () {
    //请求获取标题数据
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getbaicaijiatitle',
        dataType: 'json',
        success: function (data) {
            var html = template('tit', data);
            $('#title').append(html);
            var line = 0;
            $('#title li').each(function (index, value) {
                line += Math.ceil($(value).outerWidth(true));
            });
            $('#title li:nth-child(2)').css({color:'#F4483E',borderBottom:'2px solid #F4483E'});
            $('#title').css({width: line});
            bord();
            init();
            getTitPrduct(1);
        }
    });


//根据标题id获取数据
    function getTitPrduct(id){
        $.ajax({
            url:'http://127.0.0.1:3000/api/getbaicaijiaproduct',
            data:{titleid : id},
            dataType:'json',
            success:function(data){
                var html = template('body',data);
                $('#list').html(html);
            }
        });
    }


//添加标题点击事件
    function bord() {
        $('#title li').click(function () {
            $('#title li').css({borderBottom:'2px solid white',color:'black'});
            $(this).css({borderBottom:"2px solid red",color:'#F4483E'});
            getTitPrduct($(this).attr('id'));
        });
    }


//初始化标题栏
    function init(){
        var startX = 0, moveX = 0, distanceX = 0, currentX = 0;//初始位置 移动位置 移动计算后像素  记录当前元素滑动到的位置
        //获取顶部栏的宽度
        var topWidth = document.querySelector('.nav').offsetWidth;
        //获取ul的宽度
        var ulWidth = document.querySelector('#title').offsetWidth;
        //设置静止状态下最大left值
        var maxLeft = 0;
        //设置静止状态下最小的left值
        var minLeft = ulWidth - topWidth;
        //设置滑动状态下的left最大值
        var maxBounce = maxLeft+100;
        //设置滑动状态下的left最小值
        var minBounce = minLeft+100;
        var list = document.getElementById('title');
        list.addEventListener('touchmove', touch, false);
        list.addEventListener('touchstart', touch, false);
        list.addEventListener('touchend', touch, false);


    //touch系列事件
        function touch(event) {
            switch (event.type) {
                case 'touchmove':
                    moveX = event.touches[0].clientX;
                    distanceX = moveX - startX;
                    if(currentX > maxBounce || currentX+distanceX < -minBounce){
                        break;
                    }
                    $('#title').css({transition: 'none', transform: 'translateX(' + (distanceX + currentX) + 'px)'});
                    break;
                case 'touchstart':
                    startX = event.touches[0].clientX;
                    break;
                case 'touchend':
                    //判断当前滑动的位置是否在静止状态和滑动状态的最小值left值之间
                    if(currentX+distanceX < -minLeft){
                        $('#title').css({transition: '0.2s', transform: 'translateX(' + (-minLeft) + 'px)'});
                        currentX = -minLeft;
                    }
                    else if(currentX+distanceX > maxLeft){
                        $('#title').css({transition: '0.2s', transform: 'translateX(' + (maxLeft) + 'px)'});
                        currentX = maxLeft;
                    }else{
                        currentX += distanceX;
                    }
                    break;
                default :
                    console.log('undefined');
            }

        }
    }


    window.onscroll = function(){
        if(this.pageYOffset <=50){
            $('.top').css({display:'none'});
        }
        if(this.pageYOffset <=300){
            $('.top').css({background:'#ccc',opacity:'0'});
        }
        if(this.pageYOffset >=50){
            $('.top').css({display:'block'});
        }
        if(this.pageYOffset >=300){
            $('.top').css({background:'#ccc',opacity:'1'});
        }
    }
});