const questions = document.querySelectorAll('.choices');
let selectedAnswer;
questions.forEach(question => {
    question.addEventListener('click', () => {
        console.log("Other: " + question.value);
        selectedAnswer = question.value;
        questions.forEach(btn => {
            btn.classList.remove('selected');
        });
        question.classList.toggle('selected');
        document.querySelector("#selectedAnswer").value = selectedAnswer;
    });
});

const playBtn = document.querySelector('.submitbutton');
playBtn.addEventListener('click', (e) => {
    if(!selectedAnswer){
        alert('Please select an answer');
        e.preventDefault();
    }
});