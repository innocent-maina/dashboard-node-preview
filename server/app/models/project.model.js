const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
  sessionId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
  },

});

module.exports = model('Project', ProjectSchema);
