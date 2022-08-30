// sets up the boilerplate for the app using express, file system, uuid and fs.promises
const router = require('express').Router();
const fs = require('fs');
const { readFile, writeFile } = fs.promises
const { v4: uuidv4 } = require('uuid');

// sets the notes to be read from the db to the index
router.get('/notes', (req, res) => {
  readFile('db/db.json').then(function (data) {
    const db = JSON.parse(data)
    res.json(db)
  })
}
);

// Sets the new note into the db.js
router.post('/notes', (req, res) => {
  const { body } = req;
  readFile('db/db.json').then(function (data) {
    const db = JSON.parse(data)
    const newNote = {
      title: body.title,
      text: body.text,
      id: uuidv4()
    }
    db.push(newNote);
    writeFile('db/db.json', JSON.stringify(db))
    res.json(db)

  })
});


// TODO:  Get this delete function removes a note when the trash can icon is clicked.
router.delete('/notes/:id', (req, res) => {
  const { body, params } = req;
  readFile('db/db.json').then(function (data) {
    const db = JSON.parse(data)
    const result = db.filter((note) => note.id !== params.id)
    console.log(result, params.id)
    writeFile('db/db.json', JSON.stringify(result))
    res.json(result)
  })
});

module.exports = router;