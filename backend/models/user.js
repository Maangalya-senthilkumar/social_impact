const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'parent', 'volunteer'], required: true },
  // Only for students and parents: track sessions
  sessions: [
    {
      login: { type: Date },
      logout: { type: Date },
      duration: { type: Number } // duration in seconds
    }
  ],
  attendance: [
    {
      date: { type: Date, required: true }
    }
  ]
  // You can add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;