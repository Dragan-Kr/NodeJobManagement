// const express = require('express');
// const app = express();

// const tasks = require('./routes/tasks');

// const connectDB = require('./controllers/db/connect');
// const notFound = require('./controllers/models/middleware/not-found');
// const errorHandlerMiddleware = require('./controllers/models/middleware/error-handler');
// //midlware
// // app.use(express.static('../sad'))--za staticke fajlove
// app.use(express.json()); //moramo da imamo zbog body-a


// //routes
// app.get('/hello',(req,res)=>{
//     res.send('Task manager app');
// });

// app.use('/api/v1/tasks',tasks);
// app.use(notFound);//pogresna putanja tj.nepostojeca
// app.use(errorHandlerMiddleware);

// const port = 3000;

// const start = async () => {
//     try {
//         await connectDB();
//         app.listen(port,console.log(`Server is listening on port ${port}`));
//     } catch (error) {
//         console.log(error);
//     }
// };

// start();