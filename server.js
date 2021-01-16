const fs = require('fs');
const path = require('path');
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
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

// retrieves existing notes in json format
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// how to hand post requests from front end
app.post('/api/notes', (req, res) => {
    // set id of new note
    req.body.id = notes.length.toString();

    // add note to json file and notes array in this function
    const note = createNewNote(req.body, notes);

    res.json(req.body);
});

// listens for requests and responses
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});