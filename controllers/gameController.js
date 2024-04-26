const Quiz = require('../models/quiz').model;
const { nextTick } = require('process');
const User = require('../models/user');
const UserScore = require('../models/userScore').model;
const Question = require('../models/question').model;
const QuestionSchema = require('../models/question').schema;
const UserScoreSchema = require('../models/userScore').schema;
const he = require('he');

//GET /game: send the game page
exports.index = (req, res) => {
    res.render('./game');
};

//POST /game: send the game page
exports.refine = (req, res) => {
    //build url
    let url = buildURL(req.body.category, req.body.difficulty);
    req.session.isRepeat = false;
    req.session.quizID = null;

    //call api
    fetch(url).then(response => response.json()
        .then(data => {
            let questions = [];
            for(let i = 0; i < data.results.length; i++){
                let tempAnswers = data.results[i].incorrect_answers;
                for(let j = 0; j < tempAnswers.length; j++){
                    tempAnswers[j] = he.decode(tempAnswers[j]);
                }
                let correct = he.decode(data.results[i].correct_answer);
                if(data.results[i].incorrect_answers.length === 1){
                    data.results[i].answer_choices = shuffleArray([tempAnswers[0], correct]);
                }
                else{
                    data.results[i].answer_choices = shuffleArray([tempAnswers[0], tempAnswers[1], tempAnswers[2], correct]);
                }
                questions[i] = new Question({
                    category: data.results[i].category,
                    type: data.results[i].type,
                    difficulty: data.results[i].difficulty,
                    question: he.decode(data.results[i].question),
                    correct_answer: correct,
                    incorrect_answers: tempAnswers,
                    answer_choices: data.results[i].answer_choices
                });
                console.log("QUESTION: " + questions[i]);
            }
            req.session.questions = questions;
            req.session.index = 0;
            req.session.score = 0;
            req.session.correct = 0;
            req.session.incorrect = 0;

            res.redirect('/game/show');
        }).catch( err => {
            console.log(err);
            res.status(404).send('Question not found' + err)
        }));
};

exports.showID = (req, res) => {
    let id = req.params.id;
    Quiz.findById(id)
    .then((quiz) => {
        req.session.isRepeat = true;
        req.session.questions = quiz.questions;
        req.session.quizID = quiz._id;
        req.session.index = 0;
        req.session.score = 0;
        req.session.correct = 0;
        req.session.incorrect = 0;
        res.redirect('/game/show');
    })
    .catch((err) => {
        res.status(404).send('Question not found' + err);
    });
};

exports.show = (req, res) => {
    if(req.session.index === undefined){
        req.session.index = 0;
        req.session.score = 0;
        req.session.correct = 0;
        req.session.incorrect = 0;
    }
    let questions = req.session.questions;
    let index = req.session.index;
    console.log("INDEX: " + index);
    console.log("Score " + req.session.score);
    console.log("Correct " + req.session.correct);
    console.log("Incorrect " + req.session.incorrect);
    if(index == questions.length){
        if(!req.session.isRepeat){
            let score = req.session.score;
            let userScore;
            if(req.session.username === undefined){
                User.findOne({firstName: "Guest"}).then((user) => {
                    userScore = new UserScore({
                        username: user.firstName + " " + user.lastName,
                        userId: user._id,
                        score: score
                    });
                    userScore.save().catch((err) => {
                        console.error("Error saving UserScore: ", err);
                        res.status(400).send("Unable to save user score" + err);
                    });
                    let quiz = new Quiz({
                        questions: questions,
                        userScores: userScore
                    });
                    quiz.save()
                    .then((quiz) => {res.render('./game/results', {score: score, correct: req.session.correct, incorrect: req.session.incorrect, quiz: quiz});})
                    .catch((err) => {res.status(400).send("Unable to save quiz" + err);});
                }).catch((err) => {next(err);});
            } else {
                userScore = new UserScore({
                    username: req.session.username,
                    userId: req.session.user,
                    score: score
                });
                userScore.save().catch((err) => {
                    console.error("Error saving UserScore: ", err);
                    res.status(400).send("Unable to save user score" + err);
                });
                let quiz = new Quiz({
                    questions: questions,
                    userScores: userScore
                });
                quiz.save()
                .then((quiz) => {res.render('./game/results', {score: score, correct: req.session.correct, incorrect: req.session.incorrect, quiz: quiz});})
                .catch((err) => {res.status(400).send("Unable to save quiz" + err);});
            }
        }
        else{
            let score = req.session.score;
            let userScore = new UserScore({
                username: req.session.username,
                userId: req.session.user,
                score: score
                });
            Quiz.findByIdAndUpdate(req.session.quizID, {$push: {userScores: userScore}}, {new: true})
            .then((quiz) => {res.render('./game/results', {score: score, correct: req.session.correct, incorrect: req.session.incorrect, quiz: quiz});})
            .catch((err) => {res.status(400).send("Unable to save quiz" + err);});
        }
        
    }
    else{
        let question = questions[index];
        if (question) {
            res.render('./game/show', {question: question, index: index, score: req.session.score});
        }
        else {
            res.status(404).send('Question not found');
        }
    }
};

exports.validate = (req, res) => {
    let answer = req.body.selectedAnswer;
    let correct = req.session.questions[req.session.index].correct_answer;
    console.log("ANSWER: " + answer);
    console.log("CORRECT: " + correct);
    if(answer === correct){
        console.log("Correct running");
        req.session.index++;
        req.session.score+=100;
        req.session.correct++;
    }
    else{
        console.log("Incorrect running");
        req.session.index++;
        req.session.incorrect++;
    }
    req.session.save((err)=>{
        if(err) console.log(err);
        res.redirect('/game/show');
    });
};

exports.results = (req, res) => {
    res.render('./game/results');
};

function buildURL(cat, diff){
    const totalQuestions = 1;
    const base_url = `https://opentdb.com/api.php?amount=${totalQuestions}`;
    return base_url + "&category=" + cat + "&difficulty=" + diff;
}

function shuffleArray (array){
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}