const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const userValidation = require('../middlewares/user');

async function createUser(req, res, next) {
    try {
        const errors = validationResult(req)
        const user = req.body;
        if (!errors.isEmpty()) {
            const firstNameErr = errors.array().find(e => e.msg === userValidation.firstNameRequired)
            const lastNameErr = errors.array().find(e => e.msg === userValidation.lastNameRequired)
            const roleErr = errors.array().find(e => e.msg === userValidation.roleRequired)
            const usernameErr = errors.array().find(e => e.msg === userValidation.usernameRequired)
            const emailErr = errors.array().find(e => e.msg === userValidation.emailRequired)
            const passwordErr = errors.array().find(e => e.msg === userValidation.passwordRequired)
            const confirmPasswordErr = errors.array().find(e => e.msg === userValidation.confirmpasswordRequired)
            console.log(errors);
            res.render('user/register', {
                title: 'Create User',
                user,
                firstNameErr,
                lastNameErr,
                roleErr,
                usernameErr,
                emailErr,
                passwordErr,
                confirmPasswordErr
            })
        } else {
            console.log('Create User request body', user);
            const newUser = new User(req.body);
            await newUser.setHashPassword()
            newUser.save((err, savedUser) => {
                if (err) {
                    console.log("Error while creating user: ", err);
                }
                res.redirect('/auth/login')
            });

        }
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    createUser
}
