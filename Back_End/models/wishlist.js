const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: String,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
