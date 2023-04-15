export default function two_crystal_balls(breaks: boolean[]): number {
  // lets jump the sqrt of n
  const jmp = Math.floor(Math.sqrt(breaks.length));

  let i = jmp;
  for (; i < breaks.length; i += jmp) {
    if (breaks[i]) {
      // We have now found the point at which one of our crystal balls will break
      break;
    }
  }

  let j = i - jmp;
  for (; j < breaks.length; j++) {
    if (breaks[j]) {
      return j;
    }
  }

  return -1;
}
