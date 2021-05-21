package main

import (
	"dsct/pkg/model"
	"dsct/pkg/tool"
)

func main() {
	var Pixels [][]model.Node
	tool.DecodeImage(&Pixels)
	//var err error
	//address := flag.String("address", ":8001", "")
	//flag.Parse()
	//
	//var db *gorm.DB
	//db, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	//
	//err = db.AutoMigrate(&model.Node{})
	//if err != nil {
	//	panic(err)
	//}
	//
	//s := rpc.NewServer()
	//s.RegisterCodec(json2.NewCustomCodec(&rpc.CompressionSelector{}), "application/json")
	//err = s.RegisterService(service.NewNodeService(db), "NodeService")
	//if err != nil {
	//	panic(err)
	//}
	//http.Handle("/jsonp/", s)
	//log.Fatal(http.ListenAndServe(*address, nil))
}
