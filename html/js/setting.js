function getRoute(map_index, start_x, start_y, end_x, end_y, navigate_type) {
  const req = {
    jsonrpc: "2.0",
    method: "NodeService.GetRoute",
    params: {
      navigate_type: navigate_type,
      map_index: map_index,
      start_x: start_x,
      start_y: start_y,
      end_x: end_x,
      end_y: end_y,
    },
    id: 1,
  };
  return fetch(`http://localhost/api/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.result.Road;
    });
}

function addRoadCondition(map_index, radius, x, y, crowd) {
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
  return fetch(`http://localhost/api/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data.result.RoadConditions;
    });
}
