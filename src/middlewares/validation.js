const {body} = require('express-validator');

const validateNewUser = () => {
    return [
        body('email').trim().isEmail().withMessage('Please enter valid Email Address'),
        
        body('password').trim().isLength({min:8}).withMessage('Password must be at least 6 characters')
                               .isLength({max:20}).withMessage('Password must be at maximum 20 characters'),
        
        body('re_password').trim().custom((value, {req})=>{
            if(value !== req.body.password) throw new Error('Passwords do not match');
            return true;
        }),
        body('first_name').trim().isLength({min:3}).withMessage('First Name must be at least 3 characters')
                                 .isLength({max:255}).withMessage('First Name must be at maximum 255 characters'),
        
        body('last_name').trim().isLength({min:3}).withMessage('Last Name must be at least 3 characters')
                                 .isLength({max:255}).withMessage('Last Name must be at maximum 255 characters'),
    ];
}

module.exports = {
    validateNewUser
}