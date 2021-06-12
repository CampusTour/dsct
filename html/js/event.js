$("#root").click(function (e) {
  const point = {
    x: Number(e.offsetX.toFixed()),
    y: Number(e.offsetY.toFixed()),
  };
  console.log(point);
  console.log("clickMode=" + clickMode);

  if (clickMode === "0") {
    console.log("122");
    quit();
    if (moving) return;
    // 显示加载
    getRoute(
      map_index,
      current.x,
      current.y,
      point.x,
      point.y,
      navigate_type
    ).then((result) => {
      if (result.is_block) {
        alert("此路不通");
      } else {
        path = result.road
          .map((value) => ({ x: value.X, y: value.Y }))
          .reverse();
        // 关闭加载
        showPath(path);
      }
    });
  }
  if (clickMode === "1") {
    current.x = point.x;
    current.y = point.y;
    showCurrent();
  }
  if (clickMode === "2") {
    addRoadCondition(map_index, 50, point.x, point.y, 100000)
      .then((road_conditions) => {
        return road_conditions.map((value) => ({
          x: value.x,
          y: value.y,
          fill: value.crowd,
        }));
      })
      .then((points) => {
        showRouteCondition(points);
      });
  }
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

$("#remove-road-condition").click(() => {
  removeRoadCondition(0).then((r) => {});
  clearRouteCondition();
});

$("#building_input0_ok").click(() => {
  console.log("122");
  console.log($("#building_input0").val());
});

$("#switch-map").click(() => {
  current = default_positions[map_index];
  showCurrent();
  if (map_index === 0) map_index = 1;
  else map_index = 0;
  refreshMap();
});
