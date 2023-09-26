// Write a function that reverses the order of words in a sentence.

const reverseWords = (str) => {
  let reversed = "";
  const words = str.split(" ");

  for (let i = words.length - 1; i >= 0; i--) {
    reversed = reversed + words[i] + "";
  }

  return reversed.trim();
};

const str = "World Hello!";
const result = reverseWords(str);
console.log(result);
