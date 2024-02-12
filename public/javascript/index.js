const totalQuestions = 1;
const base_url = `https://opentdb.com/api.php?amount=${totalQuestions}`;

// const categoryPairs = {"General Knowledge" : 9, "Science" : 17, "History" : 23, "Geography" : 22,
//      "Entertainment" : 15, "Music" : 12, "Film" : 11, "Books" : 10, "Mythology" : 20, "Sports" : 21,
//      "Art" : 25, "Celebrities" : 26, "Animals" : 27, "Vehicles" : 28, "Comics" : 29, "Gadgets" : 30,
//      "Anime" : 31, "Cartoons" : 32, "Surprise Me" : 0
//     };

let url;
let currentCategory;
let currentDifficulty

const buttonCategories = document.querySelectorAll('.category');
buttonCategories.forEach(button => {
  button.addEventListener('click', () => {
    buttonCategories.forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.toggle('selected');
    currentCategory = button.dataset.category;
    document.querySelector("#formCategory").value = currentCategory;
  });
});

const buttonDifficulties = document.querySelectorAll('.difficulty');
buttonDifficulties.forEach(button => {
  button.addEventListener('click', () => {
    buttonDifficulties.forEach(btn => {
        btn.classList.remove('selected');
      });
      button.classList.toggle('selected');
    currentDifficulty = button.dataset.difficulty;
    document.querySelector("#formDifficulty").value = currentDifficulty;
  });
});


function buildURL(){
    url = base_url + "&category=" + currentCategory + "&difficulty=" + currentDifficulty;
}

const playBtn = document.querySelector('.start-btn');
playBtn.addEventListener('click', (e) => {
    if(!currentCategory || !currentDifficulty){
        alert('Please select a category and difficulty');
        e.preventDefault();
    }
});