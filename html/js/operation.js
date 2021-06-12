const Operation = (() => {
  return {
    move() {
      if (moveController) {
        moveController.play();
      }
    },
    pause() {
      if (moveController) {
        moveController.pause();
      }
    },
    stop() {
      if (moveController) {
        moveController.stop();
      }
    },
    randomLocation() {
      do {
        current.x = (Math.random() * 2039).toFixed();
        current.y = (Math.random() * 1445).toFixed();
      } while (pixels[point.x][point.y]);
    },
    switchMap() {
      if (map_index === 0) map_index = 1;
      else map_index = 0;
      current = default_positions[map_index];
      Draw.showCurrent();
      Draw.refreshMap();
    },
  };
})();
