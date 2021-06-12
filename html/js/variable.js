var map_index = 0;
var default_positions = [
  { x: 583, y: 330 },
  { x: 583, y: 330 },
];
var current = default_positions[map_index];

var moveController = null;
/*
 * DistanceFirst || TimeFirst
 * */
var navigate_type = "TimeFirst";

var map_src = ["map(recolored).png", "map1.png"];

/*
 * 0：点击选择目的地，并显示计算路径
 * 1：规定起始点（设置当前位置）
 * 2：添加拥挤区域
 * */
var clickMode = "0";
var array = ["学生活动中心", "学生内勤管理处所"];
