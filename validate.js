const validateEmail = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
};
const email = "ram@gmail.com";
const email2 = "djposddfpd.cks";
const test1 = validateEmail(email);
const test2 = validateEmail(email2);

console.log(test1, test2);
