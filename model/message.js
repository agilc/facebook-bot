const mongoose = require('mongoose');

const Message = mongoose.model('Message', new mongoose.Schema({
    message: { type: String, required:true },
    customerId: { type: String, required:true },
    direction: String
  }));


exports.Message = Message; 