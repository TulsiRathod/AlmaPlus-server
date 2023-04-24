const Event = require("../models/EventModel");

//Add Events
const addEvents = async (req, res) => {
    try {
        const event = new Event({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            venue: req.body.venue,
            photos: req.images
        });

        const event_data = await event.save();
        res.status(200).send({ success: true, data: event_data });

    } catch (error) {
        res.status(400).send(error.message);
        console.log("Error in Register User : " + error.message);
    }
}


//view Events
const getEvents = async (req, res) => {
    try {
        const evet_data = await Event.find({});
        res.status(200).send({ success: true, data: evet_data });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

//delete event
const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Event.deleteOne({ _id: id });
        res.status(200).send({ success: true, msg: 'Event Deleted successfully' });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

//edit event
const editEvent = async (req, res) => {
    try {
        if (req.images.length != '') {

            var id = req.body.id;
            var title = req.body.title;
            var description = req.body.description;
            var date = req.body.date;
            var venue = req.body.venue;
            var photos = req.images

            const event_data = await Event.findByIdAndUpdate({ _id: id }, { $set: { title: title, description: description, date: date, venue: venue, photos: photos } }, { new: true });
            res.status(200).send({ success: true, msg: 'Event Updated', data: event_data });
        }
        else {
            var id = req.body.id;
            var title = req.body.title;
            var description = req.body.description;
            var date = req.body.date;
            var venue = req.body.venue;

            const event_data = await Event.findByIdAndUpdate({ _id: id }, { $set: { title: title, description: description, date: date, venue: venue } }, { new: true });
            res.status(200).send({ success: true, msg: 'Event Updated', data: event_data });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

//search institute
const searchEvent = async (req, res) => {
    try {
        var search = req.body.search;
        var event_data = await Event.find({ "title": { $regex: ".*" + search + ".*" } });
        if (event_data.length > 0) {
            res.status(200).send({ success: true, msg: "Event Details", data: event_data });
        }
        else {
            res.status(200).send({ success: true, msg: 'Event not Found' });
        }

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = {
    addEvents,
    getEvents,
    deleteEvent,
    editEvent,
    searchEvent
}