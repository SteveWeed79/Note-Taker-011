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


// TODO:  Get the delete function working
// router.delete('/notes/:id', (req, res) => {
//   const { body } = req;
//   readFile('db/db.json').then(function (data) {
//     const db = JSON.parse(data)
//     console.log(db)
//     const note = 
//     console.log(note)
//     const result = db.filter((note) => note.id !== id)
//     // db.push(result)
//     console.log(note)

//     // writeFile('db/db.json', JSON.stringify(db))
//     res.json(result)
//   })
// });

module.exports = router;