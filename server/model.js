const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Items = new Schema({
    name: {
        type: String
    },
    level: {
        type: Number
    },

}, {
    collection: 'items'
});

module.exports = mongoose.model('Items', Items);