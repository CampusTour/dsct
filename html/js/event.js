$("#root").click(function (e) {
  console.log(getRoute(535, 595, 1872, 188));

  const point = {
    x: Number(e.offsetX.toFixed()),
    y: Number(e.offsetY.toFixed()),
  };
  console.log(point, pixels[point.x][point.y]);

  quit();
  if (moving) return;
  if (pixels[point.x][point.y]) {
    alert("此路不通！！");
    return;
  }
  // 显示加载
  getRoute(0, current.x, current.y, point.x, point.y, navigate_type).then(
    (Road) => {
      path = Road.map((value) => ({ x: value.X, y: value.Y })).reverse();
      // 关闭加载
      showPath(path);
    }
  );
});

$("#now-mod").change(() => {
  clickMode = $("#now-mod").val();
  console.log(clickMode);
});

$("#move").click(() => {
  move();
});

$("#stop").click(() => {
  stop();
});

$("#quit").click(() => {
  quit();
});
