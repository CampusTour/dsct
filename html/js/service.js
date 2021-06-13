const Service = (() => {
  return {
    async isBlocked(map_index, x, y) {
      const req = {
        jsonrpc: "2.0",
        method: "NodeService.IsBlocked",
        params: {
          map_index,
          x,
          y,
        },
        id: 1,
      };
      const res = await fetch(`/api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const data = await res.json();
      return data.result;
    },

    async getRoute(map_index, start, end, navigate_type) {
      const req = {
        jsonrpc: "2.0",
        method: "NodeService.GetRoute",
        params: {
          navigate_type,
          map_index,
          start_x: start.x,
          start_y: start.y,
          end_x: end.x,
          end_y: end.y,
        },
        id: 1,
      };
      const res = await fetch(`/api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const data = await res.json();
      return data.result;
    },

    async addRoadCondition(map_index, radius, x, y, crowd) {
      const req = {
        jsonrpc: "2.0",
        method: "NodeService.AddRoadCondition",
        params: {
          map_index: map_index,
          radius: radius,
          road_condition: {
            x: x,
            y: y,
            crowd: crowd,
          },
        },
        id: 1,
      };
      const res = await fetch(`/api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const data = await res.json();
      return data.result.road_conditions;
    },

    removeRoadCondition(map_index) {
      const req = {
        jsonrpc: "2.0",
        method: "NodeService.RemoveRoadCondition",
        params: {
          map_index: map_index,
        },
        id: 1,
      };
      return fetch(`/api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
    },
  };
})();
