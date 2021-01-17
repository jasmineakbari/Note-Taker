const fs = require("fs");
const path = require("path");

// function to create new notes
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
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
function findById(id, notesArray) {
    const retrieve = notesArray.filter(notes => notes.id === id)[0];
    return retrieve;
}

// delete note function
function deleteNote(list, notesArray) {
    const selected = notesArray.indexOf(list);

    notesArray.splice(selected, 1);

    fs.writeFileSync(path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2))
}

module.exports = {
    createNewNote,
    validateNote,
    findById,
    deleteNote
}