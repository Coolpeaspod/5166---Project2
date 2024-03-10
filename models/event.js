const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const events = [
  {
    id: '1',
    topic: 'Education',
    title: 'Programming NetBeans',
    description: 'Learn programming',
    location: 'Woodward Hall',
    startTime: DateTime.toLocaleString(2024, 2, 23, 15, 45),
    endTime: DateTime.toLocaleString(2024, 2, 23, 16, 45),
    image: '',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
  },
  {
    id: '2',
    topic: 'Free stuff',
    title: 'Free stuff',
    description: 'Learn programming',
    location: 'Woodward Hall',
    startTime: DateTime.toLocaleString(2024, 2, 23, 15, 45),
    endTime: DateTime.toLocaleString(2024, 2, 23, 16, 45),
    image: '',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
  },
  {
    id: '3',
    topic: 'Free stuff',
    title: 'Free stuff 2.0',
    description: 'Learn programming',
    location: 'Woodward Hall',
    startTime: DateTime.toLocaleString(2024, 2, 23, 15, 45),
    endTime: DateTime.toLocaleString(2024, 2, 23, 16, 45),
    image: '',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
  }
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
  let event = events.find(event => event.id === id);
  if (event) {

    event.topic = newEvent.topic;
    event.title = newEvent.title;
    event.description = newEvent.description;
    event.location = newEvent.location;
    event.startTime = newEvent.startTime;
    event.endTime = newEvent.endTime;
    event.image = newEvent.image;

    // Handle image update
    if (newEvent.image) {
      event.image = "/uploads/" + newEvent.image; // Adjust the path as needed

    } else {
      // If newEvent.image is an empty string, set event.image to an empty string
      event.image = "";

      return false;
    }
    return true;
  }

  else {
    return false;
  }
}

exports.deleteById = function (id) {
  let index = events.findIndex((event) => event.id === id);
  if (index !== -1) {
    events.splice(index, 1);
    return true;
  } else {
    return false;
  }
};
