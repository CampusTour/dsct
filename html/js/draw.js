const Draw = (function () {
  let Draw = {};
  var stage = new Konva.Stage({
    container: "container",
    width: 2040,
    height: 1446,
  });

  var mapLayer = new Konva.Layer(); //地图
  var routeLayer = new Konva.Layer(); //路线
  var userLayer = new Konva.Layer();
  var conditionLayer = new Konva.Layer(); //道路拥挤情况

  var mapObj = new Image();
  mapObj.src = map_src[map_index];

  Draw.refreshMap = () => {
    mapObj.src = map_src[map_index];
    mapLayer.destroyChildren();
    const map = new Konva.Image({
      image: mapObj,
    });
    mapLayer.add(map);
    mapLayer.batchDraw();
  };

  mapObj.onload = Draw.refreshMap;

  var locObj = new Image();
  locObj.src = "location.png";
  var loc;
  locObj.onload = function () {
    loc = new Konva.Image({
      image: locObj,
      x: current.x - 18,
      y: current.y - 42,
    });
    userLayer.add(loc);
    userLayer.batchDraw();
  };

  Draw.showCurrent = () => {
    userLayer.destroyChildren();
    loc = new Konva.Image({
      image: locObj,
      x: current.x - 18,
      y: current.y - 42,
    });
    userLayer.add(loc);
    userLayer.batchDraw();
  };

  stage.add(mapLayer);
  stage.add(routeLayer);
  stage.add(userLayer);
  stage.add(conditionLayer);

  Draw.drawPoint = (point, fill, layer) => {
    if (layer === "routeLayer") {
      routeLayer.add(
        new Konva.Circle({
          ...point,
          fill: fill,
          radius: 3,
        })
      );
      routeLayer.batchDraw();
    }
    if (layer === "conditionLayer") {
      conditionLayer.add(
        new Konva.Circle({
          ...point,
          fill: "red",
          opacity: 0.01,
          radius: 3,
        })
      );
      conditionLayer.batchDraw();
    }
  };

  Draw.showPath = points => {
    routeLayer.destroyChildren();
    for (let point of points) {
      Draw.drawPoint(point, "#C3D7FF", "routeLayer");
    }
  };

  Draw.startTrip = (points, callback) => {
    let path = [...points];
    let timer = null;
    let playing = false;

    let end = () => {
      Draw.clearRoute();
      Time.offSpeedChange("startTrip");
      clearTimeout(timer);
      playing = false;
    };

    let Operation = () => {
      Draw.showCurrent();
      path.length &&
        Draw.drawPoint((current = path.shift()), "#4784FE", "routeLayer");
      path.length && (current = path.shift());
      path.length && (current = path.shift());
      path.length && (current = path.shift());
      if (!path.length) {
        end();
        callback && callback();
      }
    };

    Time.onSpeedChange("startTrip", () => {
      if (playing) {
        clearTimeout(timer);
        timer = setInterval(() => {
          Operation();
        }, 1000 / Time.getTimeSpeed());
      }
    });

    let controller = {
      play() {
        if (!playing) {
          playing = true;
          timer = setInterval(() => {
            Operation();
          }, 1000 / Time.getTimeSpeed());
        }
      },
      pause() {
        if (playing) {
          playing = false;
          clearTimeout(timer);
        }
      },
      stop() {
        end();
      },
      playing() {
        return playing;
      },
    };

    return controller;
  };

  Draw.showRouteCondition = points => {
    routeLayer.destroyChildren();
    for (let point of points) {
      Draw.drawPoint(point, point.fill, "conditionLayer");
    }
  };

  Draw.clearRouteCondition = () => {
    conditionLayer.destroyChildren();
    conditionLayer.batchDraw();
  };

  Draw.clearRoute = () => {
    routeLayer.destroyChildren();
    routeLayer.batchDraw();
  };

  return Draw;
})();
