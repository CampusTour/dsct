package tool

import (
	"dsct/pkg/model"
	"fmt"
	"image/png"
	"os"
)

func DecodeImage(Pixels *[][]model.Node, index int) (Map [][]int) {
	var fileName string

	switch index {
	case 0:
		fileName = "map1_back.png"
	case 1:
		fileName = "map2_back.png"
	}

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
		// var nodes []model.Node = make([]model.Node, img.Bounds().Max.X*img.Bounds().Max.Y)
		var nodes []int
		for y := img.Bounds().Min.Y; y < img.Bounds().Max.Y; y++ {
			r, g, b, _ := img.At(x, y).RGBA()
			// fmt.Printf("%v %v %v\n", r, g, b)
			var tp int
			if r == 0 && g == 0 && b == 0 {
				tp = model.Block
			} else if r == 62708 && g == 34438 && b == 13364 {
				tp = model.Block
			} else if r == 21074 && g == 53456 && b == 0 {
				tp = model.BikeRoad
			} else {
				tp = model.BikeRoad
			}
			nodes = append(nodes, tp)
		}
		Map = append(Map, nodes)
	}

	// //buf, err := json.MarshalIndent(Pixels, "", "  ")
	// buf, err := json.Marshal(Map)
	//
	// fileName = "pixels.js"
	// dstFile, err := os.Create(fileName)
	// if err != nil {
	//	fmt.Println(err.Error())
	//	return
	// }
	// defer dstFile.Close()
	// s := "var pixels = " + string(buf)
	//
	// dstFile.WriteString(s)

	return Map
}
