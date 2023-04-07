export default function two_crystal_balls(breaks: boolean[]): number {
  const jmpAmount = Math.floor(Math.sqrt(breaks.length));
  let i = jmpAmount;

  for (; i < breaks.length; i+= jmpAmount) {
    if (breaks[i]) {
      break;
    }
  }

  // could have just used i instead of defining a new var j
  let j = i - jmpAmount;

  for (; j < breaks.length; j++) {
    if (breaks[j]) {
      return j
    }
  }

  return -1;
}
