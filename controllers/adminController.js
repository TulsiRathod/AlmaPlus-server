const Admin = require("../models/adminModel");
const bcryptjs = require("bcryptjs");
const config = require("../config/config");
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
                user: config.emailUser,
                pass: config.emailPassword
            }
        });

        const mailoptions = {
            from: config.emailUser,
            to: email,
            subject: 'For Reset Password',
            // html: '<p>Hello ' + name + ', Please copy the link and <a href="localhost:5000/api/userResetPassword?token=' + token + '" style="color:blue"> reset your password</a></p>'
            html: '<p>Hello ' + name + ', Please copy the link to<a href="http://localhost:5000/api/resetpassword?token=' + token + '"> reset your password</a></p>'
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
        const token = jwt.sign({ _id: id }, config.secret_jwt);
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

//Register admin
const registerAdmin = async (req, res) => {
    try {

        const spassword = await securePassword(req.body.password);

        const admin = new Admin({
            fname: req.body.fname,
            lname: req.body.lname,
            phone: req.body.phone,
            email: req.body.email,
            password: spassword,
            profilepic: '/adminImages/' + req.file.filename,
        });

        const adminData = await Admin.findOne({ email: req.body.email });

        if (adminData) {
            res.status(400).send({ success: false, msg: "Admin already exists" });
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

            // console.log("token part : " + token);

            const admin_data = await admin.save();
            res.status(200).send({ success: true, data: admin_data });

        }

    } catch (error) {
        res.status(400).send(error.message);
        console.log("Error in Register Admin : " + error.message);
    }
}


//Login admin
const adminlogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const adminData = await Admin.findOne({ email: email });

        if (adminData) {
            const passwordMatch = await bcryptjs.compare(password, adminData.password);

            if (passwordMatch) {

                // //method2
                // const token = await adminData.createtoken();
                // console.log("token part : " + token);
                // res.cookie("jwt", token, {
                //     expires: new Date(Date.now() + 5000),
                //     httpOnly: true,
                // });
                // console.log(`this is the cookie : ${req.cookies.jwt}`);
                // //----

                //method1
                const tokenData = await createtoken(adminData._id);
                res.cookie('jwt_token', tokenData, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });

                const adminResult = {
                    _id: adminData._id,
                    fname: adminData.fname,
                    lname: adminData.lname,
                    phone: adminData.phone,
                    email: adminData.email,
                    password: adminData.password,
                    profilepic: adminData.profilepic,
                    // token: tokenData
                }

                const response = {
                    success: true,
                    msg: "user details",
                    data: adminResult
                }

                // console.log(tokenData);
                res.status(200).send(response);
            }
            else {
                // console.log("password incorrect")
                res.status(400).send({ success: false, msg: "Admin Login details are incorrect (password incorrect)" });
            }
        } else {
            // console.log("email not exists");
            res.status(400).send({ success: false, msg: "Admin Login details are incorrect (Register First)" });
        }

    } catch (error) {
        res.status(400).send(error.message);
        console.log("Error in Login Admin : " + error.message);
    }
}


//admin update password
const updatePassword = async (req, res) => {
    try {
        const admin_id = req.body.admin_id;
        const password = req.body.password;

        const data = await Admin.findOne({ _id: admin_id });
        if (data) {
            const newpassword = await securePassword(password);
            const adminData = await Admin.findByIdAndUpdate({ _id: admin_id }, {
                $set: {
                    password: newpassword
                }
            });

            res.status(200).send({ success: true, msg: "Your password has been updated" });
        }
        else {
            res.status(200).send({ success: false, msg: "Admin Id not found!" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

//forget password
const forgetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const adminData = await Admin.findOne({ email: email });
        if (adminData) {
            const randomString = randomstring.generate();
            const data = await Admin.updateOne({ email: email }, {
                $set: {
                    token: randomString
                }
            });

            sendresetpasswordMail(adminData.fname, adminData.email, randomString);

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
        const tokenData = await Admin.findOne({ token: token });
        if (tokenData) {
            const password = req.body.password;
            const newpassword = await securePassword(password);
            const adminData = await Admin.findByIdAndUpdate({ _id: tokenData._id }, {
                $set: {
                    password: newpassword,
                    token: ''
                }
            }, { new: true });

            res.status(200).send({ success: true, msg: "admin password has been reset!", data: adminData });
        }
        else {
            res.status(200).send({ success: true, msg: "This link has been expired!" });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


//Logout
const adminLogout = async (req, res) => {
    try {
        // res.cookie('jwt_token', '');
        res.clearCookie("jwt_token");
        res.status(200).send({ success: true, msg: "successfully Loged Out" });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

//admin profile edit and update
const adminProfileEdit = async (req, res) => {
    try {
        if (req.file !== undefined) {
            var id = req.body.id;
            var fname = req.body.fname;
            var lname = req.body.lname;
            var phone = req.body.phone;
            var email = req.body.email;
            // var password = spassword;
            var profilepic = '/adminImages/' + req.file.filename;

            await Admin.findByIdAndUpdate({ _id: id }, { $set: { fname: fname, lname: lname, phone: phone, email: email, profilepic: profilepic } });

            res.status(200).send({ success: true, msg: 'Admin Updated' });
        }
        else {
            var id = req.body.id;
            var fname = req.body.fname;
            var lname = req.body.lname;
            var phone = req.body.phone;
            var email = req.body.email;
            // var password = spassword;
            // var profilepic = '/adminImages/' + req.file.filename;

            await Admin.findByIdAndUpdate({ _id: id }, { $set: { fname: fname, lname: lname, phone: phone, email: email } });

            res.status(200).send({ success: true, msg: 'Admin Updated' });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = {
    registerAdmin,
    adminlogin,
    forgetPassword,
    resetpassword,
    updatePassword,
    adminLogout,
    adminProfileEdit
}