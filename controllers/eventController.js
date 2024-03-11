// const model = require('../models/event');

// //GET /events: send all the events
// exports.index = (req, res) => {
//     // res.send('send all the stories');
//     let events = model.find();
//     res.render('./event/index', { events });
// };

// // GET /events/new
// exports.new = (req, res) => {
//     // res.send('send the new form');
//     res.render('./event/new');
// };

// //POST /events
// exports.create = (req, res) => {
//     //res.send('created a new story');
//     console.log(req.body);
//     let event = req.body;
//     model.save(event);
//     res.redirect('/events');
// };

// //GET /events/:id
// exports.show = (req, res, next) => {
//     let id = req.params.id;
//     let event = model.findById(id);
//     // res.send('send event with id ' + req.params.id);
//     if (event) {
//         res.render('./event/show', { event });
//     }
//     else {
//         // res.status(404).send('Cannot find event with id: ' + id);
//         let err = Error("Cannot find event with id " + id);
//         err.status = 404;
//         next(err);
//     }

// };

// //GET /events/:id/edit:
// exports.edit = (req, res, next) => {
//     //res.send('send the edit form');
//     let id = req.params.id;
//     let event = model.findById(id);
//     if (event) {
//         res.render('./event/edit', { event });
//     }
//     else {
//         // res.status(404).send('Cannot find event with id: ' + id);
//         let err = Error("Cannot find event with id " + id);
//         err.status = 404;
//         next(err);
//     }
// };

// //PUT /events/:id
// exports.update = (req, res, next) => {
//     //res.status(200).send(`update event with id: ${req.params.id}`);
//     //res.send('update event with id: ', req.params.id);
//     let event = req.body;
//     //console.log(event);
//     let id = req.params.id;
//     if (model.updateById(id, event)) {
//         res.redirect('/events/' + id);
//     }
//     else {
//         // res.status(404).send('Cannot find event with id: ' + id);
//         let err = Error("Cannot find event with id " + id);
//         err.status = 404;
//         next(err);
//     }
// };

// //DELETE /events/:id
// exports.delete = (req, res, next) => {
//     //res.send('delete event with id: ', req.params.id);
//     let id = req.params.id;
//     if (model.deleteById(id)) {
//         res.redirect('/events');
//     }
//     else {
//         // res.status(404).send('Cannot find event with id: ' + id);
//         let err = Error("Cannot find event with id " + id);
//         err.status = 404;
//         next(err);
//     }
// };


const multer = require("multer");

// configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Adjust the file size limit as needed
});

// ...

// POST /events
router.post("/", upload.single("image"), (req, res, next) => {
    // Handle image upload
    const image = req.file ? "/uploads/" + req.file.filename : "";

    // Retrieve other form data
    const { topic, title, description, location, startTime, endTime } = req.body;

    // Create a new event
    const newEvent = {
        topic,
        title,
        description,
        location,
        startTime,
        endTime,
        image,
    };

    // Save the event
    events.save(newEvent);

    // Redirect to the event show page or any other desired page
    res.redirect(`/events/${newEvent.id}`);
});

// PUT /events/:id
router.put("/:id", upload.single("image"), (req, res, next) => {
    // Handle image upload
    const image = req.file ? "/uploads/" + req.file.filename : "";

    // Retrieve other form data
    const { topic, title, description, location, startTime, endTime } = req.body;

    // Update the event by ID
    const updatedEvent = {
        topic,
        title,
        description,
        location,
        startTime,
        endTime,
        image,
    };

    const success = events.updateById(req.params.id, updatedEvent);

    if (success) {
        // Redirect to the updated event show page or any other desired page
        res.redirect(`/events/${req.params.id}`);
    } else {
        // Handle error, e.g., event not found
        res.status(404).send("Event not found");
    }
});