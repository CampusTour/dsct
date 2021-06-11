package service

import (
	model "dsct/pkg/model"
	"fmt"
	"net/http"
)

// NodeService 1. 定义服务
type NodeService struct {
	Map *model.Plat
}

func NewNodeService(thisMap *model.Plat) *NodeService {
	return &NodeService{Map: thisMap}
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
	return nil
}

type GetRoutesReq struct {
	StartX int `json:"start_x"`
	StartY int `json:"start_y"`
	EndX   int `json:"end_x"`
	EndY   int `json:"end_y"`
}
type GetRoutesRes struct {
	Road []model.Point
}

func (c *NodeService) GetRoute(r *http.Request, req *GetRoutesReq, res *GetRoutesRes) error {
	searchRoad := model.NewSearchRoad(req.StartX, req.StartY, req.EndX, req.EndY, c.Map)

	if searchRoad.FindoutRoad() {
		fmt.Println("success")
	} else {
		fmt.Println("failed！")
	}

	var road []model.Point
	for _, item := range searchRoad.TheRoad {
		road = append(road, item.Point)
	}
	res.Road = road
	return nil
}
