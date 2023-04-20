const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const Vote = require('../models/vote');

// vote for a candidate
router.post('/', async (req, res) => {
  const { candidateId } = req.body;
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    // check if the voter has already voted for this candidate
    const existingVote = await Vote.findOne({ candidate: candidateId, ipAddress });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted for this candidate' });
    }

    // increment the vote count for the candidate
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    candidate.votes++;
    await candidate.save();

    // save the vote to the database
    const vote = new Vote({ candidate: candidateId, ipAddress });
    await vote.save();

    res.json(candidate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
