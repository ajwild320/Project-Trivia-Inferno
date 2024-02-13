const submitbutton = document.querySelector('.submitbutton');
submitbutton.addEventListener('click', (e) => {
    const selectedAnswer = document.querySelector('input[type="radio"]:checked');
    if(!selectedAnswer){
        alert('Please select an answer');
        return;
    }
    console.log("QUESTION: " + JSON.parse(q).correct_answer + " SELECTED: " + selectedAnswer.value);
    fetch('/game/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({selectedAnswer: selectedAnswer.value, question: JSON.parse(q)})
    }).then(response => response.json()
        .then(data => {
            console.log(data);
            if(data.correct){
                alert('Correct!');
            }
            else{
                alert('Incorrect');
            }
        }).catch( err => {
            console.log(err);
            alert('Error: ' + err);
        }));
});