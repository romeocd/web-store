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
            name:'Joe Burrow Bengals Jersey',
            description:'Showcase your team spirit with this authentic Joe Burrow Bengals jersey, perfect for game day or casual wear.',
            image:'joe-burrow-jersey.jpg',
            category: categories[0]._id,
            price: 174.99,
            quantity: 1
        },
        {
            name:'NIKE Sportswear Mens Pullover Club Hoodie',
            description:'Size Large. Stay cozy and stylish in this light blue Nike hoodie, featuring soft fabric and a classic design for everyday comfort.',
            image:'nike-hoodie.jpg',
            category: categories[0]._id,
            price: 39.99,
            quantity: 1
        },
        {
            name:'Shark Navigator Lift-Away Deluxe NV360',
            description:'Experience powerful and effortless cleaning with the Shark Vacuum, designed for deep-cleaning performance on all types of floors and surfaces.',
            image:'shark-vacuum.jpg',
            category: categories[1]._id,
            price: 199.99,
            quantity: 1
        },
        {
            name:'Swiffer WetJet Hardwood and Floor Spray Mop Cleaner',
            description:'Make cleaning a breeze with the Swiffer WetJet, an all-in-one mopping system that tackles tough dirt and grime effortlessly.',
            image:'swiffer-mop.jpg',
            category: categories[1]._id,
            price: 20.00,
            quantity: 1
        },
        {
            name:'Dell 240Hz Gaming Monitor 24.5 Inch Full HD Monitor with IPS Technology, Antiglare Screen, Dark Metallic Grey - S2522HG',
            description:'Enhance your workspace with this high-resolution Dell monitor, offering vibrant colors and crystal-clear imagery for an optimal viewing experience.',
            image:'dell-monitor.jpg',
            category: categories[2]._id,
            price: 249.00,
            quantity: 1
        },
        {
            name:'Logitech M510 Mouse, Wireless Black, 910-001825 (Black)',
            description:'Experience precision and comfort with this Logitech mouse, designed for seamless navigation and optimal ergonomics.',
            image:'logitech-mouse.jpg',
            category: categories[2]._id,
            price: 23.90,
            quantity: 1
        },
        {
            name:'The Dog Encyclopedia (DK Pet Encyclopedias)',
            description:'Dive into the world of canines with this comprehensive Dog Encyclopedia, packed with information and pictures of various breeds.',
            image:'dog-encyclopedia.jpg',
            category: categories[3]._id,
            price: 19.95,
            quantity: 1
        },
        {
            name:'Harry Potter and the Chamber of Secrets',
            description:'Rediscover the magic in Harry Potter and the Chamber of Secrets a spellbinding tale of adventure and mystery in the beloved Harry Potter series.',
            image:'harrypotter-chamber.jpg',
            category: categories[3]._id,
            price: 4.99,
            quantity: 1
        },
        {
            name:'Star Wars LEGO ',
            description:'Build your own galaxy adventure with this Star Wars LEGO set, a perfect blend of creativity and nostalgia for fans of all ages.',
            image:'starwars-lego',
            category: categories[4]._id,
            price: 164.95,
            quantity: 1
        },
        {
            name:'Hot Wheels 1969 Chevy Camaro, Fast & Furious',
            description:'Speed into action with this sleek Hot Wheels Camaro, a must-have for collectors and car enthusiasts alike.',
            image:'hot-wheels.jpg',
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