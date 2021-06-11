function getRoute(start_x, start_y, end_x, end_y) {
  const req = {
    jsonrpc: "2.0",
    method: "NodeService.GetRoute",
    params: { start_x: start_x, start_y: start_y, end_x: end_x, end_y: end_y },
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
