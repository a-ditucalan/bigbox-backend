const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
  status: {
    type: String,
    required: true,
    default: 'China Warehouse'
  },

  shippingMark: {
    type: String,
    required: [true, "Shipping mark is required!"],
  },
  itemName: {
    type: String,
    required: [true, "Item Name is required!"],
  },
  warehouse: {
    type: String,
    required: [true, "Warehouse is required!"],
  },
  cbm: {
    type: Number,
    required: [true, "CBM is required!"],
  },
  kilo: {
    type: Number,
    required: [true, "Kilo is required!"],
    
  },
  numberOfBox: {
    type: Number,
    required: [true, "Number of box is required!"],
  },
  trackingNumber: {
    type: String,
    required: [true, "Tracking number is required!"],
  },
  notes: {
    type: String,
    default: ''
  },

  itemDate: {
    type: Date,
    required: true, 
    default: Date.now(),
  },  containerNumber:{
    type: String,
  },
},{timestamps: true})

const Item = mongoose.model('Item', ItemSchema)
module.exports = Item