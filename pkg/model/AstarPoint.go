package model

import "math"

type OpenList []*_AstarPoint

func (self OpenList) Len() int           { return len(self) }
func (self OpenList) Less(i, j int) bool { return self[i].fVal < self[j].fVal }
func (self OpenList) Swap(i, j int)      { self[i], self[j] = self[j], self[i] }

func (this *OpenList) Push(x interface{}) {
	// Push and Pop use pointer receivers because they modify the slice's length,
	// not just its contents.
	*this = append(*this, x.(*_AstarPoint))
}

func (this *OpenList) Pop() interface{} {
	old := *this
	n := len(old)
	x := old[n-1]
	*this = old[0 : n-1]
	return x
}

type _AstarPoint struct {
	Point
	father *_AstarPoint
	gVal   int
	hVal   int
	fVal   int
}

func NewAstarPoint(p *Point, father *_AstarPoint, end *_AstarPoint) (ap *_AstarPoint) {
	ap = &_AstarPoint{*p, father, 0, 0, 0}
	if end != nil {
		ap.calcFVal(end)
	}
	return ap
}

func (this *_AstarPoint) calcGVal() int {
	if this.father != nil {
		deltaX := math.Abs(float64(this.father.X - this.X))
		deltaY := math.Abs(float64(this.father.Y - this.Y))
		if deltaX == 1 && deltaY == 0 {
			this.gVal = this.father.gVal + 10
		} else if deltaX == 0 && deltaY == 1 {
			this.gVal = this.father.gVal + 10
		} else if deltaX == 1 && deltaY == 1 {
			this.gVal = this.father.gVal + 14
		} else {
			panic("father point is invalid!")
		}
	}
	return this.gVal
}

func (this *_AstarPoint) calcHVal(end *_AstarPoint) int {
	this.hVal = int(math.Abs(float64(end.X-this.X)) + math.Abs(float64(end.Y-this.Y)))
	return this.hVal
}

func (this *_AstarPoint) calcFVal(end *_AstarPoint) int {
	this.fVal = this.calcGVal() + this.calcHVal(end)
	return this.fVal
}
