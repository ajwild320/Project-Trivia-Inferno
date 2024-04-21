const express = require('express');
const controller = require('../controllers/gameController');
const router = express.Router();

//GET /game: send the game page
router.get('/', controller.index);

//POST /game: send the game page
router.post('/', controller.refine);

router.get('/show', controller.show);
router.get('/show/:id', controller.showID);

router.post('/validate', controller.validate);

router.get('/results', controller.results);

module.exports = router;