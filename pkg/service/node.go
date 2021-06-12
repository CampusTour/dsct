package service

import (
	"dsct/pkg/model"
	"fmt"
	"net/http"
)

// NodeService 1. 定义服务
type NodeService struct {
	Map           []*model.Plat
	RoadCondition []map[string]int
}

func NewNodeService(thisMap []*model.Plat, thisRoadCondition []map[string]int) *NodeService {
	return &NodeService{Map: thisMap, RoadCondition: thisRoadCondition}
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

type GetRoadConditionReq struct {
	MapIndex int `json:"map_index"`
}
type GetRoadConditionRes struct {
	RoadConditions []model.RoadCondition `json:"road_conditions"`
}

func (c *NodeService) GetRoadCondition(r *http.Request, req *GetRoadConditionReq, res *GetRoadConditionRes) error {
	var roadConditions []model.RoadCondition

	for s, i := range c.RoadCondition[req.MapIndex] {
		x, y := model.DecodeKey(s)
		roadCondition := model.RoadCondition{
			X:     x,
			Y:     y,
			Crowd: i,
		}
		roadConditions = append(roadConditions, roadCondition)
	}

	res.RoadConditions = roadConditions
	return nil
}

type AddRoadConditionReq struct {
	MapIndex      int                 `json:"map_index"`
	RoadCondition model.RoadCondition `json:"road_condition"`
	Radius        int                 `json:"radius"`
}
type AddRoadConditionRes struct {
	RoadConditions []model.RoadCondition `json:"road_conditions"`
}

// 请求圆心的点，及拥挤区域半径
func (c *NodeService) AddRoadCondition(r *http.Request, req *AddRoadConditionReq, res *AddRoadConditionRes) error {
	roadConditions := c.Map[req.MapIndex].GetPointByRadius(&model.Point{
		X:    req.RoadCondition.X,
		Y:    req.RoadCondition.Y,
		Type: 0,
	}, req.Radius, req.RoadCondition.Crowd)

	res.RoadConditions = roadConditions
	return nil
}

type RemoveRoadConditionReq struct {
	MapIndex int `json:"map_index"`
}
type RemoveRoadConditionRes struct {
}

func (c *NodeService) RemoveRoadCondition(r *http.Request, req *GetRoutesReq, res *GetRoutesRes) error {
	c.RoadCondition[req.MapIndex] = nil
	return nil
}

type GetRoutesReq struct {
	NavigateType string `json:"navigate_type"` // "DistanceFirst" || "TimeFirst"
	MapIndex     int    `json:"map_index"`
	StartX       int    `json:"start_x"`
	StartY       int    `json:"start_y"`
	EndX         int    `json:"end_x"`
	EndY         int    `json:"end_y"`
}
type GetRoutesRes struct {
	Road []model.Point
}

func (c *NodeService) GetRoute(r *http.Request, req *GetRoutesReq, res *GetRoutesRes) error {
	searchRoad := model.NewSearchRoad(req.StartX, req.StartY, req.EndX, req.EndY, c.RoadCondition[req.MapIndex], c.Map[req.MapIndex])
	//searchRoad := model.NewSearchRoad(req.StartX, req.StartY, req.EndX, req.EndY, nil, nil)

	if searchRoad.FindoutRoad(req.NavigateType) {
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
