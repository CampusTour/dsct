function move() {
  moving = true;
  const f = () => {
    showCurrent();
    path.length && drawPoint((current = path.shift()), "#4784FE", "routeLayer");
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

function switchMap() {
  if (map_index === 0) map_index = 1;
  else map_index = 0;
  current = default_positions[map_index];
  showCurrent();
  refreshMap();
}
