const { User, Order, Category, Product} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk-test_secret API key'); // Replace with your Stripe secret API key


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
        // Query to initiate a Stripe checkout session
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];

            const { products } = await order.populate('products');

            for (let i = 0; i < products.length; i++) {
                // Create a product with Stripe
                const product = await stripe.products.create({
                  name: products[i].name,
                  description: products[i].description,
                  images: [`${url}/images/${products[i].image}`]
                });
                // Creates the price id from the product id
                const price = await stripe.prices.create({
                  product: product.id,
                  unit_amount: products[i].price * 100,
                  currency: 'usd',
                });
                //push price id to the line items array
                line_items.push({
                  price: price.id,
                  quantity: 1
                });
            }
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
              });
        
              return { session: session.id };
            }
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

        },
        
        addProduct: async (parent, { name, description, image, quantity, price, category }) => {
          //Check if the user is authenticated
          if (!context.user) {
            throw new AuthenticationError('You need to be logged in to perform this action')
          }

          //Find the category by name
          let categoryObj = await Category.findOne({
            name: category
          });

          //If category doesn't exist, create a new one
          if (!categoryObj) {
            categoryObj = new Category({ name: category });
            await categoryObj.save()
          }
          
          const newProduct = new Product({
              name,
              description,
              image,
              quantity,
              price,
              
              category: categoryObj.id
          });

          await newProduct.save();

          return newProduct;
      },
  }
};

module.exports = resolvers;
