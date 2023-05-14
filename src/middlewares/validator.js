const { body } = require('express-validator');

const validator = () => {
    return [
        body('email').trim().notEmpty().withMessage('Mail is required')
        .isEmail().withMessage('Please enter a valid mail'),
        
        body('pwd').trim().notEmpty().withMessage('Password is required')
        .isLength({min: 6}).withMessage('Invalid password')
    ]
}

module.exports = validator;