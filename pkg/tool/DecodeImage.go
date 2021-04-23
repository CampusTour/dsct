package tool

import (
	"dsct/pkg/model"
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
	//imgConfig, err := png.DecodeConfig(file)
	//if err != nil {
	//	fmt.Printf("image decode config failed: -> %v", err)
	//}

	for i := img.Bounds().Min.X; i < img.Bounds().Max.X; i++ {
		//var nodes []model.Node = make([]model.Node, img.Bounds().Max.X*img.Bounds().Max.Y)
		var nodes []model.Node
		for j := img.Bounds().Min.Y; j < img.Bounds().Max.Y; j++ {
			r, g, b, a := img.At(j, i).RGBA()
			node := model.Node{
				X: int16(i),
				Y: int16(j),
				R: int32(r),
				G: int32(g),
				B: int32(b),
				A: int32(a),
			}
			nodes = append(nodes, node)
			//if r!=0 || g != 0 || b != 0 {
			//	fmt.Printf("(%v, %v)'s color: r: %v, g: %v, b: %v, a: %v\n", i, j, r, g, b, a)
			//}
			fmt.Printf("(%v, %v)'s color: r: %v, g: %v, b: %v, a: %v\n", i, j, r, g, b, a)
		}
		*Pixels = append(*Pixels, nodes)
	}
	return img.Bounds().Dx(), img.Bounds().Dy()
}
