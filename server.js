const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello Port Russell !');
});

app.listen(PORT, () => {
  console.log(`🚢 Serveur lancé sur http://localhost:${PORT}`);
});
