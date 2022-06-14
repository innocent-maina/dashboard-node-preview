const { Schema, model } = require('mongoose');

const PreviewSchema = new Schema({
  previewId: {
    type: String,
    required: false,
  },
  previewData: {
    type: String,
    required: false,
  },

});

module.exports = model('Preview', PreviewSchema);
