const mongoose = require('mongoose');

const { Schema } = mongoose;
// Define the schema for the order
const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      // Specifies that each entry in the products array is an ObjectId
      type: Schema.Types.ObjectId,
      // Establishes a reference to the Product model, allowing for population of product details
      ref: 'Product'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
