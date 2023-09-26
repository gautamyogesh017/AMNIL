const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (isNaN(weight) || isNaN(height) || height <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid input. Please enter valid weight and height." });
  }

  // Calculate BMI
  const bmi = weight / Math.pow(height / 100, 2);

  // Determine BMI category
  let category;
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal Weight";
  } else if (bmi >= 24.9 && bmi < 29.9) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  // Create a response object with BMI and category
  const result = {
    bmi: bmi.toFixed(2),
    category,
  };

  // Send the response as JSON
  res.json(result);
});

app.listen(port, () => console.log(`Server is running on port ${port}!`));
