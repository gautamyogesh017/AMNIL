// Write a function that removes duplicate elements from an array.

const removeDuplicates = (arr) => {
  const newArray = [];

  for (let i = 0; i < arr.length; i++) {
    let isUnique = true;

    for (let j = 0; j < newArray.length; j++) {
      if (arr[i] === newArray[j]) {
        isUnique = false;
        break;
      }
    }

    if (isUnique) {
      newArray.push(arr[i]);
    }
  }

  return newArray;
};

const array = [1, 2, 3, 3, 6, 5, 6, 7, 9, 1];
console.log(removeDuplicates(array));
