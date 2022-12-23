
//6:48

const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://jovan:11AA22aa@cluster0.i6ad1sa.mongodb.net/JOBS-API?retryWrites=true&w=majority';
//TASK-MANAGER- NAZIV BAZE KOJA SE IZGLEDA NE DAJE NA SAJTU OD MONGOODB VEC OVDJE TJ.KREIRA NA MONGODB BAZU POD NAZIVOM TASK-MANAGER


const connectDB = (url) => {
return mongoose.connect(connectionString,
//     {
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useFindAndModify:true,
//     useUnifiedTopology:true
// }
);

};

module.exports = connectDB;