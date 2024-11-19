const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./connect");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors({ origin: "*" }));
const routesRoute = require("./routes");
app.use(bodyParser.json());
connect();
app.use("/", routesRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
