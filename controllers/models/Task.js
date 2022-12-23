const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({//kreiramo strukturu za sve dokumente koji ce biti u kolekciji
name : {
    type :String,
    required : [true,'must provide name'],
    trim : true,
    maxlength : [20,'name can not be more than 20 characters']
},
completed : {
    type : Boolean,
    default : false
}
});

module.exports = mongoose.model('Task',TaskSchema);