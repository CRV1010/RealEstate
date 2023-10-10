// const mongoose = require('mongoose');

// const imageDetailsSchema = new mongoose.Schema({
//     propertyFor : {
//         type : String
//     },
//     owner : {
//         type : String
//     },
//     sellerId : {
//         type : String
//     },
//     type : {
//         type : String
//     },
//     State : {
//         type : String
//     },
//     City : {
//         type : String
//     },
//     society : {
//         type : String
//     },
//     zone : {
//         type : String
//     },
//     pincode : {
//         type : Number
//     },
//     area : {
//         type : Number
//     },
//     price : {
//         type : Number
//     },
//     rooms : {
//         type : Number
//     },
//     image : {
//         type : Array,
//     },
//     modified : {
//         type : Number
//     }
// });
  
// //Image is a model which has a schema imageSchema
// module.exports = new mongoose.model('imageDetail', imageDetailsSchema);



const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const moment = require("moment-timezone");

const imageDetailsSchema = new Schema({
  propertyFor: {
    type: String,
  },
   owner : {
        type : String
    },
  sellerId: {
    type: String,
  },
  type: {
    type: String,
  },
  State: {
    type: String,
  },
  City: {
    type: String,
  },
  society: {
    type: String,
  },
  zone: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  area: {
    type: Number,
  },
  price: {
    type: Number,
  },
  rooms: {
    type: Number,
  },
  likes: [{ type: Types.ObjectId }],
  image: {
    type: Array,
  },
   modified : {
        type : Number
    },

  //Set the creation date when the document is created
  createdAt: {
    type: Date,
    default: () => moment().tz("Asia/Kolkata"), // Set the creation date in IST
  },
});

//to delete the schema after 2 min of creation
imageDetailsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });

// Image is a model which has a schema imageDetailsSchema
module.exports = mongoose.model("imageDetail", imageDetailsSchema);