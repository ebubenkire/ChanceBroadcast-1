const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const auditionController = require('../controllers/auditionController');

// @route   POST api/auditions
// @desc    Create a new audition
router.post('/', [
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('category', 'Category is required').isIn(['singing', 'dancing', 'acting', 'modeling', 'other']),
    check('deadline', 'Deadline is required').not().isEmpty()
  ]
], auditionController.createAudition);

// @route   GET api/auditions
// @desc    Get all auditions
router.get('/', auditionController.getAuditions);

// @route   POST api/auditions/:id/apply
// @desc    Submit an audition application
router.post('/:id/apply', [
  auth,
  [
    check('videoUrl', 'Video URL is required').not().isEmpty()
  ]
], auditionController.submitApplication);

// @route   PUT api/auditions/:auditionId/applications/:applicationId
// @desc    Update application status (admin only)
router.put('/:auditionId/applications/:applicationId', [
  auth,
  [
    check('status', 'Status is required').isIn(['pending', 'accepted', 'rejected'])
  ]
], auditionController.updateApplicationStatus);

module.exports = router; 