const express = require('express');
const router = express.Router();
const {infoUser, loginUser, createUser} = require('../controllers/users');

router.get('/users/:id', infoUser);
router.post('/users/login',loginUser);
router.post('/users', createUser);

module.exports = router;