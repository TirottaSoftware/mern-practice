const express = require('express');
const router = express.Router();

const Item = require('../models/Item.js');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// GET /items
// Gets all items 
router.get('/', (req,res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => console.log(err))
    
});

// POST /items
// Posts an item
router.post('/', (req,res) => {
    const newItem = new Item({
        name: req.body.name,
    });

    newItem.save().then(item => res.json(item));
})

// DELETE /items/:id
// Deletes an item from the list
router.delete('/:id', (req,res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({msg: "Item removed"}))
        ).catch(err => res.status(400).json({msg: err}));
})
module.exports = router;