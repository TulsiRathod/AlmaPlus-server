const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
// const process.env = require("../process.env/process.env");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const cookieParser = require("cookie-parser");

//method for send mail for reset password
const sendresetpasswordMail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.emailUser,
                pass: process.env.emailPassword
            }
        });

        const mailoptions = {
            from: process.env.emailUser,
            to: email,
            subject: 'For Reset Password',
            // html: '<p>Hello ' + name + ', Please copy the link and <a href="localhost:5000/api/userResetPassword?token=' + token + '" style="color:blue"> reset your password</a></p>'
            html: '<p>Hello ' + name + ', Please copy the link to<a href="http://localhost:5000/api/userResetPassword?token=' + token + '"> reset your password</a></p>'
        }

        transporter.sendMail(mailoptions, function (error, info) {
            if (error) {
                console.log("error while sending : ", error);
            }
            else {
                console.log("Mail has been sent :- ", info.response);
            }
        })

    } catch (error) {
        console.log(error.message);
    }
}


//method for generate jwt token
const createtoken = async (id) => {
    try {
        const token = jwt.sign({ _id: id }, process.env.secret_jwt);
        return token;
    } catch (error) {
        res.status(400).send(error.message);
    }
}


//method for password hashing
const securePassword = async (password) => {
    try {
        const passwordhash = await bcryptjs.hash(password, 10);
        return passwordhash;
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Register user
const registerUser = async (req, res) => {
    try {

        const spassword = await securePassword(req.body.password);

        const user = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            gender: req.body.gender,
            nationality: req.body.nationality,
            dob: req.body.dob,
            address: req.body.address,
            profilepic: req.file.filename,
            phone: req.body.phone,
            email: req.body.email,
            password: spassword,
            languages: req.body.languages,
            github: req.body.github,
            linkedin: req.body.linkedin,
            portfolioweb: req.body.portfolioweb,
            institute: req.body.institute,
            yearofjoining: req.body.yearofjoining,
            course: req.body.course,
            skills: req.body.skills,
            companyname: req.body.companyname,
            designation: req.body.designation,
            experience: req.body.experience,
            role: req.body.role
        });

        const userData = await User.findOne({ email: req.body.email });

        if (userData) {
            res.status(400).send({ success: false, msg: "User already exists" });
        }
        else {
            // //method2
            // const token = await user.createtoken();
            // console.log("token part : " + token);
            // res.cookie("jwt", token, {
            //     expires: new Date(Date.now() + 30000),
            //     httpOnly: true
            // });
            // console.log("Cookie : ", cookie);
            // //---

            const token = await createtoken();
            res.cookie('jwt_token', token, { httpOnly: true });

            console.log("token part : " + token);

            const user_data = await user.save();
            res.status(200).send({ success: true, data: token });

        }

    } catch (error) {
        res.status(400).send(error.message);
        console.log("Error in Register User : " + error.message);
    }
}

//Login user
const userlogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email: email });

        if (userData) {
            const passwordMatch = await bcryptjs.compare(password, userData.password);

            if (passwordMatch) {
                // //method2
                // const token = await userData.createtoken();
                // console.log("token part : " + token);
                // res.cookie("jwt", token, {
                //     expires: new Date(Date.now() + 5000),
                //     httpOnly: true,
                // });
                // console.log(`this is the cookie : ${req.cookies.jwt}`);
                // //----

                //method1
                const tokenData = await createtoken(userData._id);
                res.cookie('jwt_token', tokenData, { httpOnly: true });

                const userResult = {
                    _id: userData._id,
                    fname: userData.fname,
                    lname: userData.lname,
                    gender: userData.gender,
                    nationality: userData.nationality,
                    dob: userData.dob,
                    address: userData.address,
                    profilepic: userData.profilepic,
                    phone: userData.phone,
                    email: userData.email,
                    password: userData.password,
                    languages: userData.languages,
                    github: userData.github,
                    linkedin: userData.linkedin,
                    portfolioweb: userData.portfolioweb,
                    institute: userData.institute,
                    yearofjoining: userData.yearofjoining,
                    course: userData.course,
                    skills: userData.skills,
                    companyname: userData.companyname,
                    designation: userData.designation,
                    experience: userData.experience,
                    role: userData.role,
                    token: tokenData
                }

                const response = {
                    success: true,
                    msg: "user details",
                    data: userResult
                }

                console.log(tokenData);
                res.status(200).send(response);
            }
            else {
                // console.log("password incorrect")
                res.status(400).send({ success: false, msg: "Login details are incorrect (password incorrect)" });
            }
        } else {
            // console.log("email not exists");
            res.status(400).send({ success: false, msg: "Login details are incorrect (Register First)" });
        }

    } catch (error) {
        res.status(400).send(error.message);
        console.log("Error in Login User : " + error.message);
    }
}


