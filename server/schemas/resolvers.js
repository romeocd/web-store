const { User, Order, Category, Product} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        products: async (parent, { category, name }) => {
            const params = {};

            if(category) {
                params.category = category;
            }

            if(name) {
                params.name = {
                   $regex:name 
                };
            }

            return await Product.find(params).populate('category');
        },
        product: async (parent, { _id }) => {
            return await Product.findById(_id).populate('category');
    },
        user: async (parent, args, context) => {
            if (context.user) {
            const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category'
            });
    
            user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
    
            return user;
            }
    
            throw AuthenticationError;
        },// This is the strip part
        // checkout: async (parent, args, context) => {}

        // const price = await stripe

        // const session = await stripe
        //return { session: };
    },
    Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { token, user };
        },
        addOrder: async (parent, { products }, context) => {
            if (context.user) {
              const order = new Order({ products });
      
              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
      
              return order;
            }
      
            throw AuthenticationError;
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
            return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw AuthenticationError;
        },
        updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;
      
            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
        }
    }
}    
module.exports = resolvers;