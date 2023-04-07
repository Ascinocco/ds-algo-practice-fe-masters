export default function linear_search(haystack: number[], needle: number): boolean {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      // author states that returning in the middle of a loop is bad practice.
      // why? and what should we be doing?
      return true;
    }
  }

  return false;
}
