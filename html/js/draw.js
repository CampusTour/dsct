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
mapObj.src = "map(recolored).png";

mapObj.onload = function () {
  const map = new Konva.Image({
    image: mapObj,
  });
  mapLayer.add(map);
  mapLayer.batchDraw();
};

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

function showCurrent() {
  userLayer.destroyChildren();
  loc = new Konva.Image({
    image: locObj,
    x: current.x - 18,
    y: current.y - 42,
  });
  userLayer.add(loc);
  userLayer.batchDraw();
}

stage.add(mapLayer);
stage.add(routeLayer);
stage.add(userLayer);
stage.add(conditionLayer);

function drawPoint(point, fill, layer) {
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
}

function showPath(points) {
  routeLayer.destroyChildren();
  for (let point of points) {
    drawPoint(point, "#C3D7FF", "routeLayer");
  }
}

function showRouteCondition(points) {
  routeLayer.destroyChildren();
  for (let point of points) {
    drawPoint(point, point.fill, "conditionLayer");
  }
}

function clearRouteCondition() {
  conditionLayer.destroyChildren();
  conditionLayer.batchDraw();
}
