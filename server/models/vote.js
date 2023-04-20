const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
  ipAddress: { type: String },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
