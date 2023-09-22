const findSecondLargest = (arr) => {
  const sortedArr = arr.sort((a, b) => a - b);
  const length = sortedArr.length;
  return sortedArr[length - 2];
};

const inputArray = [45, 23, 98, 12, 76, 31, 64, 53];
const secondLargestNumber = findSecondLargest(inputArray);
console.log(`The second largest number in the array is ${secondLargestNumber}`);
