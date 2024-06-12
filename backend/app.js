const express = require("express");
const cors = require("cors");


const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SET STATIC FOLDER PUBLIC
app.use(express.static("public"));

// IMPORT ROUTERS
const routers = require("./routes");
app.use(routers);

// SETTING SERVER LISTENER
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});