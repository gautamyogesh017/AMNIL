const arraySum = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  return sum;
};

const myArr = [15, 27, 98, 24, 26];
const result = arraySum(myArr);
console.log(result);
