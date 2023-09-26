const calculatePower = (x, n) => {
  let result = 1;
  for (let i = 0; i < n; i++) {
    result = result * x;
  }
  return result;
};

const x = 5;
const n = 2;
const result = calculatePower(x, n);
console.log(result);
