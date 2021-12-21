const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log('password missing?')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.jdqlg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length > 3) {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4]
  })
  contact.save().then(resp => {
    console.log('contact saved successfully')
    mongoose.connection.close()
  })
} else {
  Contact.find({}).then(contacts => {
    console.log('phonebook:')
    contacts.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
}
