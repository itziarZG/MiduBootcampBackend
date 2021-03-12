const mongoose = require('mongoose')
const { Schema, model } = mongoose

// DTB Schema
const phoneSchema = new Schema({
  name: String,
  number: String,
})
// para la vuelta
phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})
// modelling
const PhoneItem = model('phoneItem', phoneSchema) // mongo will create collection phoneitems

//
module.exports = PhoneItem
