const Question = require('./question').schema;
const userScoreSchema = require('./userScore').schema;
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    questions: [Question],
    userScores: [userScoreSchema]
});

module.exports = {'model': mongoose.model('Quiz', quizSchema), 'schema': quizSchema};
