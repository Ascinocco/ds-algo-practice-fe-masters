/**
* sum_char_codes_o_of_n
* This function runs at 0(N) -- Oh of N
* because the number of loops changes based on the length of the string passed in.
* This means that this aglorithm grows linearily 
*/
function sum_char_codes_o_of_n(n: string): number {
  let sum = 0;
  for (let i = 0; i < n.length; i++) {
    sum += n.charCodeAt(i)
  }

  return sum;
}

/**
* sum_char_codes_two
* This function is technically O of N as well because we drop constants (.e.g the two loops, so O(2N)) for theoretical measurements.
* However, in practice this can make a difference
*/
function sum_char_codes_two(n: string): number {
  let sum = 0;

  for (let i = 0; i < n.length; i++) {
    sum += n.charCodeAt(i)
  }

  for (let i = 0; i < n.length; i++) {
    sum += n.charCodeAt(i)
  }

  return sum;
}

/**
* sum_char_codes_three
* This function is technically 0 of N as well because we have to assume the worst case (which is what you'll typically be asked for in interviews)
* The reasoning is the even though there is the possibility to return early we can't assume that it will. The E could be anywhere in the string or not in the 
* string at all.
*/
function sum_char_codes_three(n: string): number {
  let sum = 0;
  for (let i = 0; i < n.length; i++) {
    const charCode = n.charCodeAt(i)
    const CAPITAL_E = 69;

    if (charCode === CAPITAL_E) {
      return sum;
    }
  }

  return sum;
}

/**
* sum_char_codes_o_of_n_squared
* This function runs at o of n squared. O(N^2)
* This is because of the nested for loops. Where we're iterating over the entire length of the string
* each time we iterate over 1 string ing the parent loop.
* for every single character we go over every single character
*/
function sum_char_codes_squared(n: string): number {
  let sum = 0;

  for (let i = 0; i < n.length; i++) {
    for (let j = 0; j < n.length; j++) {
      sum += n.charCodeAt(i)
    }
  }

  return sum;
}

/**
* sum_char_codes_cubed
* This function runs at O of n cubed. O(N^3)
* This is because of the nested for loops
* For each loop, we iterate over the entire length of the string.
* So total number of chars * total number of chars * total number of chars
*/
function sum_char_codes_cubed(n: string): number {
  let sum = 0;

  for (let i = 0; i < n.length; i++) {
    for (let j = 0; j < n.length; j++) {
      for (let k = 0; k < n.length; k++) {
        sum += n.charCodeAt(i)
      }
    }
  }

  return sum;
}

// 0(n log n) - will be shown in quicksort
// 0(log n) - will be shown in binary search trees


