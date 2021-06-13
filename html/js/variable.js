var map_index = 0;

var default_positions = [
  { x: 132, y: 497 },
  { x: 583, y: 330 },
];
var current = default_positions[map_index];

var moveController = null;
/*
 * DistanceFirst || TimeFirst
 * */
var navigate_type = "TimeFirst";

var map_src = ["map1.png", "map2.png"];

/*
 * selectDestination: 点击选择目的地，并显示计算路径
 * selectStartPoint: 规定起始点（设置当前位置）
 * selectCrowdyPoint: 添加拥挤区域
 * */
var clickMode = "selectDestination";
