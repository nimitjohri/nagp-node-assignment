const express = require('express');
const router = express.Router();
const passport = require('passport')

const User = require('../models/user');
const { response } = require('../app');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

/* Register a new user */
router.post('/register', async function(req, res, next) {
    const user = new User(req.body);
    await user.setHashPassword()
    user.save((err, savedUser) => {
        if(err) {
            console.log("Error while creating user: ", err);
        }
        res.json(savedUser)
    });
});

/* Login user */
router.get('/login',function(req, res, next) {
    res.render('login', {title: 'Express'})
});

router.post('/login', passport.authenticate('local', {session: false}), function(req, res, next) {
    var response = req.user.toAuthJson()
    console.log('Token', response['token']);
    res.cookie('auth', response['token'])
    res.redirect('/positions/position')
});


module.exports = router;
