var TimeSpeed = 20;
var current = { x: 583, y: 330 };
var moving = false;
var path = [];
var timer = null;
var navigate_type = "DistanceFirst";
var map_index = 0;

/*
 * 0：点击选择目的地，并显示计算路径
 * 1：规定起始点（设置当前位置）
 * 2：添加拥挤区域
 * */
var clickMode = 0;
