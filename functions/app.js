const express = require('express');
const bodyParser = require('body-parser');

let contacts = [
    {
        id: 1,
        name: "sarah",
        email: "sarah@gmail.com",
        phoneNumber: 4129429294
    }
]

// Set up the express app
const app = express();

// Log requests to the console.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/contacts", (req, res)=> {
    return res.send({
        contacts
    })
})

app.get("/api/contacts/:id", (req, res)=> {
    const contactId = parseInt(req.params.id)
    return res.send({
        contact: contacts.find((contact) => contact.id = contactId)
    })
})

app.post("/api/contacts", (req, res)=> {
    const { name, email, phoneNumber } = req.body
    const newContact = {
        name,
        email,
        phoneNumber,
        id: contacts.length + 1
    }

    contacts.push(newContact)

    return res.send({
       success: true,
       contactId: newContact.id
    })
})

app.put("/api/contacts/:id", (req, res)=> {
    const contactId = parseInt(req.params.id)
    const keysToEdit = Object.keys(req.body)

    contacts.forEach((contact) => {
        if (contact.id === contactId){
            
            keysToEdit.map((key) => {
                contact[key] = req.body[key]
            })
        }
    })

    return res.send({
        success: true
     })
})

app.delete("/api/contacts/:id", (req, res)=> {
    const contactId = parseInt(req.params.id)

    contacts = contacts.filter((contact) => contact.id !== contactId)

    return res.send({
        success: true
     })
})

module.exports = app