const mongoose = require('mongoose')
const Schema = mongoose.Schema

const item = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  compleated: {
    type: Boolean,
    required: true
  }
}, {timestamps: true})

const Item = mongoose.model("Item", item)
module.exports = Item