const { body, check } = require('express-validator')

const firstNameRequired = 'First name not provided';
const lastNameRequired = 'Last name not provided';
const roleRequired = 'Role can either be employee or manager';
const usernameRequired = 'Username: length 6-15';
const passwordRequired = 'Password must be alphanumeric and min length of 8';
const confirmpasswordRequired = 'confirm password field must have the same value as the password field';
const emailRequired = 'Email description not provided';

function validate(method) {
  switch (method) {
    case 'createUser': {
     return [ 
        check('firstname', firstNameRequired).exists().notEmpty(),
        check('lastname', lastNameRequired).exists().notEmpty(),
        check('username', usernameRequired).exists().notEmpty().isString().isLength({min: 6, max: 15}),
        check('email', emailRequired).exists().notEmpty().isEmail(),
        check('role', roleRequired).exists().notEmpty().isString().custom((value) => {
            if (value === 'employee' || value === 'manager') {
                return true
            }
            return false
        }),
        check('password', passwordRequired).exists().isString().notEmpty().isAlphanumeric().isLength({min: 8}),
        check('confirmpassword', confirmpasswordRequired).exists().custom((value, {req}) => {
            return value === req.body.password}),
       ]   
    }
  }
}

module.exports = {
    validate,
    firstNameRequired,
    lastNameRequired,
    roleRequired,
    usernameRequired,
    confirmpasswordRequired,
    passwordRequired,
    emailRequired,
}