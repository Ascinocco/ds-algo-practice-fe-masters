export default function bubble_sort(arr: number[]): void {
   for(let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      const a = arr[j];
      const b = arr[j + 1];

      if (a > b) {
        arr[j] = b;
        arr[j + 1] = a;
      }
    }
  }
}
