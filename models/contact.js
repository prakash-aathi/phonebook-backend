const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI 
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const contactSchema = new mongoose.Schema({
    name: {type:String,  required:true},
    number: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(\d{2,3})-\d+$/.test(v) && v.length > 8;
        }, message: props => `${props.value} is not a valid phone number!`
      }, required:[true,'User phone number required'], minlength:8},
})
  
  contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
  })
  module.exports = mongoose.model('Contact', contactSchema)
