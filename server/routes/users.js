const express = require('express');
const router = express.Router();
const passwordHash = require('password-hash');
const User = require('../models/User.js');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// GET /users
// Gets all users
router.get('/', (req,res) => {
    User.find()
        .then(users => res.json(users)
        .catch(err => console.log(err))
    )
});

// GET /users/:username
// Gets a user
router.get('/:username', (req,res) => {
    User
    .find({ username : req.params.username })
    .then(user => res.json(user))
    .catch(err => console.log(err))
    
});

// POST /users
// Creates a user
router.post('/', (req,res) => {
    const password = req.body.password;
    let hashedPassword = passwordHash.generate(password);
    console.log(hashedPassword);

    const newUser = new User({
        username: req.body.username,
        passwordHash: hashedPassword,
    });

    newUser.save().then(item => res.json(item));
})
   
module.exports = router;