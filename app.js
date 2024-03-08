//require modules
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const eventRoutes = require("./routes/eventRoutes");
const { DateTime } = require("luxon");
const events = require("./models/event");
//create app
const app = express();

//configure app
let port = 3000;
let host = "localhost";
app.set("view engine", "ejs");

//mount middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(methodOverride("_method"));

//set up routes
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/events", eventRoutes);

app.get("/events/:id", (req, res) => {
  let event = events.findById(req.params.id);
  let id = req.params.id;

  // Format times in 12-hour format

  res.render("event/show", {
    event,
    description,
    location,
    startTime,
    endTime,
    image,
  });
});

app.get("/events/:id/edit", (req, res) => {
  let id = req.params.id;
  res.render("edit", { id });
});

app.get("/events/new", (req, res) => {
  const newEvent = createNewEvent();
  console.log("New Event:", newEvent); // Add this line to check the new event object

  res.render("event/new", { event: newEvent });
});

app.use((err, req, res, next) => {
  if (!err.status) {
    console.log(err.stack);
    err.status = 500;
    err.message = "Internal server error";
  }
  res.status(err.status);
  res.render("error", { error: err });
});

app.get("/events/:id/edit", (req, res) => {
  let id = req.params.id;
  let event = events.findById(id);
  res.render("edit", { id, event });
});

//start the server
app.listen(port, host, () => {
  console.log("Server is running on port, ", port);
});
