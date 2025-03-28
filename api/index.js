// api/index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Inbox Agent API is working ✅");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
