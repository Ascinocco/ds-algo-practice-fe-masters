export default function bs_list(haystack: number[], needle: number): boolean {
  let hi = haystack.length;
  let lo = 0;

  while(lo < hi) {
    const mid = Math.floor(lo + (hi - lo) / 2);
    const v = haystack[mid];

    if (v === needle) {
      return true;
    }

    if (v < needle) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return false;
}
