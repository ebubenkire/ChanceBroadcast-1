const Event = require('../models/Event');
const { validationResult } = require('express-validator');

exports.createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newEvent = new Event({
      ...req.body,
      createdBy: req.user.id
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 })
      .populate('createdBy', 'name');
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('registeredUsers', 'name');

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user already registered
    if (event.registeredUsers.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already registered for this event' });
    }

    // Check capacity
    if (event.registeredUsers.length >= event.capacity) {
      return res.status(400).json({ msg: 'Event is full' });
    }

    event.registeredUsers.push(req.user.id);
    await event.save();

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}; 