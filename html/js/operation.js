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
    switchMap() {
      Draw.clearRoute();
      map_index = 1 - map_index;
      current = default_positions[map_index];
      Draw.showCurrent();
      Draw.refreshMap();
    },
  };
})();
