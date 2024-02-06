const db = require('./connection');
const { User, Product } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    await cleanDB('Product', 'products');
    await cleanDB('User', 'users');

    const products = await Product.insertMany([
        {
            name:'Product 1',
            description:'',
            image:'',
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 2',
            description:'',
            image:'',
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 3',
            description:'',
            image:'',
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 4',
            description:'',
            image:'',
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 5',
            description:'',
            image:'',
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 6',
            description:'',
            image:'',
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 7',
            description:'',
            image:'',
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 8',
            description:'',
            image:'',
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 9',
            description:'',
            image:'',
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 10',
            description:'',
            image:'',
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 11',
            description:'',
            image:'',
            price: 0.00,
            quantity: 1
        },
        {
            name:'Product 12',
            description:'',
            image:'',
            price: 0.00,
            quantity: 1
        }
    ]);
    console.log('products seeded');

});