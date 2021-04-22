//像素点，地图中的最小单位，通过控制像素点的颜色实现地图中建筑与道路的区分以及路线的显示
interface Pixel {
  /*
   * 坐标，以左上角为(0,0)，向右、向下递增
   * */
  X_axis: number; //横坐标
  Y_axis: number; //纵坐标

  /*
   * 种类，表示地图中该像素对应的是道路还是建筑
   * - 0：建筑/障碍物，不可到达、不可穿过
   * - 1：普通道路，表示可以行走、骑车等各种方式通过的道路
   * - 2：步行道路，表示仅能步行通过的道路，如可踩踏草地、小路等
   * - 3：车行道路，表示仅能机动车通过的道路
   * - 4：标记节点，表示地图中可作为目的地的位置
   * */
  Type: number;

  /*
   * 节点名称，表示该节点所表示的地理位置，如：“图书馆”、“学生活动中心”等
   * */
  Name: string;
}