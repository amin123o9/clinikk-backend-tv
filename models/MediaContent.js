const mongoose = require('mongoose');

const mediaContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  contentType: {
    type: String,
    enum: ['video', 'audio'],
    required: true
  },
  duration: {
    type: Number,  
    required: true,
    min: 0
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  thumbnailUrl: {
    type: String,
    trim: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  viewsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MediaContent', mediaContentSchema);
