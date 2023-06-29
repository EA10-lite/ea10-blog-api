require("dotenv").config();
require("express-async-errors");

const { specs, swaggerUi } = require("./utils/swagger");
const { logger } = require("./utils/transport");
const error = require("./middlewares/error");
const express = require("express");
const app = express();

app.use(express.json());
require("./startup/cors")(app);
require("./startup/config")();
require("./startup/db")();
require("./startup/validation")();
require("./startup/routes")(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use(error);

const port = process.env.PORT || 4000;
app.listen(port, ()=> {
    logger.info("listening for requests at port", port);
});