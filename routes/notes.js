const router = require('express').Router();
const fs = require('fs');
const { readFile, writeFile } = fs.promises
const { v4: uuidv4 } = require('uuid');


router.get('/notes', (req, res) => {
  readFile('db/db.json').then(function (data) {
    const db = JSON.parse(data)
    res.json(db)
  })
}
);

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

router.post('/notes/:id', (req, res) => {
  const { body } = req;
  readFile('db/db.json').then(function (data) {
    const db = JSON.parse(data)
    const result = db.filter(db.id)
    writeFile('db/db.json', JSON.stringify(result))
    res.json(result)
  })
});

module.exports = router;