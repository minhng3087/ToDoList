const express = require('express');
const itemRoutes = express.Router();

let Item = require('./model');

// Defined store route
itemRoutes.route('/create').post(function (req, res) {
    let item = new Item(req.body);
    item.save()
        .then(item => {
            res.status(200).json({'item': 'person in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
itemRoutes.route('/').get(function (req, res) {
    Item.find(function(err, items){
        if(err){
            console.log(err);
        }
        else {
            res.json(items);
        }
    });
});

// Defined edit route
itemRoutes.route('/edit/:id').get(function (req, res) {
    Item.findById(req.params.id, function (err, item){
        if(err) console.log(err);
        else res.json(item);
    });
       
});

//  Defined update route
itemRoutes.route('/update/:id').put(function (req, res) {
   Item.updateOne({_id: req.params.id}, req.body)
    .then(() => res.json('Successfully'));
});

// Defined delete | remove | destroy route
itemRoutes.route('/delete/:id').delete(function (req, res) {
    Item.findByIdAndDelete({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = itemRoutes;