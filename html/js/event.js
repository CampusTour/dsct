$("#root").click(function (e) {
  const point = {
    x: Number(e.offsetX.toFixed()),
    y: Number(e.offsetY.toFixed()),
  };
  console.log("click", point);
  console.log("clickMode", clickMode);
  if (clickMode === "selectDestination") {
    Service.isBlocked(map_index, point.x, point.y).then(res => {
      let loc = Location.findPointByPoint(point);
      if (!loc && res.is_block) {
        alert("此路不通");
        return;
      }
      let dest = res.is_block ? loc : point;
      console.log("destination", dest);
      if (passby) {
        if (!midPoint) {
          midPoint = dest;
        } else {
          if (!moveController || !moveController.playing()) {
            let path1 = null;
            let path2 = null;
            Promise.all([
              Service.getRoute(
                map_index,
                current,
                midPoint,
                navigate_type
              ).then(result => {
                path1 = result.road.map(value => ({ ...value })).reverse();
              }),
              Service.getRoute(map_index, midPoint, dest, navigate_type).then(
                result => {
                  path2 = result.road.map(value => ({ ...value })).reverse();
                }
              ),
            ]).then(() => {
              midPoint = null;
              path = path1.concat(path2);
              Draw.showPath(path);
              moveController = Draw.startTrip(path);
            });
          }
        }
      } else {
        if (!moveController || !moveController.playing()) {
          Service.getRoute(map_index, current, dest, navigate_type).then(
            result => {
              path = result.road.map(value => ({ ...value })).reverse();
              Draw.showPath(path);
              moveController = Draw.startTrip(path);
            }
          );
        }
      }
    });
  } else if (clickMode === "selectStartPoint") {
    Service.isBlocked(map_index, point.x, point.y).then(res => {
      if (res.is_block) {
        alert("此路不通");
        return;
      }
      current = point;
      if (moveController) {
        moveController.stop();
      }
      Draw.showCurrent();
    });
  } else if (clickMode === "selectCrowdyPoint") {
    Service.addRoadCondition(map_index, 50, point.x, point.y, 2000)
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
  if (clickMode === "DistanceFirst") {
    clickMode = "selectDestination";
    navigate_type = "DistanceFirst";
  } else if (clickMode === "TimeFirst") {
    clickMode = "selectDestination";
    navigate_type = "TimeFirst";
  }
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
    (map_index === 0 && building.endsWith("(副校区)")) ||
    (map_index === 1 && building.endsWith("(主校区)"))
  ) {
    let gate = [
      { x: 14, y: 494 },
      { x: 763, y: 266 },
    ][map_index];

    if (!moveController || !moveController.playing()) {
      Service.getRoute(map_index, current, gate, navigate_type).then(result => {
        path = result.road.map(value => ({ ...value })).reverse();
        Draw.showPath(path);
        moveController = Draw.startTrip(path, () => {
          Operation.switchMap();
          Service.getRoute(map_index, current, dest, navigate_type).then(
            result => {
              path = result.road.map(value => ({ ...value })).reverse();
              Draw.showPath(path);
              moveController = Draw.startTrip(path);
              moveController.play();
            }
          );
        });
      });
    }
  } else if (!moveController || !moveController.playing()) {
    Service.getRoute(map_index, current, dest, navigate_type).then(result => {
      path = result.road.map(value => ({ ...value })).reverse();
      Draw.showPath(path);
      moveController = Draw.startTrip(path);
    });
  }
});

$("#building_input1_ok").click(() => {
  let course = $("#building_input1").val();
  let dest = Location.findPointByCourse(course);
  if (
    (map_index === 0 && course.endsWith("(副校区)")) ||
    (map_index === 1 && course.endsWith("(主校区)"))
  ) {
    let gate = [
      { x: 14, y: 494 },
      { x: 763, y: 266 },
    ][map_index];

    if (!moveController || !moveController.playing()) {
      Service.getRoute(map_index, current, gate, navigate_type).then(result => {
        path = result.road.map(value => ({ ...value })).reverse();
        Draw.showPath(path);
        moveController = Draw.startTrip(path, () => {
          Operation.switchMap();
          Service.getRoute(map_index, current, dest, navigate_type).then(
            result => {
              path = result.road.map(value => ({ ...value })).reverse();
              Draw.showPath(path);
              moveController = Draw.startTrip(path);
              moveController.play();
            }
          );
        });
      });
    }
  } else if (!moveController || !moveController.playing()) {
    Service.getRoute(map_index, current, dest, navigate_type).then(result => {
      path = result.road.map(value => ({ ...value })).reverse();
      Draw.showPath(path);
      moveController = Draw.startTrip(path);
    });
  }
});

$("#switch-map").click(() => {
  Operation.switchMap();
});

$("#passby").click(e => {
  passby = e.target.checked;
  if (passby) {
    midPoint = null;
  }
});
