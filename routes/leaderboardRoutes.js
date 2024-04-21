const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboardController');
const router = express.Router();

// Route to display the leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await getLeaderboard();
        res.render('leaderboard/leaderboard', { leaderboard });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;