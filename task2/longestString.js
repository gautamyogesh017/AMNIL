// Write a function that finds and returns the longest word in a sentence.
const findLongestWord = (sentence) => {
  let maxLength = 0;
  const words = sentence.split(" ");
  let length = words.length;
  for (let i = 0; i < length; i++) {
    const word = words[i];
    const modifiedWord = word.replace(/[^a-zA-Z0-9]/g, ""); // removed all the spaces

    if (modifiedWord.length > maxLength) {
      longestWord = modifiedWord;
      maxLength = modifiedWord.length;
    }
  }

  return longestWord;
};

const sentence = "A quick brown fox jumps over the mountains";
findLongestWord(sentence);
