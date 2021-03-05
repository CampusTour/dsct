package main

import (
	"dsct/pkg/base"
	"dsct/pkg/setup"
	"flag"
	"log"
	_ "log"
	"net/http"
	_ "net/http"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func main() {
	//设置后端端口为8001
	address := flag.String("address", ":8001", "")
	reg := base.NewServiceRegistry()

	//连接数据库
	db, err := gorm.Open("sqlite3", "dev.db")
	if err != nil {
		panic(err)
	}

	//setup
	if err := setup.Setup(reg, db); err != nil {
		panic(err)
	}

	log.Fatal(http.ListenAndServe(*address, nil))
}
