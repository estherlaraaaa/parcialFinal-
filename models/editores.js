const mongoose = require('mongoose'); 

var editoresModel = mongoose.Schema({
    name: String,
    propietario: String, 
});

module.exports= mongoose.model('editores', editoresModel);