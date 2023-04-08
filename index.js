const connectToMongo = require("./db/conn.js");
const express = require('express');
const port = 5000;
const app = express();

//to work with json data
app.use(express.json());

//connection
connectToMongo();

app.listen(port, () => {
    console.log(`AlmaPlus backend is listening on port ${port}`);
})