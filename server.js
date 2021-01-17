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
// allows access to public folder 
app.use(express.static('public'));

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

// new note valiation
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

// finding a note by it's id
function findById(id, noteArray) {
    const retrieve = noteArray.filter(note => note.id === id)[0];
    return retrieve;
}

// delete note function
function deleteNote(list, noteArray) {
    const selected = noteArray.indexOf(list);

    noteArray.splice(selected, 1);

    fs.writeFileSync(path.join(__dirname, '.db/db.json'),
        JSON.stringify({ notes: noteArray }, null, 2))
}

// retrieves existing notes in json format
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// how to hand post requests from front end
app.post('/api/notes', (req, res) => {
    // set id of new note
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if(!validateNote(req.body)) {
        res.status(400).send('The note is improperly formatted.');
    } else {
        // add note to json file and notes array in this function
        const note = createNewNote(req.body, notes);

        res.json(req.body);
    }
});

// creating routing to delete notes by retrieving id
app.delete('/notes/:id', (req, res) => {
    const select = findById(req.params.id, notes);

    deleteNote(select, notes);
    res.json();
})

// html route for landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// html route for Notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})


// listens for requests and responses
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});