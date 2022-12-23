const express = require('express');

const router = express.Router();

const {login,dashboard} = require('../controllers/main');

const authMiddleware=require('../controllers/models/middleware/auth');

router.route('/dashboard').get(authMiddleware,dashboard);
router.route('/login').post(login);//.post valjda zato sto hocemo da posaljemo vrijednosti koje su upisane u login dijelu

module.exports = router;