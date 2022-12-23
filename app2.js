//Store API => https://www.youtube.com/watch?v=qwfE7fSVaZM

require('dotenv').config();//pristup envirement varijablama

//async errors
require('express-async-errors');

const express = require('express');
//extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const app = express();



//connect DB
const connectDB = require('./controllers/db/connect');
const authenticateUser = require('./controllers/models/middleware/authentication');

//routers
const auhtRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');



const mainRouter= require('./routes/main');

const productsRouter = require('./routes/products');


const notFoundMiddleware = require('./controllers/models/middleware/not-found');
const errorMiddleware = require('./controllers/models/middleware/error-handler');

//midleWare

app.set('trust-proxy',1);
app.use(rateLimiter({
    windowMs: 15 * 16 * 1000,//15 minuta
    max:100 //limit each IP to 100 request per windiwMs
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use('/api/v1/',mainRouter);

//routes
// app.get('/',(req,res) =>{
//     res.send('jobs api');
// });

app.use('/api/v1/auth',auhtRouter);
app.use('/api/v1/jobs',authenticateUser,jobsRouter);


app.use('/api/v1/products',productsRouter);

//products route


app.use(notFoundMiddleware);
app.use(errorMiddleware);


const port = process.env.PORT || 3000;

const start = async () =>{
 
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI);

        app.listen(port,console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error);
    }

};

start();