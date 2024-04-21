const mongoose = require('mongoose');
const userScoreSchema = new mongoose.Schema({
    username: String,
    score: Number,
});
module.exports = {'model':mongoose.model('UserScore', userScoreSchema), 'schema':userScoreSchema};