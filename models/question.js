const mongoose = require('mongoose');
const question = new mongoose.Schema({
    category: String,
    type: String,
    difficulty: String,
    question: String,
    correct_answer: String,
    incorrect_answers: [String],
    answer_choices: [String]
});

module.exports = {'model': mongoose.model('Question', question), 'schema': question};