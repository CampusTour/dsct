const Location = (() => {
  const scope = 40;
  return {
    findPointByPoint(point) {
      let near = null;
      dest.forEach(({ point: p }) => {
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
      for (let loc of dest) {
        if (building === loc.building) {
          return loc.point;
        }
      }
    },
    findPointByCourse(course) {
      for (let loc of courses) {
        if (course === loc.course) {
          return loc.point;
        }
      }
    },
  };
})();
