# 校园导览系统

**前后端交互：**
程序前后端分离，前端 `html` + `js` ，后端 `go` ，
通信遵循 `jsonRPC` 规范，后端运行在 localhost:8001，前端经 `nginx` 代理，可通过 80 端口访问，
通过 `proxy_pass` 解决跨域问题。 

## 开始使用

### 普通用户



### 开发人员



## 前端

### 变量

## 后端

### 基本数据结构

```go
type Point struct {
	x    int
	y    int
	Type int		
}
```
**Point：**
点，包括横坐标、纵坐标及类型；其对应于图片的像素点，
当前二维数组中，以左上角为原点，向右为x轴正方向，向下为y轴正方向,
`Type` 表示点所对应的路的种类，`Block` 表示不可通行，`Unblock` 表示可通行，
`Start` 表示起点，`End` 表示终点。
----

```go
type Map struct {
	points [][]Point
	blocks map[string]*Point
	maxX   int
	maxY   int
}
```
**Map：**
地图，其保存了地图的基本信息，包括 _`Point` 的二维数组，
其存储了由 `tool/DecodeImage` 解析获得的地图以像素为单位的节点信息;
`blocks` 为 `string-Point map`，用来存储 “不可达” 节点；
`maxX`、`maxY`分别为地图的长、宽

----

```go
type AstarPoint struct {
	Point
	father *AstarPoint
	gVal   int
	hVal   int
	fVal   int
}
```
**AstarPoint：**
`A*` 点，实际上与 `Point` 一一对应。
其包括 `Point`，`father` 即上一个 `A*` 点的指针；
`gVal` 表示从起点到当前节点的代价；
`hVal` 表示当前节点到目的地的预估距离， 本程序中使用哈曼顿距离作为预估距离；
`fVal = gVal + hVal`

----

```go
type OpenList []*AstarPoint

func (this *OpenList) Push(x interface{}) {}
func (this *OpenList) Pop() interface{} {}
```
**OpenList：**
由 `AstarPoint` 指针组成的切片（即可变数组），
用于存放下一步可选的潜在对象，
其数据结构采用最小堆，每次选择堆中的最小元素作为试探的下一步，
并将所选择的元素从 `OpenList` 移出，放入 `CloseList`，
并更新该节点周围的节点（上、下、左、右、左上、右上、左下、右下） 逐一更新。
其实现了 `golang container/heap` 接口，对外提供 `Pop()` & `Push()` 方法

----

```go
func NewMap(typeMap [][]int) (m Map) {}
```
**NewMap()：**
输入由 `tool/DecodeImage` 解析地图得到的二维数组，
其中，二维数组的元素为代表了该节点是否可通行的 `Type int`，
通过对该二维数组 `maxX*maxY` 次遍历，获得地图结构中需要的 `points` 和 `blocks`。
根据遍历结果对地图的长、宽赋值后，返回 `Map`

----

```go
func (this *Map) getAdjacentPoint(curPoint *Point) (adjacents []*Point) {}
```
**getAdjacentPoint()：**
获得邻接点，即：对于一般情况，返回一个节点周围的8个节点，
对于边界的节点，返回周围的5个节点，
对于边角的节点，返回周围的3个节点。

----

```go
func pointAsKey(x, y int) (key string) {}
```
**pointAsKey()：**
输入节点的 x、y 坐标，返回一个字符串，作为 `string-Point map` 的key，
其主要目的在于 在已知一个节点横纵坐标的情况下，快速分辨该节点是否可以通行。

----

```go
func NewAstarPoint(p *Point, father *AstarPoint, end *AstarPoint) (ap *AstarPoint) {}
```
**NewAstarPoint()：**
新建一个 `A*` 节点，即 `AstarPoint` ，输入参数包括：
`p *Point` 为与该 `A*` 节点一一对应的地图节点，
`father *AstarPoint` 为父节点的指针，即上一步所走的节点，用于回溯生成路线，
`end *AstarPoint` 为终节点，用于估算代价 `hVal` ，具体计算过程由函数 `calcFVal()` 完成。

----

```go
func (this *AstarPoint) calcGVal() int {}
```
**calcGVal()：**
计算 `A*` 节点举例起始节点的代价，即 `gVal` ，
其具体计算规则为：
对于水平或垂直的节点， `gVal` 为父节点代价 + 10；
对于斜向节点， `gVal` 为父节点代价 + 14（由`10*sqrt(2)`近似得到）；

