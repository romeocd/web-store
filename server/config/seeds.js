const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    await cleanDB('Category', 'categories');
    await cleanDB('Product', 'products');
    await cleanDB('User', 'users');

    const categories = await Category.inserMany([
        { name: 'Clothing'},
        { name: 'Household Supplies'},
        { name: 'Electronics' },
        { name: 'Books' },
        { name: 'Toys' }
    ]);

    console.log('categories seeded');

    const products = await Product.insertMany([
        {
            name:'Product 1',
            description:'',
            image:'',
            category: categories[0]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 2',
            description:'',
            image:'',
            category: categories[0]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 3',
            description:'',
            image:'',
            category: categories[0]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 4',
            description:'',
            image:'',
            category: categories[0]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 5',
            description:'',
            image:'',
            category: categories[0]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 6',
            description:'',
            image:'',
            category: categories[0]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 7',
            description:'',
            image:'',
            category: categories[0]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 8',
            description:'',
            image:'',
            category: categories[0]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 9',
            description:'',
            image:'',
            category: categories[0]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 10',
            description:'',
            image:'',
            category: categories[0]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 11',
            description:'',
            image:'',
            category: categories[0]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 12',
            description:'',
            image:'',
            category: categories[0]._id,
            price: 0.00,
            quantity: 1
        }
    ]);
    console.log('products seeded');

    await User.create({
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@testemail.com',
        password:'Password123',
        orders: [
            {
            products: [products[0]._id]
            }
        ]
    });

    console.log('users seeded');

    process.exit();

});