const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
