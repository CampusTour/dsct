$("#root").click(function (e) {
  const point = {
    x: Number(e.offsetX.toFixed()),
    y: Number(e.offsetY.toFixed()),
  };
  console.log(point);
  console.log("clickMode=" + clickMode);

  if (clickMode === "0") {
    console.log("122");
    if (moveController && !moveController.finished()) return;
    Operation.pause();
    // 显示加载
    Service.getRoute(
      map_index,
      current.x,
      current.y,
      point.x,
      point.y,
      navigate_type
    ).then(result => {
      if (result.is_block) {
        alert("此路不通");
      } else {
        path = result.road.map(value => ({ x: value.X, y: value.Y })).reverse();
        // 关闭加载
        Draw.showPath(path);
        moveController = Draw.startTrip(path);
      }
    });
  } else if (clickMode === "1") {
    current.x = point.x;
    current.y = point.y;
    showCurrent();
  } else if (clickMode === "2") {
    Service.addRoadCondition(map_index, 50, point.x, point.y, 100000)
      .then(road_conditions => {
        return road_conditions.map(value => ({
          x: value.x,
          y: value.y,
          fill: value.crowd,
        }));
      })
      .then(points => {
        Draw.showRouteCondition(points);
      });
  }
});

$("#now-mod").change(() => {
  clickMode = $("#now-mod").val();
  console.log(clickMode);
});

$("#move").click(() => {
  Operation.move();
});

$("#pause").click(() => {
  Operation.pause();
});

$("#stop").click(() => {
  Operation.stop();
});

$("#remove-road-condition").click(() => {
  Service.removeRoadCondition(0).then(r => {});
  Draw.clearRouteCondition();
});

$("#building_input0_ok").click(() => {
  console.log($("#building_input0").val());
});

$("#switch-map").click(() => {
  switchMap();
});
