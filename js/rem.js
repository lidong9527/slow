/**
 * Created by Noom on 2017/6/22 0022.
 */
/*�����ֺͱ�ǩ�Ĵ�С������Ļ�ĳߴ����仰 �ȱ�����*/
var html = document.getElementsByTagName('html')[0];
/*ȡ����Ļ�Ŀ��*/
var width = window.innerWidth;
/* 640 100  320 50 */
var fontSize = 100/640*width;
/*����fontsize*/
html.style.fontSize = fontSize +'px';
window.onresize = function(){
    var html = document.getElementsByTagName('html')[0];
    /*ȡ����Ļ�Ŀ��*/
    var width = window.innerWidth;
    /* 640 100  320 50 */
    var fontSize = 100/640 * width;
    /*����fontsize*/
    html.style.fontSize = fontSize +'px';
}
