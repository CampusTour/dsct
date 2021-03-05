package service

import "github.com/jinzhu/gorm"

//1. 定义服务
type NodeService struct {
	db *gorm.DB
}

func NewNodeService(db *gorm.DB) *NodeService {
	return &NodeService{db: db}
}
