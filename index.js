require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectToMongo = require("./db/conn");
const cookieParser = require("cookie-parser");
const port = 5000;
const cors = require('cors');

connectToMongo();

//routes
const user_route = require("./routes/userRoute");
const event_route = require('./routes/eventRoute');
const institute_route = require('./routes/instituteRoute');
const course_route = require("./routes/courseRoute");
const post_route = require('./routes/postRoute');
const admin_route = require('./routes/adminRoute');

app.use(cors());
app.use(cookieParser());
app.use('/api', user_route);
app.use('/api', event_route);
app.use('/api', institute_route);
app.use('/api', course_route);
app.use('/api', post_route);
app.use('/api', admin_route);
app.get("/", (req, res) => {
    res.end("Hellooo");

})

app.use(express.static('public'));

app.listen(port, function () {
    console.log("Server is ready");
})