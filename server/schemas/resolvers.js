const { User, Order, Category, Product} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const resolvers = {
    Query: {
        // Query to fetch all categories
        categories: async () => {
            return await Category.find();
        },
        // Query to fetch products with optional filtering by category and name
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
        // Query to fetch a single product by ID
        product: async (parent, { _id }) => {
            return await Product.findById(_id).populate('category');
    },
        // Query to fetch user information including orders
        user: async (parent, args, context) => {
            if (context.user) {
            const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category'
            });
    
            user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
    
            return user;
            }
            // Handle authentication error
            throw AuthenticationError;
        },
        order: async (parent, { _id }, context) => {
          if(context.user) {
            const user = await User.findById(context.user._id).populate({
              path: 'orders.products',
              populate: 'category'
            });
    
            return user.orders.id(_id);
          }
          throw AuthenticationError;
        },
        // Query to initiate a Stripe checkout session
        checkout: async (parent, args, context) => {
          const url = new URL(context.headers.referer).origin;
          await Order.create({ products: args.products.map(({ _id }) => _id) });
          // eslint-disable-next-line camelcase
          const line_items = [];
    
          // eslint-disable-next-line no-restricted-syntax
          for (const product of args.products) {
            line_items.push({
              price_data: {
                currency: 'usd',
                product_data: {
                  name: product.name,
                  description: product.description,
                  images: [`${url}/images/${product.image}`]
                },
                unit_amount: product.price * 100,
              },
              quantity: product.purchaseQuantity,
            });
          }
    
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${url}/`,
          });
    
          return { session: session.id };
        },
      },
      
    Mutation: {
        // Mutation to create a new user and return a token
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { token, user };
        },
        // Mutation to create a new order
        addOrder: async (parent, { products }, context) => {
            if (context.user) {
              const order = new Order({ products });
      
              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
      
              return order;
            }
      
            throw AuthenticationError;
        },
        // Mutation to update user information
        updateUser: async (parent, args, context) => {
            if (context.user) {
            return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw AuthenticationError;
        },
        // Mutation to update product quantity
        updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;
      
            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },
        // Mutation for user login
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
};

module.exports = resolvers;
