export default function two_crystal_balls(breaks: boolean[]): number {
  // walk sqrt of n
  const jmpAmount = Math.floor(Math.sqrt(breaks.length));

  let i = jmpAmount;

  for (; i < breaks.length; i += jmpAmount) {
    if (breaks[i]) {
      break;
    }
  }

  i -= jmpAmount;

  for (; i < breaks.length; i++) {
    if (breaks[i]) {
      return i;
    }
  }

  return -1;
}
