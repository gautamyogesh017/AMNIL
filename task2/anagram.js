// Write a function that checks if two strings are anagrams of each other (contain the same letters, ignoring spaces and capitalization).

const checkAnagram = (string1, string2) => {
  const length1 = string1.length;
  const length2 = string2.length;

  const sortedStr1 = string1.split("").sort().join("");
  const sortedStr2 = string2.split("").sort().join("");

  if (length1 === length2 && sortedStr1 === sortedStr2) {
    console.log(`"${string1}" and "${string2}" are anagrams.`);
  } else {
    console.log("The words are not anagrams.");
  }
};

const word1 = "heart";
const word2 = "earth";
checkAnagram(word1, word2);
