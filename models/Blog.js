// require the mongoose package
const mongoose = require('mongoose')
// define a mongoose schema
const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
    
}, {
  timestamps: true

})
// build a model from the schema or export the schema and build the model in our index.js

module.exports = blogSchema

