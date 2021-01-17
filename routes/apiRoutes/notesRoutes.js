const { createNewNote, validateNote, findById, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/db');
const router = require('express').Router();

// retrieves existing notes in json format
router.get('/notes', (req, res) => {
    res.json(notes);
});

// how to handle post requests from front end
router.post('/notes', (req, res) => {
    // set id of new note
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if(!validateNote(req.body)) {
        res.status(400).send('The note is improperly formatted.');
    } else {
        // add note to json file and notes array in this function
        const note = createNewNote(req.body, notes);

        res.json(note);
    }
});

// creating routing to delete notes by retrieving id
router.delete('/notes/:id', (req, res) => {
    const select = findById(req.params.id, notes);

    deleteNote(select, notes);
    res.json();
})

module.exports  = router;