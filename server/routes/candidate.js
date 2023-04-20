const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

// get all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// add a new candidate
router.post('/', async (req, res) => {
  const { name, party } = req.body;

  try {
    const candidate = new Candidate({ name, party });
    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
