package model

import "github.com/jinzhu/gorm"

type Location struct {
	X float64
	Y float64
}

type Node struct {
	gorm.Model //继承一些模型常用属性
	//位置
	Location Location `gorm:"unique;not null"`
	//结点名称【对应地图中具体位置的名称，如：教三楼、学生食堂】
	Name string `gorm:"unique;not null"`
}
