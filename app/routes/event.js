const express = require('express');
const upload = require('../utils/fileHandler');
const { verifyToken } = require('../middlewares/authorization');
const eventController = require('../controllers/eventController');
const { eventValidationRules } = require('../validators/eventValidator');
const router = express.Router();

// Apply token verification to all event routes
router.use(verifyToken);

// Add an event
router.post('/createEvents', upload.single('eventImage'), eventValidationRules(), eventController.addEvent);

// Get all events with pagination
router.get('/getEvents', eventController.getEvents);

// Edit an event
router.put('/updateEvents/:id', upload.single('eventImage'), eventValidationRules(), eventController.editEvent);

// Delete an event
router.delete('/deleteEvents/:id', eventController.deleteEvent);

// Like an event
router.post('/events/:id/like', eventController.likeEvent);

// Dislike an event
router.post('/events/:id/dislike', eventController.dislikeEvent);

module.exports = router;
