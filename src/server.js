const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const budget = {
  myBudget: [
    { title: 'Eat out', budget: 25 },
    { title: 'Rent', budget: 275 },
    { title: 'Grocery', budget: 110 },
    { title: 'Play', budget: 120 },
    { title: 'Work', budget: 100 },
    { title: 'Stocks', budget: 150 },
    { title: 'Cosmetics', budget: 190 },
    { title: 'Movies', budget: 85 }
  ]
};

app.get('/budget', (req, res) => {
  res.json(budget);
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
