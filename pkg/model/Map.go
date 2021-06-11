package model

import "strconv"

type Plat struct {
	points [][]Point
	blocks map[string]*Point
	maxX   int
	maxY   int
}

func NewMap(typeMap [][]int) (m Plat) {
	m.points = make([][]Point, len(typeMap))
	m.blocks = make(map[string]*Point, len(typeMap)*2)
	for x, row := range typeMap {
		m.points[x] = make([]Point, len(row))
		for y, Type := range row {
			m.points[x][y] = Point{x, y, Type}
			if Type == Block {
				m.blocks[pointAsKey(x, y)] = &m.points[x][y]
			}
		}
	}

	m.maxX = len(m.points)
	m.maxY = len(m.points[0])

	return m
}

func (this *Plat) getAdjacentPoint(curPoint *Point) (adjacents []*Point) {
	if x, y := curPoint.X, curPoint.Y-1; x >= 0 && x < this.maxX && y >= 0 && y < this.maxY {
		adjacents = append(adjacents, &this.points[x][y])
	}
	if x, y := curPoint.X+1, curPoint.Y-1; x >= 0 && x < this.maxX && y >= 0 && y < this.maxY {
		adjacents = append(adjacents, &this.points[x][y])
	}
	if x, y := curPoint.X+1, curPoint.Y; x >= 0 && x < this.maxX && y >= 0 && y < this.maxY {
		adjacents = append(adjacents, &this.points[x][y])
	}
	if x, y := curPoint.X+1, curPoint.Y+1; x >= 0 && x < this.maxX && y >= 0 && y < this.maxY {
		adjacents = append(adjacents, &this.points[x][y])
	}
	if x, y := curPoint.X, curPoint.Y+1; x >= 0 && x < this.maxX && y >= 0 && y < this.maxY {
		adjacents = append(adjacents, &this.points[x][y])
	}
	if x, y := curPoint.X-1, curPoint.Y+1; x >= 0 && x < this.maxX && y >= 0 && y < this.maxY {
		adjacents = append(adjacents, &this.points[x][y])
	}
	if x, y := curPoint.X-1, curPoint.Y; x >= 0 && x < this.maxX && y >= 0 && y < this.maxY {
		adjacents = append(adjacents, &this.points[x][y])
	}
	if x, y := curPoint.X-1, curPoint.Y-1; x >= 0 && x < this.maxX && y >= 0 && y < this.maxY {
		adjacents = append(adjacents, &this.points[x][y])
	}
	return adjacents
}

func pointAsKey(x, y int) (key string) {
	key = strconv.Itoa(x) + "," + strconv.Itoa(y)
	return key
}
