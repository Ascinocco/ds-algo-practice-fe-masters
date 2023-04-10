const steps = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
  // base cases

  // if we're off the maze
  if (curr.x >= maze[0].length || curr.y >= maze.length) {
    return false;
  }
  // if we found a wall
  if (maze[curr.y][curr.x] === wall) {
    return false;
  }
  // if we have seen it
  if (seen[curr.y][curr.x]) {
    return false;
  }
  // if we found the exit
  if (curr.x === end.x && curr.y === end.y) {
    path.push(curr);
    return true;
  }

  // pre
  seen[curr.y][curr.x] = true;
  path.push(curr);

  // recurse
  for (let i = 0; i < steps.length; i++) {
    const [x, y] = steps[i];

    const found = walk(
      maze,
      wall,
      { x: curr.x + x, y: curr.y + y },
      end,
      seen,
      path
    );

    if (found) {
      return true;
    }
  }

  // post
  path.pop();
  return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];
  
  for (let i = 0; i < maze[0].length; i++) {
    seen.push(new Array(maze[0].length).fill(false));
  }

  walk(maze, wall, start, end, seen, path);

  return path;
}
