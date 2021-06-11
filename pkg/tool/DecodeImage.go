package tool

import (
	"dsct/pkg/model"
	"fmt"
	"image/png"
	"os"
)

func DecodeImage(Pixels *[][]model.Node) (Map [][]int) {
	//fileName := "1.png"
	//fileName := "1(Small).png"
	//fileName := "t.png"
	fileName := "map.png"
	//fileName := "map(Small).png"
	//fileName := "test.png"
	//fileName := "1(Mid).png"
	file, err := os.Open(fileName)
	if err != nil {
		fmt.Printf("open file %v failed: -> %v", fileName, err)
	}
	img, err := png.Decode(file)
	if err != nil {
		fmt.Printf("image decode failed: -> %v", err)
	}
	err = file.Close()
	if err != nil {
		fmt.Printf("file closed failed: -> %v", err)
	}

	file, err = os.Open(fileName)
	if err != nil {
		fmt.Printf("open file %v failed: -> %v", fileName, err)
	}

	for x := img.Bounds().Min.X; x < img.Bounds().Max.X; x++ {
		//var nodes []model.Node = make([]model.Node, img.Bounds().Max.X*img.Bounds().Max.Y)
		var nodes []int
		for y := img.Bounds().Min.Y; y < img.Bounds().Max.Y; y++ {
			r, _, b, _ := img.At(x, y).RGBA()
			//fmt.Printf("%v %v %v\n", r, g, b)
			var tp int
			if r != 0 && b == 0 {
				tp = 0
			} else {
				tp = 1
			}
			if tp != 0 && tp != 1 {
				println(tp)
			}
			nodes = append(nodes, tp)
		}
		Map = append(Map, nodes)
	}

	return Map
}
