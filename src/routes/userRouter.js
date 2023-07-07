const express = require('express');
const router = express.Router();
const {
    infoUser,
    getMe,
    loginUser,
    createUser,
    validateUser,
    modifyUser,
    deleteUser,
    modifyPassword,
    recorverPassword,
    resetPassword
} = require('../controllers/users');

const tokenMiddleware = require('../middlewares/tokenMiddleware');
const userExist = require('../middlewares/userExist');
const validator = require('../middlewares/validator');

router.post('/users', validator(),createUser);
router.post('/users/login',loginUser);
router.get('/users/validate/:regCode', validateUser);
router.get('/users/:id', userExist, tokenMiddleware, infoUser);
router.get('/users',userExist, tokenMiddleware, getMe);
router.put('/users/:id',userExist, tokenMiddleware, modifyUser);
router.delete('/users/:id',userExist,tokenMiddleware,deleteUser);
router.patch('/users/modify-password', tokenMiddleware, modifyPassword);
router.post('/users/recover-password', recorverPassword);
router.post('/users/reset-password', resetPassword);

module.exports = router;