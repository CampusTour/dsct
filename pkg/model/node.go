package model

type Node struct {
	ID uint

	//位置
	X int16
	Y int16

	////结点名称【对应地图中具体位置的名称，如：教三楼、学生食堂】
	//Name string

	//结点颜色【RGBA】
	R int32
	G int32
	B int32
	A int32
}
