const missingNum = (array) => {
  let sum = 0;
  let n = array.length;

  let Sum = (n * (n + 1)) / 2;
  for (let i = 0; i < n; i++) {
    sum = sum + array[i];
  }
  return Sum - sum;
};
const array = [1, 3, 4, 5];
const result = missingNum(array);
console.log(`The missing number ${result}.`);
