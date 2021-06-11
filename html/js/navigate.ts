enum Type {
  Road, Block
}

interface Point {
  x: number;
  y: number;
}

interface Graph {
  pixels: Type[][];
}

class Graph {
  constructor(pixels: Type[][]) {
    this.pixels = pixels;
  }
  neighbors(point: Point) {
    return [
      { x: point.x - 1, y: point.y },
      { x: point.x + 1, y: point.y },
      { x: point.x, y: point.y - 1 },
      { x: point.x, y: point.y + 1 },
    ];
  }
  cost(current: Point, next: Point) {
    let cost = 0;
    this.pixels[current.x][current.y] === 0 ? cost++ : cost = Infinity;
    this.pixels[next.x][next.y] === 0 ? cost++ : cost = Infinity;
    return cost;
  }
}

// @ts-ignore
var map = new Graph(pixels);

interface PriorityQueue<V> {
  queue: { val: V; weight: number }[];
}

class PriorityQueue<V> {
  constructor() {
    this.queue = [];
  }
  empty() {
    return this.queue.length == 0;
  }
  get() {
    return this.queue.shift()?.val;
  }
  put(val: V, weight: number) {
    this.queue.push({ val, weight });
    this.queue.sort((a, b) => a.weight - b.weight);
  }
}

function heuristic(start: Point, end: Point) {
  return Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
}

function navigateTimeFirst(start: Point, end: Point) {
  let frontier = new PriorityQueue<Point>();
  frontier.put(start, 0);
  let came_from = {} as any;
  let cost_so_far = {} as any;
  came_from[JSON.stringify(start)] = null;
  cost_so_far[JSON.stringify(start)] = 0;

  while (!frontier.empty()) {
    let current = frontier.get();
    if (current == undefined) {
      return;
    }

    if (JSON.stringify(current) == JSON.stringify(end)) break;

    for (let next of map.neighbors(current)) {
      let new_cost =
        cost_so_far[JSON.stringify(current)] + map.cost(current, next);
      if (
        !(JSON.stringify(next) in cost_so_far) ||
        new_cost < cost_so_far[JSON.stringify(next)]
      ) {
        cost_so_far[JSON.stringify(next)] = new_cost;
        let priority = new_cost + heuristic(end, next);
        frontier.put(next, priority);
        came_from[JSON.stringify(next)] = current;
      }
    }
  }

  let path = [];
  let current = end;
  let current_s = JSON.stringify(current);
  let start_s = JSON.stringify(start);
  while (current_s != start_s) {
    path.unshift(current);
    current = came_from[current_s];
    current_s = JSON.stringify(current);
  }
  path.unshift(current);
  console.log(path);
  return path;
}

function navigateDistanceFirst(start: Point, end: Point) { }
