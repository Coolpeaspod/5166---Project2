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
  // {
  //     id: '2',
  //     title: 'Learning NBAD',
  //     content: 'Network Based App Development class has been fun. I have learned a lot of new things.',
  //     author: "Prasham",
  //     createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
  // },
  // {
  //     id: '3',
  //     title: 'My Spring Break',
  //     content: 'In the Spring Break I plan to hangout with my friends. We are planning to go to skiing in the Spring Break.',
  //     author: "Prasham",
  //     createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
  // }
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

    return true;
  }
  else {
    return false;
  }

  return true;
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
