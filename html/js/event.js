$("#root").click(function (e) {
  const point = {
    x: Number(e.offsetX.toFixed()),
    y: Number(e.offsetY.toFixed()),
  };
  console.log("click", point);
  console.log("clickMode", clickMode);
  if (clickMode === "selectDestination") {
    let loc = Location.findPointByPoint(point);
    if (loc || !res.is_block) {
      let dest = loc ? loc : point;
      console.log("destination", dest);
      if (!moveController || !moveController.playing()) {
        Service.getRoute(map_index, current, dest, navigate_type).then(
          result => {
            if (result.is_block) {
            } else {
              path = result.road
                .map(value => ({ x: value.X, y: value.Y }))
                .reverse();
              Draw.showPath(path);
              moveController = Draw.startTrip(path);
            }
          }
        );
      }
    } else {
      alert("此路不通");
    }
  } else if (clickMode === "selectStartPoint") {
    current.x = point.x;
    current.y = point.y;
    showCurrent();
  } else if (clickMode === "selectCrowdyPoint") {
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
  let building = $("#building_input0").val();
  let dest = Location.findPointByBuilding(building);
  if (
    (map_index === 0 && building.endswith("(主校区)")) ||
    (map_index === 1 && building.endswith("(副校区)"))
  ) {
    if (!moveController || !moveController.playing()) {
      Service.getRoute(
        map_index,
        current,
        { x: 14, y: 494 },
        navigate_type
      ).then(result => {
        if (result.is_block) {
        } else {
          path = result.road
            .map(value => ({ x: value.X, y: value.Y }))
            .reverse();
          Draw.showPath(path);
          moveController = Draw.startTrip(path, () => {
            Operation.switchMap();
            Service.getRoute(map_index, current, dest, navigate_type).then(
              result => {
                if (result.is_block) {
                } else {
                  path = result.road
                    .map(value => ({ x: value.X, y: value.Y }))
                    .reverse();
                  Draw.showPath(path);
                  moveController = Draw.startTrip(path, () => {});
                }
              }
            );
          });
        }
      });
    }
  } else {
    if (!moveController || !moveController.playing()) {
      Service.getRoute(map_index, current, dest, navigate_type).then(result => {
        if (result.is_block) {
        } else {
          path = result.road
            .map(value => ({ x: value.X, y: value.Y }))
            .reverse();
          Draw.showPath(path);
          moveController = Draw.startTrip(path);
        }
      });
    }
  }
});

$("#switch-map").click(() => {
  Operation.switchMap();
});
