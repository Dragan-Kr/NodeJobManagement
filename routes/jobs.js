const express = require('express');
const router = express.Router();

const {getAllJobs,getJob,createJob,updateJob,deleteJob} = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs);//postujemo novi job i a mozemo i da vratimo jobove na ovoj putanji
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);


module.exports = router;