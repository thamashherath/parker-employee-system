var express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/mongoose");
var app = express();
const port = process.env.PORT || 3001;
const logger = require("./Logger");
const bodyParser = require("body-parser");
const employee_router = require("./src/employee/routes/employeeRoute");
const { info } = require("winston");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(employee_router);

app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(port, () => {
    logger.info("Example app listening on port " + port);
});
