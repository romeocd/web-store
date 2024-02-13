const mongoose = require('mongoose');

const { Schema } = mongoose;
// Define the schema for the category
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});
// Compiles the schema into a model and assigns it to the Category variable
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
