const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv")
const {routesInit} = require("./routes/configRoutes")

dotenv.config()
require("./db/mongoConnect")

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));
routesInit(app);


const server = http.createServer(app);

let port = process.env.PORT || 3001;

server.listen(port);