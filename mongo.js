const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("Give password, name and number as arguments to add a new number")
    console.log("Give password as an argument to display all contacts in the phonebook")
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstacktesti:${password}@cluster0-r8eup.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(person => {
            console.log(person.name, "-", person.number)
        })
        mongoose.connection.close()
    })
}

else{
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(response => {
        console.log(`Added "${person.name}", number: ${person.number} to the phonebook`);
        mongoose.connection.close();
    })
}