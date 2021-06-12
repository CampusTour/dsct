package model

import (
	"container/heap"
	"math"
)

type SearchRoad struct {
	theMap        *Plat
	start         AstarPoint
	end           AstarPoint
	RoadCondition map[string]int
	closeLi       map[string]*AstarPoint
	openLi        OpenList
	openSet       map[string]*AstarPoint
	TheRoad       []*AstarPoint
}

func NewSearchRoad(startx, starty, endx, endy int, roadCondition map[string]int, m *Plat) *SearchRoad {
	sr := &SearchRoad{}
	sr.RoadCondition = roadCondition
	sr.theMap = m
	sr.start = *NewAstarPoint(&Point{startx, starty, Start}, nil, nil, 0)
	sr.end = *NewAstarPoint(&Point{endx, endy, End}, nil, nil, 0)
	sr.TheRoad = make([]*AstarPoint, 0)
	sr.openSet = make(map[string]*AstarPoint)
	sr.closeLi = make(map[string]*AstarPoint, int64(math.Pow(2, 63)))

	heap.Init(&sr.openLi)
	heap.Push(&sr.openLi, &sr.start) // 首先把起点加入开放列表
	sr.openSet[PointAsKey(sr.start.X, sr.start.Y)] = &sr.start
	// 将障碍点放入关闭列表
	println(len(m.blocks))
	for k, v := range m.blocks {
		sr.closeLi[k] = NewAstarPoint(v, nil, nil, 0)
	}

	return sr
}

func (this *SearchRoad) FindoutRoad(navigateType string) bool {
	// navigateType: "DistanceFirst" || "TimeFirst"

	for len(this.openLi) > 0 {
		// 将节点从开放列表移到关闭列表当中。
		x := heap.Pop(&this.openLi)
		curPoint := x.(*AstarPoint)
		delete(this.openSet, PointAsKey(curPoint.X, curPoint.Y))
		this.closeLi[PointAsKey(curPoint.X, curPoint.Y)] = curPoint

		adjacs := this.theMap.getAdjacentPoint(&curPoint.Point)
		for _, p := range adjacs {
			condition, ok := this.RoadCondition[PointAsKey(p.X, p.Y)]
			if !ok {
				condition = 0
			}
			theAP := NewAstarPoint(p, curPoint, &this.end, condition)
			if PointAsKey(theAP.X, theAP.Y) == PointAsKey(this.end.X, this.end.Y) {
				// 找出路径了, 标记路径
				for theAP.father != nil {
					this.TheRoad = append(this.TheRoad, theAP)
					theAP.Type = Unblock
					theAP = theAP.father
				}
				return true
			}

			_, ok = this.closeLi[PointAsKey(p.X, p.Y)]
			if ok {
				continue
			}

			existAP, ok := this.openSet[PointAsKey(p.X, p.Y)]
			if !ok {
				heap.Push(&this.openLi, theAP)
				this.openSet[PointAsKey(theAP.X, theAP.Y)] = theAP
			} else {
				oldGVal, oldFather := existAP.gVal, existAP.father
				existAP.father = curPoint
				existAP.calcGVal()
				// 如果新的节点的G值还不如老的节点就恢复老的节点
				if existAP.gVal > oldGVal {
					// restore father
					existAP.father = oldFather
					existAP.gVal = oldGVal
				}
			}

		}
	}

	return false
}
