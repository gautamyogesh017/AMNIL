const mergeAndSortArrays = (array1, array2) => {
  const sortedArray1 = array1.sort();
  const sortedArray2 = array2.sort();
  const mergedArrays = [...sortedArray1, ...sortedArray2];
  console.log(`Merged and sorted arrays: ${mergedArrays}`);
};

const inputArray1 = [8, 4, 6, 2];
const inputArray2 = [15, 10, 20, 12];
mergeAndSortArrays(inputArray1, inputArray2);
