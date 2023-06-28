require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

app.use(express.json());
require("./startup/config")();
require("./startup/db")();
require("./startup/cors")(app);
require("./startup/validation")();
require("./startup/routes")(app);

const port = process.env.PORT || 4000;
app.listen(()=> {
    console.log("now listening at port", port);
});