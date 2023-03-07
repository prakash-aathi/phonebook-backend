require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const Contact = require('./models/contact')
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

app.get("/api/persons", (req, res) => {
    Contact.find({}).then(contacts => {
        res.json(contacts)
    })
});

app.get("/info", (req, res) => {
    Contact.find({}).then(contacts => {
        res.send(`Phonebook has info for ${contacts.length} people <br> ${new Date()}`)
    })
})

app.get("/api/persons/:id", (req, res, next) => { 
    Contact.findById(req.params.id)
        .then(contact => { 
        if (contact) {
            res.status(200).json(contact)
        } else {
            res.status(404).end();
       }
    }).catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res,next) => { 
    Contact.findByIdAndRemove(req.params.id)
        .then(result => { 
            res.status(204).end();
            console.log(result);
    }).catch(error => next(error))
})

app.post("/api/persons", (req, res,next) => {
    const body = req.body;
    const contact = new Contact({
        name:body.name,
        number:body.number,
    }) 
    contact.save()
        .then(savedContact => {
        res.json(savedContact)
    }).catch(error => next(error))
})

app.put("/api/persons/:id", (req, res, next) => { 
    const body = req.body;
    const contact = {
        name: body.name,
        number: body.number,
    }
    Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
        .then(updatedContact => { 
            res.json(updatedContact)
        }).catch(error => {
            next(error)
            console.log(error);
        })
})


const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    if (error.name === 'CastError') { 
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
      }
    next(error)
}
app.use(errorHandler)

const port = 3003;
app.listen(port, () => {
    console.log("Server is running on port " + port);
})