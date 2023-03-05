const express = require('express');
const morgan = require('morgan');
const app = express();
// to parse body of post request
app.use(express.json());

// morgan token to log post data
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));
morgan.token('postData', (req) => {
    return JSON.stringify(req.body);
});
  
// cors middleware   
const cors = require('cors')
app.use(cors())

let notes = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get("/api/persons", (req, res) => {
    res.json(notes);
});

app.get("/info", (req, res) => {
    res.send(`<p>Phonebook has info for ${notes.length} people</p><p>${new Date()}</p>`);
})

app.get("/api/persons/:id", (req, res) => { 
    const id = Number(req.params.id);
    const note = notes.find(note => note.id === id);
    if (note) {
        res.status(200).json(note);
    }
    else { 
        res.status(404).end();
    }
})

app.delete("/api/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id)
    res.status(204).end();
})

app.post("/api/persons", (req, res,token) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "name or number missing"
        })
    }
    if (notes.find(note => note.name === body.name)) {
        return res.status(400).json({
            error: "name must be unique"
        })
    }
    const note = {
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        number: body.number
    }
    notes = notes.concat(note);
    res.json(note);
    console.log(token);
})

app.put("/api/persons/:id", (req, res) => { 
    const id = Number(req.params.id);
    const body = req.body;
    const note = notes.find(note => note.id === id);
    if (note) {
        note.name = body.name;
        note.number = body.number;
        res.status(200).json(note);
    }
    else { 
        res.status(404).end();
    }
})

const port = 3003;
app.listen(port, () => {
    console.log("Server is running on port " + port);
})