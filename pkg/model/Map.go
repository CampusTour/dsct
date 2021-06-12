package model

import (
	"strconv"
	"strings"
)

type Plat struct {
	points [][]Point
	Blocks map[string]*Point
	maxX   int
	maxY   int
}

func NewMap(typeMap [][]int) (m Plat) {
	m.points = make([][]Point, len(typeMap))
	m.Blocks = make(map[string]*Point, len(typeMap)*len(typeMap[0]))
	for x, row := range typeMap {
		m.points[x] = make([]Point, len(row))
		for y, Type := range row {
			m.points[x][y] = Point{x, y, Type}
			if Type == Block {
				m.Blocks[PointAsKey(x, y)] = &m.points[x][y]
			}
		}
	}

	m.maxX = len(m.points)
	m.maxY = len(m.points[0])

	return m
}

func (p *Plat) getAdjacentPoint(curPoint *Point) (adjacents []*Point) {
	if x, y := curPoint.X, curPoint.Y-1; x >= 0 && x < p.maxX && y >= 0 && y < p.maxY {
		adjacents = append(adjacents, &p.points[x][y])
	}
	if x, y := curPoint.X+1, curPoint.Y-1; x >= 0 && x < p.maxX && y >= 0 && y < p.maxY {
		adjacents = append(adjacents, &p.points[x][y])
	}
	if x, y := curPoint.X+1, curPoint.Y; x >= 0 && x < p.maxX && y >= 0 && y < p.maxY {
		adjacents = append(adjacents, &p.points[x][y])
	}
	if x, y := curPoint.X+1, curPoint.Y+1; x >= 0 && x < p.maxX && y >= 0 && y < p.maxY {
		adjacents = append(adjacents, &p.points[x][y])
	}
	if x, y := curPoint.X, curPoint.Y+1; x >= 0 && x < p.maxX && y >= 0 && y < p.maxY {
		adjacents = append(adjacents, &p.points[x][y])
	}
	if x, y := curPoint.X-1, curPoint.Y+1; x >= 0 && x < p.maxX && y >= 0 && y < p.maxY {
		adjacents = append(adjacents, &p.points[x][y])
	}
	if x, y := curPoint.X-1, curPoint.Y; x >= 0 && x < p.maxX && y >= 0 && y < p.maxY {
		adjacents = append(adjacents, &p.points[x][y])
	}
	if x, y := curPoint.X-1, curPoint.Y-1; x >= 0 && x < p.maxX && y >= 0 && y < p.maxY {
		adjacents = append(adjacents, &p.points[x][y])
	}
	return adjacents
}

type RoadCondition struct {
	X     int `json:"x"`
	Y     int `json:"y"`
	Crowd int `json:"crowd"`
}

func (p *Plat) GetPointByRadius(curPoint *Point, radius int, crowd int) (roadConditions []RoadCondition) {
	minX := curPoint.X - radius
	if minX < 0 {
		minX = 0
	}
	maxX := curPoint.X + radius
	if maxX > p.maxX {
		maxX = p.maxX
	}
	minY := curPoint.Y - radius
	if minY < 0 {
		minY = 0
	}
	maxY := curPoint.Y + radius
	if maxY > p.maxY {
		maxY = p.maxY
	}
	for x := minX; x <= maxX; x++ {
		for y := minY; y <= maxY; y++ {
			oX := (minX + maxX) >> 1
			oY := (minY + maxY) >> 1
			if (x-oX)*(x-oX)+(y-oY)*(y-oY) <= radius*radius {
				dx := x - oX
				if dx < 0 {
					dx = -dx
				}
				dy := y - oY
				if dy < 0 {
					dy = -dy
				}
				roadCondition := RoadCondition{
					X:     x,
					Y:     y,
					Crowd: ((crowd - 2) >> (dx + dy)) + 2,
				}
				roadConditions = append(roadConditions, roadCondition)
			}
		}
	}

	return roadConditions
}

func PointAsKey(x, y int) (key string) {
	key = strconv.Itoa(x) + "," + strconv.Itoa(y)
	return key
}

func DecodeKey(key string) (x, y int) {
	keys := strings.Split(key, ",")
	x, _ = strconv.Atoi(keys[0])
	y, _ = strconv.Atoi(keys[1])
	return x, y
}
