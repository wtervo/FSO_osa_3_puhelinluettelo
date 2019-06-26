require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

morgan.token("body", (req, res) => {return JSON.stringify(req.body)})

app.use(express.static("build"))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(":method :url :status :response-time ms - :body"))

//this list is a remnant of old code
//saved just in case
let persons = [
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
    },
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
    },
    {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
    },
    {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
    },
    {
    "name": "Veli Saarikalle",
    "number": "050 21083131",
    "id": 5
    }
]

// const getRandomInt = (max) => {
//     return Math.floor(Math.random() * Math.floor(max));
// }

app.get("/api/", (request, response) => {
    response.send("<h1>There's some phonenumbers here</h1>")
})

app.get("/api/persons", (request, response) => {
    Person.find({}).then(person => {
        response.json(person.map(person => person.toJSON()))
    })
})

app.get("/api/info", (request, response) => {
    Person.find({}).then(persons => {
        const personNum = persons.length
        currenttime = new Date()
        response.send(
            `<p>The phonebook currently has information of ${personNum} people</p>
            <p>${currenttime}</p>`
        )
    })
})

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person.toJSON())
            }
            else {
                response.status(204).end()
            }
        })
        .catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
    const body = request.body
  
    const person = new Person({
        name: body.name,
        number: body.number,
    })
  
    person.save()
        .then(savedPerson => {
            response.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body
    console.log(request.params.id)
    console.log(body.name, body.number)
    const person = {
        name: body.name,
        number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "Unknown endpoint"})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === "CastError" && error.kind == "ObjectId") {
        return response.status(400).send({error: "Malformatted ID"})
    }
    else if (error.name === "ValidationError") {
        return response.status(400).send({error: error.message})
    }
    next(error)
}
  
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})