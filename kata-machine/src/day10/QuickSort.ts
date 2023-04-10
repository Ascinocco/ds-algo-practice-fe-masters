function qs(arr: number[], lo: number, hi: number): void {
  if (lo >= hi) {
    // end case, no longer to recurse.
    return;
  }

  const pivotIdx = partition(arr, lo, hi);

  // repeat the step for the left chunk(?) but without repeating the already checked pivot index.
  qs(arr, lo, pivotIdx - 1);

  // repeat tje step for the right chunk(?)
  qs(arr, pivotIdx + 1, hi)
}

// returns pivot index
function partition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi];
  let idx = lo - 1;

  // we need to walk from the low to the hi but not including the hi because the hi is the pivot
  // now we do the weak sort.
  for (let i = lo; i < hi; i++) {
    if (arr[i] <= pivot) {
      // increment the index so we're not at -1
      idx++;
      const tmp = arr[i];
      // swap arr i with idx;
      arr[i] = arr[idx];
      arr[idx] = tmp;
    }
  }

  idx++;
  // this shifts / swaps the pivot point...? check notes...
  arr[hi] = arr[idx];
  arr[idx] = pivot;

  return idx;
}

export default function quick_sort(arr: number[]): void {
  // subtracting 1 from the array length makes this inclusive...
  const hi = arr.length - 1;
  const lo = 0; // starting index
  // we're going to mutate the array, so qs does not need to return
  qs(arr, lo, hi);
}
