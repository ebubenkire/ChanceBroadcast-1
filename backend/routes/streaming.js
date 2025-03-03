const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const streamingController = require('../controllers/streamingController');

// @route   POST api/streaming
// @desc    Create a new stream
router.post('/', [
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('streamUrl', 'Stream URL is required').not().isEmpty(),
    check('category', 'Category is required').isIn([
      'live-performance',
      'rehearsal',
      'behind-scenes',
      'competition',
      'other'
    ])
  ]
], streamingController.createStream);

// @route   GET api/streaming/live
// @desc    Get all live streams
router.get('/live', streamingController.getLiveStreams);

// @route   GET api/streaming/:id
// @desc    Get stream by ID
router.get('/:id', streamingController.getStreamById);

// @route   PUT api/streaming/:id/status
// @desc    Update stream status
router.put('/:id/status', [
  auth,
  [
    check('status', 'Status is required').isIn(['scheduled', 'live', 'ended'])
  ]
], streamingController.updateStreamStatus);

// @route   POST api/streaming/:id/chat
// @desc    Add chat message to stream
router.post('/:id/chat', [
  auth,
  [
    check('message', 'Message is required').not().isEmpty()
  ]
], streamingController.addChatMessage);

module.exports = router; 