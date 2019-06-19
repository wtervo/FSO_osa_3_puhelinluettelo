const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")

morgan.token("body", (req, res) => {return JSON.stringify(req.body)})

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(":method :url :status :response-time ms - :body"))

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

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

app.get("/", (request, response) => {
    response.send("<h1>There's some phonenumbers here</h1>")
})

app.get("/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    const personNum = persons.length
    time = new Date()
    response.send(
        `<p>The phonebook currently has information of ${personNum} people</p>
        <p>${time}</p>`
    )
})

app.get("/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.post("/persons", (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "Content missing - please check the name and number"
        })
    }
    else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: `${body.name} is already in the phonebook`
        })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: getRandomInt(40),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})

app.delete("/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})