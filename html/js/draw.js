var stage = new Konva.Stage({
  container: "container",
  width: 2040,
  height: 1446,
});

var mapLayer = new Konva.Layer();
var routeLayer = new Konva.Layer();
var userLayer = new Konva.Layer();

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

function drawPoint(point, fill) {
  routeLayer.add(
    new Konva.Circle({
      ...point,
      fill: pixels[point.x][point.y] === 0 ? fill : "red",
      radius: 3,
    })
  );
  routeLayer.batchDraw();
}

function showPath(points) {
  routeLayer.destroyChildren();
  for (let point of points) {
    drawPoint(point, "#C3D7FF");
  }
}
