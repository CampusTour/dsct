package model

type Point struct {
	X    int `json:"x"`
	Y    int `json:"y"`
	Type int `json:"type"` //点所对应的路的种类
}

const BikeRoad = 4
const End = 3
const Start = 2
const Block = 1
const Unblock = 0
