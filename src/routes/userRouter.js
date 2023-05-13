const express = require('express');
const router = express.Router();
const {infoUser, loginUser, createUser,validateUser} = require('../controllers/users');

const tokenMiddleware = require('../middlewares/tokenMiddleware');

router.get('/users/:id',tokenMiddleware ,infoUser);
router.post('/users/login',loginUser);
router.post('/users', createUser);
router.get('/users/validate/:regCode', validateUser);

module.exports = router;