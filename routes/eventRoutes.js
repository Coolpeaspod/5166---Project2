const express = require('express');
const controller = require('../controllers/eventController');

const router = express.Router();


//GET /events: send all the events
// router.get('/', (req, res) => {
//     res.send('send all the events');
// });
router.get('/', controller.index);

// GET /events/new
// router.get('/new', (req, res) => {
//     res.send('send the new form');
// });
router.get('/new', controller.new);

//POST /events
// router.post('/', (req, res) => {
//     res.send('created a new story');
// });
router.post('/', controller.create);

//GET /events/:id
// router.get('/:id', (req, res) => {
//     res.send('send story with id ' + req.params.id);
// });
router.get('/:id', controller.show);

//GET /events/:id/edit:
// router.get('/:id/edit', (req, res) => {
//     res.send('send the edit form');
// });
router.get('/:id/edit', controller.edit);

//PUT /events/:id
// router.put('/:id', (req, res) => {
//     res.send('update story with id: ', req.params.id);
// });
router.put('/:id', controller.update);

//DELETE /events/:id
// router.delete('/:id', (req, res) => {
//     res.send('delete story with id: ', req.params.id);
// });
router.delete('/:id', controller.delete);

module.exports = router;