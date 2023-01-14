const express = require('express');

const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

const {v4:uuidv4} = require('uuid');

const fs = require('fs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// comment for heroku change

// create routes that will serve our static html files

app.get('/', (req, res) =>  
    {res.sendFile(path.join(__dirname, 'public/index.html'))}
)

app.get('/notes', (req, res) =>
    {res.sendFile(path.join(__dirname, 'public/notes.html'))}
)

app.get('/api/notes',(req, res)=>{
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    err ? console.log(err) :  res.json(JSON.parse(data))
  })}

)

app.post('/api/notes', (req, res)=>{
  let title = req.body.title;
  let text = req.body.text;
  let newNote = {title, text, id:uuidv4()};
  
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    let currentNotes = JSON.parse(data);
    currentNotes.push(newNote)
    fs.writeFile('db/db.json', JSON.stringify(currentNotes), (err) => {
      err ? console.log(err) : console.log('This note has been saved' + newNote.title)
    })
    res.sendFile(path.join(__dirname, 'public/notes.html'))
  })
})

app.delete('/api/notes/:id', (req, res)=>{
  let id = req.params.id;

  // console.log(id)
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    let currentNotes = JSON.parse(data);
    const index = currentNotes.findIndex(object => {
      return object.id === id;
    });
    console.log( 'first step', currentNotes)
    currentNotes.splice(index, 1);
    fs.writeFile('db/db.json', JSON.stringify(currentNotes), (err) => {
      err ? console.log(err) : console.log('This note has been deleted')
    })
    res.sendFile(path.join(__dirname, 'public/notes.html'))
  })

})
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);