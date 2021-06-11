package model

type Point struct {
	X    int
	Y    int
	Type int //点所对应的路的种类
}

const End = 3
const Start = 2
const Block = 1
const Unblock = 0
