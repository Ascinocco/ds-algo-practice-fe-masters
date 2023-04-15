const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
]

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], pathOut: Point[]): boolean {
  // base cases
  // 1. if we've walked off the maze
  if (curr.y >= maze.length || curr.x >= maze[0].length) {
    return false;
  }
  // 2. if we've found the exit
  if (curr.x === end.x && curr.y === end.y) {
    pathOut.push(curr);
    return true;
  }
  // 3. if we've already seen this pathway
  if (seen[curr.y][curr.x]) {
    return false;
  }
  // 4. if we've hit a wall
  if (maze[curr.y][curr.x] === wall) {
    return false;
  }

  // pre
  seen[curr.y][curr.x] = true;
  pathOut.push(curr);

  // recurse
  for (let i = 0; i < directions.length; i++) {
    const [x, y] = directions[i];
    const foundExit = walk(maze, wall, { x: x + curr.x, y: y + curr.y }, end, seen, pathOut);
    if (foundExit) {
      return true;
    }
  }

  // post
  pathOut.pop();
  return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
  // things to track
  // points ive already travelled
  // the path to the exit
  const seen: boolean[][] = [];
  const pathOut: Point[] = [];

  // lets prefill the seen array to simplify out of bounds cases
  const xLength = maze[0].length;
  const yLength = maze.length;
 
  // we can achieve something similar with array fill but this should work
  for (let i = 0; i < yLength; i++) {
    seen.push([]); // add new row
    for (let j = 0; j < xLength; j++) {
      seen[i][j] = false; // set row index value
    }
  }

  walk(maze, wall, start, end, seen, pathOut)

  return pathOut;
}
