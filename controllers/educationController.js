const Education = require("../models/educationModel");

//Add education
const addEducation = async (req, res) => {
    try {
        const education = new Education({
            userid: req.body.userid,
            institutename: req.body.institutename,
            course: req.body.course,
            joinyear: req.body.joinyear,
            endyear: req.body.endyear,
        });
        const education_data = await education.save();
        res.status(200).send({ success: true, data: education_data });
        // console.log(course);
    } catch (error) {

    }
}


//get education
const getEducation = async (req, res) => {
    try {
        const education_data = await Education.find({ userid: req.body.userid });
        res.status(200).send({ success: true, data: education_data });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

//delete education
const deleteEducation = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Education.deleteOne({ _id: id });
        res.status(200).send({ success: true, msg: 'education Deleted successfully' });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

//edit education
const editEducation = async (req, res) => {
    try {
        var id = req.body.id;
        var institutename = req.body.institutename;
        var course = req.body.course;
        var joinyear = req.body.joinyear;
        var endyear = req.body.endyear;

        const education_data = await Education.findByIdAndUpdate({ _id: id }, { $set: { institutename: institutename, course: course, joinyear: joinyear, endyear: endyear } }, { new: true });
        res.status(200).send({ success: true, msg: 'education Updated', data: education_data });

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = {
    addEducation,
    getEducation,
    deleteEducation,
    editEducation,
}