package service

import (
	"dsct/pkg/model"
	"dsct/pkg/tool"
	"gorm.io/gorm"
	"net/http"
)

// NodeService 1. 定义服务
type NodeService struct {
	Db *gorm.DB
}

func NewNodeService(db *gorm.DB) *NodeService {
	return &NodeService{Db: db}
}

type TestConnectedReq struct {
}
type TestConnectedRes struct {
	Token string
}

func (c *NodeService) TestConnected(r *http.Request, req *TestConnectedReq, res *TestConnectedRes) error {
	res.Token = "Success!"
	return nil
}

type GetPixelsReq struct {
}
type GetPixelsRes struct {
	XMax int
	YMax int

	Pixels [][]model.Node
}

//获取像素点
func (c *NodeService) GetPixels(r *http.Request, req *GetPixelsReq, res *GetPixelsRes) error {
	res.XMax, res.YMax = tool.DecodeImage(&res.Pixels)
	return nil
}
