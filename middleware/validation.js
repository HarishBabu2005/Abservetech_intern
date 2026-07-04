const {body}=require('express-validator');
const userValidation=[
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer')
]
const producValidation=[
    body('p_name').notEmpty().withMessage('Product name is required'),
    body('p_price').isFloat({ min: 0 }).withMessage('Product price must be a positive number'),
    body('p_description').notEmpty().withMessage('Product description is required')
]
module.exports={userValidation,producValidation};