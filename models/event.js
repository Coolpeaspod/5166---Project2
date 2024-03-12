const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const moment = require("moment");

const events = [
  {
    id: "1",
    topic: "Education",
    title: "Programming NetBeans",
    description: "Learn programming",
    location: "Woodward Hall",
    // startTime: DateTime.fromISO("10:00").toLocaleString(DateTime.TIME_SIMPLE),
    // endTime: DateTime.fromISO("11:00").toLocaleString(DateTime.TIME_SIMPLE),
    startTime: DateTime.local(2024, 2, 23, 15, 45),
    endTime: DateTime.local(2024, 2, 23, 16, 45),
    image: "/images/NetBeans.png",
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
  },
  {
    id: "2",
    topic: "Free stuff",
    title: "Free stuff",
    description: "Learn programming",
    location: "Woodward Hall",
    startTime: DateTime.local(2024, 2, 23, 15, 45),
    endTime: DateTime.local(2024, 2, 23, 16, 45),
    image: "",
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
  },
  {
    id: "3",
    topic: "Free stuff",
    title: "Free stuff 2.0",
    description: "Learn programming",
    location: "Woodward Hall",
    startTime: DateTime.local(2024, 2, 23, 15, 45),
    endTime: DateTime.local(2024, 2, 23, 16, 45),
    image: "",
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
  },
];

exports.find = function () {
  return events;
};

exports.findById = function (id) {
  return events.find((event) => event.id === id);
};

exports.save = function (event) {
  event.id = uuidv4();
  event.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);

  events.push(event);
};

exports.updateById = function (id, newEvent) {
  let event = events.find((event) => event.id === id);
  if (event) {
    event.topic = newEvent.topic;
    event.title = newEvent.title;
    event.description = newEvent.description;
    event.location = newEvent.location;
    event.startTime = DateTime.fromISO(newEvent.startTime); //moment method
    event.endTime = DateTime.fromISO(newEvent.endTime);

    // let date = newEvent.When;
    // event.startTime = DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    // let start_time = moment(newEvent.Start, ["HH:mm"]).format("hh:mm A");
    // event.startTime = start_time;
    // let end_time = moment(newEvent.End, ["HH:mm"]).format("hh:mm A");
    // event.endTime = end_time;
    event.ImageURL = newEvent.ImageURL;
    //event.image = newEvent.image;
    return true;
    // event.image = newEvent.image;
    // // Handle image update
    // // if (newEvent.image) {
    // //   event.image = "uploads/" + newEvent.image;
    // // } else {
    // //   // If newEvent.image is an empty string, set event.image to an empty string
    // //   event.image = "";
    // // }

    // return true;
  } else {
    return false;
  }
};

exports.deleteById = function (id) {
  let index = events.findIndex((event) => event.id === id);
  if (index !== -1) {
    events.splice(index, 1);
    return true;
  } else {
    return false;
  }
};