//user update password
const updatePassword = async (req, res) => {
    try {

        const user_id = req.body.user_id;
        const password = req.body.password;

        const data = await User.findOne({ _id: user_id });
        if (data) {
            const newpassword = await securePassword(password);
            const userData = await User.findByIdAndUpdate({ _id: user_id }, {
                $set: {
                    password: newpassword
                }
            });

            res.status(200).send({ success: true, msg: "Your password has been updated" });
        }
        else {
            res.status(200).send({ success: false, msg: "User Id not found!" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

//forget password
const forgetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.findOne({ email: email });
        if (userData) {
            const randomString = randomstring.generate();
            const data = await User.updateOne({ email: email }, {
                $set: {
                    token: randomString
                }
            });

            sendresetpasswordMail(userData.fname, userData.email, randomString);

            res.status(200).send({ success: true, msg: "Please Check your inbox of mail and reset your password" });

        }
        else {
            res.status(200).send({ success: true, msg: "This Email is not exists!" });
        }

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const resetpassword = async (req, res) => {
    try {
        const token = req.query.token;
        const tokenData = await User.findOne({ token: token });
        if (tokenData) {
            const password = req.body.password;
            const newpassword = await securePassword(password);
            const userData = await User.findByIdAndUpdate({ _id: tokenData._id }, {
                $set: {
                    password: newpassword,
                    token: ''
                }
            }, { new: true });

            res.status(200).send({ success: true, msg: "user password has been reset!", data: userData });
        }
        else {
            res.status(200).send({ success: true, msg: "This link has been expired!" });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

//user profile edit and update
const userProfileEdit = async (req, res) => {
    try {
        if (req.file !== undefined) {
            var id = req.body.id;
            var fname = req.body.fname;
            var lname = req.body.lname;
            var gender = req.body.gender;
            var nationality = req.body.nationality;
            var dob = req.body.dob;
            var address = req.body.address;
            var profilepic = req.file.filename;
            var phone = req.body.phone;
            var email = req.body.email;
            // var password = spassword;
            var languages = req.body.languages;
            var github = req.body.github;
            var linkedin = req.body.linkedin;
            var portfolioweb = req.body.portfolioweb;
            var institute = req.body.institute;
            var yearofjoining = req.body.yearofjoining;
            var course = req.body.course;
            var skills = req.body.skills;
            var companyname = req.body.companyname;
            var designation = req.body.designation;
            var experience = req.body.experience;
            var role = req.body.role

            await User.findByIdAndUpdate({ _id: id }, { $set: { fname: fname, lname: lname, gender: gender, nationality: nationality, dob: dob, address: address, profilepic: profilepic, phone: phone, email: email, languages: languages, github: github, linkedin: linkedin, portfolioweb: portfolioweb, institute: institute, yearofjoining: yearofjoining, course: course, skills: skills, companyname: companyname, designation: designation, experience: experience, role: role } });

            res.status(200).send({ success: true, msg: 'User Profile Updated' });
        }
        else {
            var id = req.body.id;
            var fname = req.body.fname;
            var lname = req.body.lname;
            var gender = req.body.gender;
            var nationality = req.body.nationality;
            var dob = req.body.dob;
            var address = req.body.address;
            var phone = req.body.phone;
            var email = req.body.email;
            // var password = password;
            var languages = req.body.languages;
            var github = req.body.github;
            var linkedin = req.body.linkedin;
            var portfolioweb = req.body.portfolioweb;
            var institute = req.body.institute;
            var yearofjoining = req.body.yearofjoining;
            var course = req.body.course;
            var skills = req.body.skills;
            var companyname = req.body.companyname;
            var designation = req.body.designation;
            var experience = req.body.experience;
            var role = req.body.role

            await User.findByIdAndUpdate({ _id: id }, { $set: { fname: fname, lname: lname, gender: gender, nationality: nationality, dob: dob, address: address, phone: phone, email: email, languages: languages, github: github, linkedin: linkedin, portfolioweb: portfolioweb, institute: institute, yearofjoining: yearofjoining, course: course, skills: skills, companyname: companyname, designation: designation, experience: experience, role: role } });
            res.status(200).send({ success: true, msg: 'User Items Updated' });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

//search user
const searchUser = async (req, res) => {
    try {

        var search = req.body.search;
        var user_data = await User.find({ "fname": { $regex: ".*" + search + ".*" } });
        if (user_data.length > 0) {
            res.status(200).send({ success: true, msg: "User Details", data: user_data });
        }
        else {
            res.status(200).send({ success: true, msg: 'No User Found' });
        }

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

//Logout
const userLogout = async (req, res) => {
    try {
        // res.cookie('jwt_token', '');
        res.clearCookie("jwt_token");
        res.status(200).send({ success: true, msg: "successfully Loged Out" });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = {
    registerUser,
    userlogin,
    updatePassword,
    forgetPassword,
    resetpassword,
    userProfileEdit,
    searchUser,
    userLogout
}