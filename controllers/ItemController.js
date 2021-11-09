const { response } = require('express')
const Item = require('../models/Item')

//show the list of employees
const index = (req,res,next) => {


  const {page = 1, limit = 20, search= ''} = req.query;
  Item.find(search ? {status: {$regex : search}} : search ? {warehouse: {$regex : search}} : search ? {shippingMark: {$regex : search}} : req.query.startDate ? {itemDate : { $gt: req.query.startDate + 'T00:00:00.000Z', $lt: req.query.endDate  + 'T23:59:59.999Z'}} : {} ).limit(limit *1).skip((page -1) * limit).sort({date:-1}).then(response => {
    res.json({count: response.length,response})
  }).catch(error => {
    res.json({message: 'An error Occured!'})
  })
}

//all item with pagination

const indexPagination = (req,res,next) => {
  Item.find().then(response => {
    res.json({count: response.length,response})
  }).catch(error => {
    res.json({message: 'An error Occured!'})
  })
}

// show single item
const show = (req,res,next) => {
  let itemID = req.params.id
  Item.findById(itemID).then(response=> {
    res.json({
      response
    })
  }).catch(error => {
    response.json({
      message: "An error Occured"
    })
  })
}
// store new item
const store = (req,res,next)=> {
  let item = new Item({
  status: req.body.status,
  shippingMark: req.body.shippingMark,
  warehouse:  req.body.warehouse,
  itemName: req.body.itemName,
  cbm: req.body.cbm,
  kilo: req.body.kilo,
  numberOfBox: req.body.numberOfBox,
  trackingNumber: req.body.trackingNumber,
  notes: req.body.notes,
})
item.save().then(response => {
  res.json({message: 'Item Added Successfully!'})
}).catch(error => {
  
  res.json({message: 'An Error Occured',error:error})
})
}

//update item by item id
const update = (req,res,next)=> {
  let itemID = req.params.id
  let updateData = {
    status: req.body.status,
    shippingMark: req.body.shippingMark,
    warehouse:  req.body.warehouse,
    itemName: req.body.itemName,
    cbm: req.body.cbm,
    kilo: req.body.kilo,
    numberOfBox: req.body.numberOfBox,
    trackingNumber: req.body.trackingNumber,
    notes: req.body.notes,
    itemDate: req.body.itemDate,
    containerNumber: req.body.containerNumber
  }

  Item.findByIdAndUpdate(itemID, {$set: updateData}).then(
    ()=> {
      res.json({message: 'Item updated succesully!'})
    }
  ).catch(error => {
    res.json({error: error,message: 'An error Occured'})
  })
}

//delete an item

const destroy = (req,res,next)=> {
  let itemID = req.body.itemID
  Item.findByIdAndDelete(itemID).then(()=>{
    res.json({message: 'Item deleted successfully!'})
    }).catch(error => {
      res.json({error: error, message: 'An error Occured'})
  })
}


//search an item

const search = (req,res,next)=> {

  try {
    if(!req.body) {
      res.status(200).json({message:"Missing Content"})
    } else {
      Item.find({shippingMark: req.body.shippingMark}).then(response => {
        res.json({count: response.length,response})
      }).catch(error => {
        res.json({message: 'An error Occured!'})
      })
    }
  } catch (error) {
    res.status(500).json({message: "error Occured"})
  }


  //delete
  let itemID = req.body.itemID
  Item.findByIdAndDelete(itemID).then(()=>{
    res.json({message: 'Item deleted successfully!'})
    }).catch(error => {
      res.json({error: error, message: 'An error Occured'})
  })
}
module.exports = {
  index,show, store,update,destroy,indexPagination,search
}