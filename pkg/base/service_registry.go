package base

import (
	"github.com/gorilla/rpc/v2"
	"github.com/gorilla/rpc/v2/json2"
	"net/http"
	"reflect"
)

type ServiceRegistry struct {
	s *rpc.Server
}

func NewServiceRegistry() (reg *ServiceRegistry) {
	//创建rpcServer实例
	s := rpc.NewServer()
	s.RegisterCodec(json2.NewCustomCodec(&rpc.CompressionSelector{}), "application/json")
	reg = &ServiceRegistry{s: s}
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("./"))))
	//配置服务api路径
	http.Handle("/api/", s)
	return reg
}

//对rpc的注册服务方法进行重写，通过反射自动生成
func (reg *ServiceRegistry) RegisterService(service interface{}) (err error) {
	err = reg.s.RegisterService(service, reflect.Indirect(reflect.ValueOf(service)).Type().Name())
	return err
}
