const express = require('express');
const app = express();

app.get('/calc', (req, res) => {
  const { num1, num2, op } = req.query;

  if (num1 === undefined || num2 === undefined || op === undefined) {
    return res.json({ error: "num1, num2 and op are required" });
  }

  const a = Number(num1);
  const b = Number(num2);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.json({ error: "num1 and num2 must be valid numbers" });
  }

  let result;
  if (op === 'add') {
    result = a + b;
  } else if (op === 'sub') {
    result = a - b;
  } else if (op === 'mul') {
    result = a * b;
  } else if (op === 'div') {
    if (b === 0) {
      return res.json({ error: "Cannot divide by zero" });
    }
    result = a / b;
  } else {
    return res.json({ error: "Invalid operation. Use add, sub, mul or div" });
  }

  return res.json({
    num1: a,
    num2: b,
    operation: op,
    result: result
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
