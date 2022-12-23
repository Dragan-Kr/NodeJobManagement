//8:11

const mongoose = require('mongoose');


const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Please provide company name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,'Please provide position'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',//referenca na odredjenog USER-a,
        required:[true,'Please require user']

    }

},{timestamps:true});//kada se kreira novi Job dobijaju se dodatna polja kao sto su createdAt,createdBy,updatedAt

module.exports = mongoose.model('Job',JobSchema);