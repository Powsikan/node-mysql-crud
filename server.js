// server.js
const express = require("express");
const bodyParser = require("body-parser");
const settingsRoutes = require("./routes/settings");

const app = express();

app.use(bodyParser.json());
app.use("/settings", settingsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
