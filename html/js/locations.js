const Location = (() => {
  const scope = 40;
  const locations = dest;
  return {
    findPointByPoint(point) {
      let near = null;
      locations.forEach(({ point: p }) => {
        targetDis = Math.abs(p.x - point.x) + Math.abs(p.y - point.y);
        if (
          (near &&
            targetDis <
              Math.abs(near.x - point.x) + Math.abs(near.y - point.y)) ||
          (!near && targetDis < scope)
        ) {
          near = p;
        }
      });
      return near;
    },

    findPointByBuilding(building) {
      for (let loc of locations) {
        if (building === loc.building) {
          return loc.point;
        }
      }
    },
  };
})();
