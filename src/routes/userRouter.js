const express = require('express');
const router = express.Router();
const {infoUser, loginUser, createUser,validateUser} = require('../controllers/users');

router.get('/users/:id', infoUser);
router.post('/users/login',loginUser);
router.post('/users', createUser);
router.get('/users/validate/:regCode', validateUser)

module.exports = router;