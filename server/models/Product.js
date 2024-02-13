const mongoose = require('mongoose');

const { Schema } = mongoose;
// Define the schema for the product
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
     // References another document's ObjectId
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});
// Compiles productSchema into a Model and assigns it to the Product variable
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
