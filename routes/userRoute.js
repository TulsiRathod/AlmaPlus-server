const express = require("express");
const user_route = express();
const bodyParser = require("body-parser");


user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const path = require('path');

user_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/userImages'), function (error, sucess) {
            if (error) throw error
        });
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name, function (error1, success1) {
            if (error1) throw error1
        })

    }
});

const upload = multer({ storage: storage });

const user_controller = require("../controllers/userController");

//user routes
user_route.post('/registerUser', upload.single('profilepic'), user_controller.registerUser);

user_route.post('/userLogin', user_controller.userlogin);
user_route.post('/userUpdatePassword', user_controller.updatePassword);
user_route.post('/userForgetPassword', user_controller.forgetPassword);
user_route.get('/userResetPassword', user_controller.resetpassword);
user_route.post('/userProfileEdit', upload.single('profilepic'), user_controller.userProfileEdit);
user_route.get('/searchUser', user_controller.searchUser);
user_route.get('/userLogout', user_controller.userLogout);


module.exports = user_route;


