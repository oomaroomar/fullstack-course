const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstackoomar:${password}@omarincrazyclusteri-pxz8x.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required: true,

  },
  number: {
    type: String,
    minlength: 2,
    required: true,
  }
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find().then(result => {
        result.forEach(person => console.log(`${person.name} ${person.number}`))
        process.exit(1)
    })
}

// Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)  
//     })
//     mongoose.connection.close()
// })

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

person.save().then(response => {
  console.log('contact saved!');
  mongoose.connection.close();
})