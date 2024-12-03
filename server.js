const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.get('/', (req, res) => {
  res.send('Hello from Google Cloud Run!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
