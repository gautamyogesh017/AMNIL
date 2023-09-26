// Write a function to reverse a given string without using the built-in `reverse()` method.

const StringReverse = (StringtoReverse) => {
  let myString = "";
  let stringLength = StringtoReverse.length;
  for (let i = stringLength - 1; i >= 0; i--)
    myString = myString + StringtoReverse[i];
  return myString;
};

const StringtoReverse = "abcdefghijklmnopqrstuvwxyz";
console.log(StringReverse(StringtoReverse));
