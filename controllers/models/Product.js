const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,'product name must be provided']
    },
    price:{
        type:Number,
        required:[true,'product price must be provided']
    },
    featured:{
        type:Boolean,
        dafault:false
    },
    rating:{
        type:Number,
        default:4.5,
    },
    createdAt:{
        type:Date,
        default:Date.now(),//ako nije nista upisano bice stavljeno danasnje vrijeme
    },
    company:{
        type:String,
        // enum:['ikea','liddy','caressa','marcos'],//ogranicenje za company,padajuca lista aman
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'{VALUE} is not supported'
        }
    }
});

module.exports = mongoose.model('Product',productSchema);