const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// parse incoming string or array data this is done after creating post request handler
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// allows access to public folder 
app.use(express.static('public'));

// listens for requests and responses
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});