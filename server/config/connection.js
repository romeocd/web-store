const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://schorij23:xtAqzI2rcInxrAqd@cluster0.9ywdzyb.mongodb.net/mern-shopping?retryWrites=true&w=majority');

module.exports = mongoose.connection;
