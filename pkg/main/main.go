package main

import (
	model "dsct/pkg/model"
	"dsct/pkg/service"
	"dsct/pkg/tool"
	"flag"
	"github.com/gorilla/rpc/v2"
	"github.com/gorilla/rpc/v2/json2"
	"log"
	"net/http"
)

func main() {
	a := 12
	for i := 0; i < 20; i++ {
		a = a >> 1
		println(a)
	}

	var Pixels [][]model.Node
	var plats []*model.Plat

	presetMap0 := tool.DecodeImage(&Pixels, 0)
	presetMap1 := tool.DecodeImage(&Pixels, 1)
	m0 := model.NewMap(presetMap0)
	m1 := model.NewMap(presetMap1)

	plats = append(plats, &m0)
	plats = append(plats, &m1)

	var err error
	address := flag.String("address", ":8001", "")
	flag.Parse()

	s := rpc.NewServer()
	s.RegisterCodec(json2.NewCustomCodec(&rpc.CompressionSelector{}), "application/json")
	err = s.RegisterService(service.NewNodeService(plats), "NodeService")
	if err != nil {
		panic(err)
	}
	http.Handle("/api/", s)
	log.Fatal(http.ListenAndServe(*address, nil))
}
