require("dotenv").config({
  path: "./.env",
});
require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const router = require("routes/api");
const { swaggerUIServe, swaggerUISetup } = require("kernels/api-docs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const db = require("configs/ConnectDB");

const app = express();
app.disable("x-powered-by");

// connect db
db.connect();

app.use(express.urlencoded({ extended: true }));

// app.use(expressLayouts);
// app.set("layout", "layouts/index");
// app.set("views", path.join(__dirname, "views/layouts"));
// app.set("view engine", "ejs");

// // user css, js
// app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use("/api", [], router);
app.use(express.json());

// todo: swagger
app.use("/api-docs", swaggerUIServe, swaggerUISetup);

module.exports = app;
