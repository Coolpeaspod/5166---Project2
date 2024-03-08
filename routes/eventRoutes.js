const express = require("express");
const controller = require("../controllers/eventController");
const events = require("../models/event");
const multer = require("multer");

const router = express.Router();

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

// GET /events: send all the events
router.get("/", controller.index);

// GET /events/new
router.get("/new", controller.new);

// POST /events
router.post("/", upload.single("image"), (req, res, next) => {
  // Retrieve other form data
  const { topic, title, description, location, startTime, endTime } = req.body;

  // Handle image upload
  const image = req.file ? "/uploads/" + req.file.filename : "";

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

// GET /events/:id
router.get("/:id", controller.show);

// GET /events/:id/edit
router.get("/:id/edit", controller.edit);

// PUT /events/:id
router.put("/:id", upload.single("image"), (req, res, next) => {
  const eventId = req.params.id;

  // Retrieve other form data
  const { topic, title, description, location, startTime, endTime } = req.body;

  // Handle image upload
  const image = req.file ? "/uploads/" + req.file.filename : "";

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

  const success = events.updateById(eventId, updatedEvent);

  if (success) {
    // Redirect to the updated event show page or any other desired page
    res.redirect(`/events/${eventId}`);
  } else {
    // Handle error, e.g., event not found
    res.status(404).send("Event not found");
  }
});

router.get("/:id/edit", controller.edit);

router.get("/:id/edit", (req, res) => {
  let id = req.params.id;
  let event = events.findById(id);
  res.render("edit", { id, event });
});

// DELETE /events/:id
router.delete("/:id", controller.delete);

module.exports = router;
