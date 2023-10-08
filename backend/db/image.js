const mongoose = require('mongoose');

const imageDetailsSchema = new mongoose.Schema({
    propertyFor : {
        type : String
    },
    owner : {
        type : String
    },
    sellerId : {
        type : String
    },
    type : {
        type : String
    },
    State : {
        type : String
    },
    City : {
        type : String
    },
    society : {
        type : String
    },
    zone : {
        type : String
    },
    pincode : {
        type : Number
    },
    area : {
        type : Number
    },
    price : {
        type : Number
    },
    rooms : {
        type : Number
    },
    image : {
        type : Array,
    },
    modified : {
        type : Number
    }
});
  
//Image is a model which has a schema imageSchema
module.exports = new mongoose.model('imageDetail', imageDetailsSchema);
