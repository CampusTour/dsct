package tool

import (
	"dsct/pkg/model"
	"encoding/json"
	"fmt"
	"image/png"
	"os"
)

func DecodeImage(Pixels *[][]model.Node) (XMax int, YMax int) {
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

	var Map [][]int8

	for i := img.Bounds().Min.X; i < img.Bounds().Max.X; i++ {
		//var nodes []model.Node = make([]model.Node, img.Bounds().Max.X*img.Bounds().Max.Y)
		var nodes []int8
		for j := img.Bounds().Min.Y; j < img.Bounds().Max.Y; j++ {
			r, _, b, _ := img.At(j, i).RGBA()
			//fmt.Printf("%v %v %v\n", r, g, b)
			var tp int8
			if r != 0 && b == 0 {
				tp = 0
			} else {
				tp = 1
			}
			nodes = append(nodes, tp)
		}
		Map = append(Map, nodes)
	}
	//buf, err := json.MarshalIndent(Pixels, "", "  ")
	buf, err := json.Marshal(Map)

	fileName = "pixels.js"
	dstFile, err := os.Create(fileName)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	defer dstFile.Close()
	s := "var pixels = " + string(buf)

	dstFile.WriteString(s)

	return img.Bounds().Dx(), img.Bounds().Dy()
}
