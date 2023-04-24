// require('dotenv').process.env();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectToMongo = require("./db/conn");
const cookieParser = require("cookie-parser");
const port = 5000;

connectToMongo();

//routes
const user_route = require("./routes/userRoute");
const event_route = require('./routes/eventRoute');
const institute_route = require('./routes/instituteRoute');
const course_route = require("./routes/courseRoute");
const post_route = require('./routes/postRoute');
const admin_route = require('./routes/adminRoute');

app.use(cookieParser());
app.use('/api', user_route);
app.use('/api', event_route);
app.use('/api', institute_route);
app.use('/api', course_route);
app.use('/api', post_route);
app.use('/api', admin_route);
app.use("/", (req, res) => {
    res.end("Helloooo");
})

app.listen(port, function () {
    console.log("Server is ready");
})