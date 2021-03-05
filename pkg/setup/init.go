package setup

import (
	"dsct/pkg/base"
	"dsct/pkg/model"
	"dsct/pkg/service"
	"github.com/jinzhu/gorm"
)

//由于需要注册服务，并且服务需要与数据库进行交互，所以init的时候需要有reg和db作为参数
func Setup(reg *base.ServiceRegistry, db *gorm.DB) (err error) {
	//1. 添加迁移
	db.AutoMigrate(&model.Node{})
	//2. 注册服务
	err = reg.RegisterService(service.NewNodeService(db))
	if err != nil {
		panic(err)
	}
	return err
}
