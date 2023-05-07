const express = require("express");
const education_route = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("../middleware/authMiddleware");

education_route.use(bodyParser.json());
education_route.use(bodyParser.urlencoded({ extended: true }));

education_route.use(cookieParser());
education_route.use(express.static('public'));

const education_controller = require("../controllers/educationController");

//Education routes
education_route.post('/addEducation', education_controller.addEducation);
education_route.get('/getEducation', education_controller.getEducation);
education_route.delete('/deleteEducation/:id', education_controller.deleteEducation);
education_route.post('/editEducation', education_controller.editEducation);

module.exports = education_route;


