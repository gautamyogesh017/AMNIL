// Implement a function that generates the Fibonacci sequence up to a specified number of terms.

const fibonacci = (n) => {
  let arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr;
};

const terms = 10;
console.log(fibonacci(terms));
