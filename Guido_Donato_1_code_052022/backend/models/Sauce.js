const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String },
    name:{ type: String },
    manufacturer:{type: String},
    description: { type: String, required: true },
    mainPepper:{ type: String },
    imageUrl: { type: String, required: true },
    heat:{ type: Number, required: true },
    likes:{type: Number, default: 0 },
    dislikes:{type: Number, default: 0 },
    usersLiked:[String],
    usersDisliked:[String]
    
  });

  module.exports = mongoose.model('Sauce', sauceSchema);


