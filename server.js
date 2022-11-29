const express = require('express');

const path = require('path');

const PORT = 3001;

const app = express();

app.use(express.static('public'))

// app.use(express.urlencoded({ extended: true }));

// app.use(express.json());

// create routes that will serve our static html files

app.get('/home', (req, res) =>  
    res.sendFile(path.join(__dirname, 'public/index.html'))
)

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
)

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);