----

```go
func (this *AstarPoint) calcHVal(end *AstarPoint) int {}
```
**calcHVal()：**
计算 `A*` 节点举例终止节点的预估代价，即 `hVal` ，
本程序中，用哈曼顿距离进行估算。

----

```go
func (this *AstarPoint) calcFVal(end *AstarPoint) int {}
```
**calcFVal()：**
计算 `A*` 节点代价，即 `fVal` ， `fVal = gVal + hVal`。

----

```go
type SearchRoad struct {
	theMap  *Map
	start   AstarPoint
	end     AstarPoint
	closeLi map[string]*AstarPoint
	openLi  OpenList
	openSet map[string]*AstarPoint
	TheRoad []*AstarPoint
}
```
**SearchRoad：**
包括了地图 `theMap` ，起始点、终止点、不可走区域map、可走区域队列及map，
以及最终得到的路线。其中，closeLi用于快速查找某一节点是否不可走，
openset用于快速查找某一节点是否已经在openli中，若已在则需要判别是否需要更新，
否则则可以直接添加。

----

```go
func NewSearchRoad(startx, starty, endx, endy int, roadCondition map[string]int, m *Map) *SearchRoad {}
```
**NewSearchRoad()：**
创建一个新的 `SearchRoad` ，输入包括起始节点的 `x`、`y` 坐标，终止节点的 `x`、`y` 坐标，
以及地图 `Map` ，新建结构体时，需要将起点放入 `openLi` ，将障碍点即不可达点放入 `closeLi` ，
`roadCondition` 表示

----

```go
func (this *SearchRoad) FindoutRoad() bool {}
```
**FindoutRoad()：**
程序的核心，使用 `A*` 算法寻找最短路径，首先，建立一个除非 `openLi` 为空永不结束的循环，并重复执行一下操作：
首先，从 `openLi` 中取出一个最小的元素，将其作为当前节点，同时将其从 `openset` 中取出
（设置 `openset` 的目的是快速判断一个元素是否已经在 `openLi` 中），放入 `closeLi` 中；然后，
调用 `getAdjacentPoint()` 获得该点周围的点的切片，并对其遍历，
若其邻接点中包括了目的地，则说明找到了最优路，则顺着 `father` 一路回到起点，并且将沿途节点加入 `theRoad`。
需要注意的是，此时 `theRoad` 中的路线是从终点到起点的顺序，前端绘制行走动画前，需要进行 `reverse` 操作。
如果还没有到目的地，则首先需要判断该邻接点是否是可行的，即如果在 `closeLi` 中 ，则直接跳过当前循环的后续计算，
如果不在 `closeLi` 中，则继续判断其是否在 `openset` 中，如果在，则说明之前已经对该点计算过了耗费 `fVal` ，
则需要计算出以当前节点为父节点时的新 `fVal` ，选取值更小的一方，并且更新 `AstarPoint` ，否则，则无需比较，
可直接进行计算，并将其放入 `openLi` 和 `openset` 中。

----

```go
func DecodeImage(Pixels *[][]model.Node) (Map [][]int) {}
```
**DecodeImage()：**
解析图片，将保存在本地的 `Image` 图片解析成 `int` 型二维数组，其内容为 0-可行，1-不可行。

----

```go
type RoadCondition struct {
    X     int `json:"x"`
    Y     int `json:"y"`
    Crowd int `json:"crowd"`
}
```
**RoadCondition()：**
路径拥堵信息，其包括了该点的横、纵坐标，以及该点的拥挤程度，在时间最短路径规划时，`Crowd` 将作为权值的一部分

----

```go
func (p *Plat) GetPointByRadius(curPoint *Point, radius int, crowd int) (roadConditions []*RoadCondition) {}
```
**GetPointByRadius()：**
根据半径获得点集，该函数用于已知圆心、半径和圆心拥挤程度的情况下，以指数递减的形式，拥挤度逐渐向四周递减，
并且返回一个组成近似圆的矩形集。其中，扩散递减采用 `Crowd = ((crowd - 2) >> ((x-oX)  + (y-oY))) + 2` 
作为递减函数，保证圆心拥挤度符合设置，圆边缘拥挤度大于拥挤区域外部的基本规则。