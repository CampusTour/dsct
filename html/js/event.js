$("#root").click(function (e) {
  console.log(getRoute(535, 595, 1872, 188));
  quit();
  if (moving) return;
  const point = {
    x: Number(e.offsetX.toFixed()),
    y: Number(e.offsetY.toFixed()),
  };
  console.log(point, pixels[point.x][point.y]);
  if (pixels[point.x][point.y]) {
    alert("此路不通！！");
    return;
  }
  // path = navigateTimeFirst(current, point);

  // 显示加载
  getRoute(0, current.x, current.y, point.x, point.y, navigate_type).then(
    (Road) => {
      path = Road.map((value) => ({ x: value.X, y: value.Y })).reverse();
      // 关闭加载
      showPath(path);
    }
  );
});

$("#move").click((e) => {
  move();
});

$("#stop").click((e) => {
  stop();
});

$("#quit").click((e) => {
  quit();
});
