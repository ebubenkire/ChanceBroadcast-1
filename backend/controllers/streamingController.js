const Stream = require('../models/Stream');
const { validationResult } = require('express-validator');

exports.createStream = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newStream = new Stream({
      ...req.body,
      streamer: req.user.id
    });

    const stream = await newStream.save();
    res.json(stream);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getLiveStreams = async (req, res) => {
  try {
    const streams = await Stream.find({ status: 'live' })
      .populate('streamer', 'name')
      .populate('viewers.user', 'name')
      .sort('-createdAt');
    res.json(streams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getStreamById = async (req, res) => {
  try {
    const stream = await Stream.findById(req.params.id)
      .populate('streamer', 'name')
      .populate('viewers.user', 'name')
      .populate('chat.user', 'name');

    if (!stream) {
      return res.status(404).json({ msg: 'Stream not found' });
    }

    res.json(stream);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Stream not found' });
    }
    res.status(500).send('Server Error');
  }
};

exports.updateStreamStatus = async (req, res) => {
  try {
    const stream = await Stream.findById(req.params.id);

    if (!stream) {
      return res.status(404).json({ msg: 'Stream not found' });
    }

    // Check if user is the streamer
    if (stream.streamer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    stream.status = req.body.status;
    await stream.save();

    res.json(stream);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addChatMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const stream = await Stream.findById(req.params.id);

    if (!stream) {
      return res.status(404).json({ msg: 'Stream not found' });
    }

    const newMessage = {
      user: req.user.id,
      message: req.body.message
    };

    stream.chat.push(newMessage);
    await stream.save();

    // Populate user info for the new message
    const populatedMessage = await Stream.populate(newMessage, {
      path: 'user',
      select: 'name'
    });

    res.json(populatedMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}; 