const connectToMongo = require("./db/conn.js");
const express = require('express');
const port = 5000;

const app = express();
app.use(express.json());

connectToMongo();

app.listen(port, () => {
    console.log(`AlmaPlus backend is listening on port ${port}`);
})