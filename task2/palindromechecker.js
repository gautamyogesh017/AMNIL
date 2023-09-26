// Create a function that checks if a given string is a palindrome (reads the same backward as forward).

const isPalindrome = (str) => {
  const lowerCaseStr = str.toLowerCase();
  const newStr = lowerCaseStr.replace(/[\W_]/g, "");
  const reversedStr = newStr.split("").reverse().join("");

  if (newStr === reversedStr) console.log("The given string  is Palindrome");
  else {
    console.log("The given string is not a Palindrome");
  }
};

let str = "Radar";
isPalindrome(str);
