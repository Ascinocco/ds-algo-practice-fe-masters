export default function bs_list(haystack: number[], needle: number): boolean {
  // define the begging point
  // define the end point
  // while low is less than hi
    // find middle point
    // get middle point value
    // if middle point value is equal to needle
      // return true
    // if value > needle
      // shift to left side of array
    // if value < needle
      // shift to right side of array
  
  let lo = 0;
  let hi = haystack.length;

  while(lo < hi) {
    let mid = Math.floor(lo + (hi - lo) / 2);
    let v = haystack[mid];

    if (v === needle) {
      return true;
    }

    if (v > needle) {
      hi = mid - 1;
    }

    if (v < needle) {
      lo = mid + 1;
    }
  }

  return false;
}
