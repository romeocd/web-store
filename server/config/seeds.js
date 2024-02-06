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
            name:'Bengals Jersey',
            description:'Showcase your team spirit with this authentic Joe Bengals jersey, perfect for game day or casual wear.',
            image:'',
            category: categories[0]._id,
            price: 100.00,
            quantity: 1
        },
        {
            name:'Nike Hoodie',
            description:'Stay cozy and stylish in this light blue Nike hoodie, featuring soft fabric and a classic design for everyday comfort.',
            image:'',
            category: categories[0]._id,
            price: 30.00,
            quantity: 1
        },
        {
            name:'Samsung Dryer',
            description:'Elevate your laundry routine with this energy-efficient Samsung dryer, featuring advanced technology for faster, quieter, and more precise drying.',
            image:'',
            category: categories[1]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Swiffer Wet Jet',
            description:'Make cleaning a breeze with the Swiffer WetJet, an all-in-one mopping system that tackles tough dirt and grime effortlessly.',
            image:'',
            category: categories[1]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Dell Monitor',
            description:'Enhance your workspace with this high-resolution Dell monitor, offering vibrant colors and crystal-clear imagery for an optimal viewing experience.',
            image:'',
            category: categories[2]._id,
            price: 140.00,
            quantity: 1
        },
        {
            name:'Logitech Mouse',
            description:'Experience precision and comfort with this Logitech mouse, designed for seamless navigation and optimal ergonomics.',
            image:'',
            category: categories[2]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Dog Breeds Encyclopedia',
            description:'Dive into the world of canines with this comprehensive Dog Breeds Encyclopedia, packed with information and pictures of various breeds.',
            image:'',
            category: categories[3]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Harry Potter and the Chamber of Secrets',
            description:'Rediscover the magic in Harry Potter and the Chamber of Secrets a spellbinding tale of adventure and mystery in the beloved Harry Potter series.',
            image:'',
            category: categories[3]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Star Wars LEGO ',
            description:'Build your own galaxy adventure with this Star Wars LEGO set, a perfect blend of creativity and nostalgia for fans of all ages.',
            image:'',
            category: categories[4]._id,
            price: 0.00,
            quantity: 1
        },
        {
            name:'Hot Wheels Camaro',
            description:'Speed into action with this sleek Hot Wheels Camaro, a must-have for collectors and car enthusiasts alike.',
            image:'',
            category: categories[4]._id,
            price: 0.00,
            quantity: 1
        },
        
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