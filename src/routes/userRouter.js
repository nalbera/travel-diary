const express = require('express');
const router = express.Router();
const {infoUser, loginUser, createUser,validateUser,modifyUser} = require('../controllers/users');

const tokenMiddleware = require('../middlewares/tokenMiddleware');
const userExist = require('../middlewares/userExist');
const validator = require('../middlewares/validator');

router.post('/users', validator(),createUser);
router.post('/users/login',loginUser);
router.get('/users/validate/:regCode', validateUser);
router.get('/users/:id', userExist, tokenMiddleware, infoUser);
router.put('/users/:id',userExist, tokenMiddleware, modifyUser);

module.exports = router;