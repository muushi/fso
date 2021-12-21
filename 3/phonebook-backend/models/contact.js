const mongoose = require("mongoose")
const uniqValidator = require("mongoose-unique-validator")

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)
mongoose.connect(url).then(res => {
  console.log('connected')
}).catch(err => {
  console.log('connection error: ', err.message)
})

const contactSchema = new mongoose.Schema({
  name: {type: String, minlength: 3, unique: true},
  number: {type: String, minlength: 8}
})
contactSchema.plugin(uniqValidator)

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)
