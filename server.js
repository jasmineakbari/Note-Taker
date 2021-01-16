const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db');

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