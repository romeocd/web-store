const { User, Order, Category, Product} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
    }


}


module.exports = resolvers;