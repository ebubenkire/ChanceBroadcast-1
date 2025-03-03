const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const eventController = require('../controllers/eventController');

// @route   POST api/events
// @desc    Create a new event
router.post('/', [
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    check('capacity', 'Capacity is required').isNumeric(),
    check('category', 'Category is required').not().isEmpty()
  ]
], eventController.createEvent);

// @route   GET api/events
// @desc    Get all events
router.get('/', eventController.getEvents);

// @route   GET api/events/:id
// @desc    Get event by ID
router.get('/:id', eventController.getEvent);

// @route   POST api/events/:id/register
// @desc    Register for an event
router.post('/:id/register', auth, eventController.registerForEvent);

module.exports = router; 