const Joi = require('joi');
const mongoose = require('mongoose');

const Message = mongoose.model('Message', new mongoose.Schema({
    message: { type: String, required:true },
    customerId: { type: String, required:true },
    direction: String
  }));
  
  function validateMessage(product) {
    const schema = {
      message: Joi.string().required(), 
      customerId: Joi.string().required(),
      direction: Joi.string()
    };
  
    return Joi.validate(product, schema);
  }
  

exports.Message = Message; 
exports.validateMessage = validateMessage;