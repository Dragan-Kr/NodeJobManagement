const Task = require('./models/Task');

const asyncWrapper = require('./models/middleware/async');
// const {createCustomError} = require('../errors/custom-error');
const {createCustomError} = require('./errors/custom-error');

const getAllTasks = asyncWrapper(  async (req,res)=>{
   
    const tasks = await Task.find({});
    res.status(200).json({tasks});
   
});


const  createTask = asyncWrapper(  async (req,res)=>{///ovde izbrisano

    const task = await Task.create(req.body);
    res.status(201).json({task});



});
const getTask = asyncWrapper( async (req,res,next)=>{
    
        const {id : taskID} = req.params;//uzmi id iz params-a i ali koristi alias taskID nadalje
        const task = await Task.findOne({_id:taskID});
//umjesto ovoga svega ispod mogu biti obicni try{} catch{} blokovi
        if(!task){
            // const error = new Error('Not found');
            // error.status = 404;
            // return next(error);
            // return res.status(404).json({msg: `No task with id: ${taskID}` });
            return next(createCustomError(`No task with id: ${taskID}`),404);
        }


        res.status(200).json({task});
   
});
// const updateTask = async (req,res)=>{//izmjeni samo ako je completed:true,ovo je patch
//     try {
//         const {id:taskID} = req.params;
//         const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
//             new:true,
//             runValidators:true //provjerava da li smo uradili u skladu sa ogranicenjima ?
//         });
//         if(!task){
//             return res.status(404).json({msg: `No task with id: ${taskID}` });
//         }

//         res.status(200).json({task});
//     } catch (error) {
//         res.status(500).json({msg:error});
//     }
// };
const updateTask = asyncWrapper( async (req,res)=>{//izmjeni samo ako je completed:true,ovo je patch
    
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true //provjerava da li smo uradili u skladu sa ogranicenjima ?
        });
        if(!task){
            // return res.status(404).json({msg: `No task with id: ${taskID}` });
            return next(createCustomError(`No task with id: ${taskID}`),404);
        }

        res.status(200).json({task});
    
});
// const deleteTask = async (req,res)=>{
//     try {
//         const {id:taskID} = req.params;
//         const task = await Task.findOneAndDelete({_id:taskID});
//         if(!task){
//             return res.status(404).json({msg: `No task with id: ${taskID}` });
//         }

//         res.status(200).json({task});
//     } catch (error) {
//         res.status(500).json({msg:error});
//     }
//     res.send('delete task');
// };
const deleteTask = asyncWrapper( async (req,res)=>{
    
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            // return res.status(404).json({msg: `No task with id: ${taskID}` });
            return next(createCustomError(`No task with id: ${taskID}`),404);
        }

        res.status(200).json({task});
    
   
});

// const editTask = async (req,res)=>{//ovo je za put
//     try {
//         const {id:taskID} = req.params;
//         const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
//             new:true,
//             runValidators:true, //provjerava da li smo uradili u skladu sa ogranicenjima ?
//             overwrite:true
//         });
//         if(!task){
//             return res.status(404).json({msg: `No task with id: ${taskID}` });
//         }

//         res.status(200).json({task});
//     } catch (error) {
//         res.status(500).json({msg:error});
//     }
// };
const editTask = async (req,res)=>{//ovo je za put
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true, //provjerava da li smo uradili u skladu sa ogranicenjima ?
            overwrite:true
        });
        if(!task){
            return res.status(404).json({msg: `No task with id: ${taskID}` });
        }

        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg:error});
    }
};

module.exports={
    getAllTasks,//eksportovali kao objekat
    createTask,
    getTask,
    updateTask,
    deleteTask,
    editTask
};