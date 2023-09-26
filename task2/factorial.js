const factorial = (num) => {
  if (num < 0) {
    console.log("Please enter a positive integer");
  } else if (num === 0 || num === 1) {
    console.log("The factorial is 1");
  } else {
    let x = 1;
    for (let i = 2; i <= num; i++) {
      x *= i;
    }
    console.log("The factorial is " + x);
  }
};
