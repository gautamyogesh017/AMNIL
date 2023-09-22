// Create a function that converts a sentence to title case (capitalize the first letter of each word).

const capitalize = (str) => {
  str = str.toLowerCase().split(" ");
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
};
const myString = "A quick brown fox jumps over the lazy dog";
capitalize(myString);
