// Write a function that counts the number of vowels in a given string

const countVowels = (string) => {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (
      string[i] === "a" ||
      string[i] === "e" ||
      string[i] === "i" ||
      string[i] === "o" ||
      string[i] === "u"
    ) {
      count++;
    }
  }
  return count;
};

const string = "A quick brown fox jumps over the lazy dog";

console.log(countVowels(string));
