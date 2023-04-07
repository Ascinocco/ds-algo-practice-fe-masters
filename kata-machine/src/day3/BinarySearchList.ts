export default function bs_list(haystack: number[], needle: number): boolean {
  // set initial bottom point
  let lo = 0;

  // set initial top point
  let hi = haystack.length; 

  while (lo < hi) {
    const mid = Math.floor(lo + (hi - lo) / 2);
    const v = haystack[mid]

    if (needle === v) {
      return true;
    }

    if (needle > v) {
      lo = mid + 1
    }

    if (needle < v) {
      hi = mid - 1
    }
  }


  return false;
}
