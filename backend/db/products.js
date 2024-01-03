const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    name:String,
    Brand:String,
    price:Array,
    Color:Array,
    userId:String,
    image:{
        required:true,
        type: Array
    }
})

module.exports = mongoose.model('product', productschema);