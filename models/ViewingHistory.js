const mongoose = require('mongoose');

const viewingHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MediaContent',
    required: true
  },
  watchDuration: {
    type: Number,  
    required: true,
    min: 0
  },
  completed: {
    type: Boolean,
    default: false
  },
  lastPosition: {
    type: Number,  
    default: 0
  }
}, {
  timestamps: true
});


viewingHistorySchema.index({ userId: 1, contentId: 1, createdAt: 1 }, { unique: true });

module.exports = mongoose.model('ViewingHistory', viewingHistorySchema);