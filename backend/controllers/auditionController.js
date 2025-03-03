const Audition = require('../models/Audition');
const { validationResult } = require('express-validator');

exports.createAudition = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newAudition = new Audition({
      ...req.body,
      createdBy: req.user.id
    });

    const audition = await newAudition.save();
    res.json(audition);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAuditions = async (req, res) => {
  try {
    const auditions = await Audition.find()
      .sort({ deadline: 1 })
      .populate('createdBy', 'name')
      .populate('applications.applicant', 'name');
    res.json(auditions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.submitApplication = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const audition = await Audition.findById(req.params.id);

    if (!audition) {
      return res.status(404).json({ msg: 'Audition not found' });
    }

    if (audition.status !== 'open') {
      return res.status(400).json({ msg: 'Audition is not open for applications' });
    }

    // Check if already applied
    const existingApplication = audition.applications.find(
      app => app.applicant.toString() === req.user.id
    );

    if (existingApplication) {
      return res.status(400).json({ msg: 'Already applied for this audition' });
    }

    const newApplication = {
      applicant: req.user.id,
      videoUrl: req.body.videoUrl,
      notes: req.body.notes
    };

    audition.applications.unshift(newApplication);
    await audition.save();

    res.json(audition);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const audition = await Audition.findById(req.params.auditionId);
    if (!audition) {
      return res.status(404).json({ msg: 'Audition not found' });
    }

    const application = audition.applications.find(
      app => app._id.toString() === req.params.applicationId
    );

    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    application.status = req.body.status;
    await audition.save();

    res.json(audition);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}; 