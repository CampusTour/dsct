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
	var Pixels [][]model.Node
	presetMap := tool.DecodeImage(&Pixels)
	m := model.NewMap(presetMap)

	var err error
	address := flag.String("address", ":8001", "")
	flag.Parse()

	s := rpc.NewServer()
	s.RegisterCodec(json2.NewCustomCodec(&rpc.CompressionSelector{}), "application/json")
	err = s.RegisterService(service.NewNodeService(&m), "NodeService")
	if err != nil {
		panic(err)
	}
	http.Handle("/api/", s)
	log.Fatal(http.ListenAndServe(*address, nil))
}
