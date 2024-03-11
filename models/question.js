const questions = [];

exports.process = (data) =>{
    console.log("TEST " + data.correct_answer);
    let question = {
        category: data.category,
        type: data.type,
        difficulty: data.difficulty,
        question: data.question,
        correct_answer: data.correct_answer,
        incorrect_answers: data.incorrect_answers,
    };
        if(question.incorrect_answers.length === 1){
            question.answer_choices = shuffleArray([data.incorrect_answers[0], data.correct_answer]);
        }
        else{
            question.answer_choices = shuffleArray([data.incorrect_answers[0], data.incorrect_answers[1], data.incorrect_answers[2], data.correct_answer]);
        }
    //questions.push(question);
    
    return question;
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