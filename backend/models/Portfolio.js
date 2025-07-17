const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: String,
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      link: String,
      techStack: [String]
    }
  ],
  education: [
    {
      institution: String,
      degree: String,
      year: String
    }
  ],
  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
