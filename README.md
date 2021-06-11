# 校园导览系统

## 前端

### 变量

## 后端

### 基本数据结构

```go
type _Point struct {
	x    int
	y    int
	Type int		
}
```
**_Point：**
点，包括横坐标、纵坐标及类型；其对应于图片的像素点，
当前二维数组中，以左上角为原点，向右为x轴正方向，向下为y轴正方向,
`Type` 表示点所对应的路的种类，`Block` 表示不可通行，`Unblock` 表示可通行，
`Start` 表示起点，`End` 表示终点。
----

```go
type Map struct {
	points [][]_Point
	blocks map[string]*_Point
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
type _AstarPoint struct {
	_Point
	father *_AstarPoint
	gVal   int
	hVal   int
	fVal   int
}
```
**_AstarPoint：**
`A*` 点，实际上与 `_Point` 一一对应。
其包括 `_Point`，`father` 即上一个 `A*` 点的指针；
`gVal` 表示从起点到当前节点的代价；
`hVal` 表示当前节点到目的地的预估距离， 本程序中使用哈曼顿距离作为预估距离；
`fVal = gVal + hVal`

----

```go
type OpenList []*_AstarPoint

func (this *OpenList) Push(x interface{}) {}
func (this *OpenList) Pop() interface{} {}
```
**OpenList：**
由 `_AstarPoint` 指针组成的切片（即可变数组），
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
func (this *Map) getAdjacentPoint(curPoint *_Point) (adjacents []*_Point) {}
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
func NewAstarPoint(p *_Point, father *_AstarPoint, end *_AstarPoint) (ap *_AstarPoint) {}
```
**NewAstarPoint()：**
新建一个 `A*` 节点，即 `_AstarPoint` ，输入参数包括：
`p *_Point` 为与该 `A*` 节点一一对应的地图节点，
`father *_AstarPoint` 为父节点的指针，即上一步所走的节点，用于回溯生成路线，
`end *_AstarPoint` 为终节点，用于估算代价 `hVal` ，具体计算过程由函数 `calcFVal()` 完成。

----

```go
func (this *_AstarPoint) calcGVal() int {}
```
**calcGVal()：**
计算 `A*` 节点举例起始节点的代价，即 `gVal` ，
其具体计算规则为：
对于水平或垂直的节点， `gVal` 为父节点代价 + 10；
对于斜向节点， `gVal` 为父节点代价 + 14（由`10*sqrt(2)`近似得到）；

----

```go
func (this *_AstarPoint) calcHVal(end *_AstarPoint) int {}
```
**calcHVal()：**
计算 `A*` 节点举例终止节点的预估代价，即 `hVal` ，
本程序中，用哈曼顿距离进行估算。

----

```go
func (this *_AstarPoint) calcFVal(end *_AstarPoint) int {}
```
**calcFVal()：**
计算 `A*` 节点代价，即 `fVal` ， `fVal = gVal + hVal`。

----

```go
type SearchRoad struct {
	theMap  *Map
	start   _AstarPoint
	end     _AstarPoint
	closeLi map[string]*_AstarPoint
	openLi  OpenList
	openSet map[string]*_AstarPoint
	TheRoad []*_AstarPoint
}
```
**SearchRoad：**
包括了地图 `theMap` ，起始点、终止点、不可走区域map、可走区域队列及map，
以及最终得到的路线。其中，closeLi用于快速查找某一节点是否不可走，
openset用于快速查找某一节点是否已经在openli中，若已在则需要判别是否需要更新，
否则则可以直接添加。

----

```go
func NewSearchRoad(startx, starty, endx, endy int, m *Map) *SearchRoad {}
```
**NewSearchRoad()：**
创建一个新的 `SearchRoad` ，输入包括起始节点的 `x`、`y` 坐标，终止节点的 `x`、`y` 坐标，
以及地图 `Map` ，新建结构体时，需要将起点放入 `openLi` ，将障碍点即不可达点放入 `closeLi` 。

----

```go
func (this *SearchRoad) FindoutRoad() bool {}
```
**FindoutRoad()：**
程序的核心，使用 `A*` 算法寻找最短路径，首先，建立一个除非 `openLi` 为空永不结束的循环，并重复执行一下操作：
首先，从 `openLi` 中取出一个最小的元素，将其作为当前节点，同时将其从 `openset` 中取出，