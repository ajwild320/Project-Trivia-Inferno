const model = require('../models/question');

//GET /game: send the game page
exports.index = (req, res) => {
    res.render('./game');
};

//POST /game: send the game page
exports.process = (req, res) => {
    let url = buildURL(req.body.category, req.body.difficulty);
    fetch(url).then(response => response.json()
        .then(data => {
            let question = data.results[0];
            question = model.process(question);
            res.render('./game/show', {question: question, q: JSON.stringify(question)});
        }).catch( err => {
            console.log(err);
            res.status(404).send('Question not found' + err)
        }));
};

// exports.show = (req, res) => {
//     let question = req.body.question;
//     if (question) {
//         res.render('./game/show', {question: question, q: JSON.stringify(question)});
//     }
//     else {
//         res.status(404).send('Question not found');
//     }
// };

exports.validate = (req, res) => {
    let answer = req.body.selectedAnswer;
    let correct = req.body.question.correct_answer;
    console.log("QUESTION VALIDATE: " + answer + " correct: " + correct);
    if(answer === correct){
        res.json({correct: true});
    }
    else{
        res.json({correct: false});
    }
};

function buildURL(cat, diff){
    const totalQuestions = 1;
    const base_url = `https://opentdb.com/api.php?amount=${totalQuestions}`;
    return base_url + "&category=" + cat + "&difficulty=" + diff;
}