// seems like an object would be more friendly for this.
// these are the four directions we want to go.
const pathSteps = [
  [-1, 0], // left
  [1, 0], // right
  [0, -1], // down
  [0, 1], // up
] 

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
  // handle base cases
  // 1. off the map
  if(curr.x < 0 || curr.x >= maze[0].length || curr.y < 0 || curr.y >= maze.length) {
    return false;
  }

  // 2. on a wall (maze is a 2d array)
  if (maze[curr.y][curr.x] === "#") {
    return false;
  }

  // 3. if we've found the exit
  if (curr.x === end.x && curr.y === end.y) {
    // needed to tack on the last step in the path to the exit
    path.push(end);
    return true;
  }

  // 4. if we've already seen / walked this point
  if (seen[curr.y][curr.x]) {
    return false;
  }

  // 3 recurse steps
  // pre
  seen[curr.y][curr.x] = true;
  path.push(curr)
  // recurse
  for (let i = 0; i < pathSteps.length; i++) {
    const [x, y] = pathSteps[i];
    const foundEnd = walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path);
    
    if (foundEnd) {
      return true;
    }
  }

  // post
  // We pop here because we didn't find a way forward so we don't want prevent walking back...
  // this allows us to go back and try a different direction...
  path.pop();
  return false;
}

// generally speaking it's easier to recurse outside of the initial problem function
export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  // create seen array with the same size / dimensions of the array...
  for (let i = 0; i < maze.length; i++) {
    seen.push(new Array(maze[0].length).fill(false));
  }

  // your recursive function doesn't always have to return the final value...
  walk(maze, wall, start, end, seen, path);

  return path;
}
