const express = require('express');
const controller = require('../controllers/gameController');
const router = express.Router();

//GET /game: send the game page
router.get('/', controller.index);

//POST /game: send the game page
router.post('/', controller.process);

//router.get('/show', controller.show);

router.post('/validate', controller.validate);

module.exports = router;