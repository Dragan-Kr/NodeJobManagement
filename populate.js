require('dotenv').config();

const connectDB = require('./controllers/db/connect');

const Product = require('./controllers/models/Product');

const jsonProducts = require('./products.json');//elemente iz products.json saljemo u bazu podataka


const  start = async()=>{

    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();//brise sve produkte aman iz baze
        await Product.create(jsonProducts);
        console.log('Success!!!!');
        process.exit(0);//0 znaci da je sve proslo kako treba
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();