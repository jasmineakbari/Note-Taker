const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db');

// parse incoming string or array data this is done after creating post request handler
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// function to create new notes
function createNewNote(body, notesArray) {
    console.log(body);
    
    return body;
}

// retrieves existing notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// how to hand post requests from front end
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

// listens for requests and responses
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});