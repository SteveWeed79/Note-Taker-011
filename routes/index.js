const router = require('express').Router()
const path = require('path');
const noteRoutes = require('./notes')
router.use('/api', noteRoutes)

// GET Route for homepage
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);


module.exports = router;