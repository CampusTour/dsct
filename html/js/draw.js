$("#route").click(() => {
  console.log(getRoute(535, 595, 1872, 188));
});

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

$("#root").click(function (e) {
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
  getRoute(current.x, current.y, point.x, point.y).then((Road) => {
    path = Road.map((value) => ({ x: value.X, y: value.Y })).reverse();
    console.log(path);
    // 关闭加载
    showPath(path);
  });
});

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

function move() {
  moving = true;
  const f = () => {
    showCurrent();
    path.length && drawPoint((current = path.shift()), "#4784FE");
    path.length && (current = path.shift());
    path.length && (current = path.shift());
    path.length && (current = path.shift());
    if (path.length) {
      timer = setTimeout(f, 1000 / TimeSpeed);
    } else {
      moving = false;
    }
  };
  f();
}

function stop() {
  clearTimeout(timer);
}

function quit() {
  moving = false;
  path = [];
  clearTimeout(timer);
  routeLayer.destroyChildren();
  routeLayer.batchDraw();
}

function randomLocation() {
  do {
    current.x = (Math.random() * 2039).toFixed();
    current.y = (Math.random() * 1445).toFixed();
  } while (pixels[point.x][point.y]);
}
