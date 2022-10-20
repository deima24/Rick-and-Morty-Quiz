//buttons

let startButton = document.getElementById('start-button');
let answerOne = document.getElementById('answer1');
let answerTwo = document.getElementById('answer2');
let answerThree = document.getElementById('answer3');
let answerFour = document.getElementById('answer4');
let nextButton = document.getElementById('next-button');
let playAgain = document.getElementById('play-again-btn');

//game area

let questionArea = document.getElementById('question-area');
let endGameArea = document.getElementById('end-game');
let questionTitle = document.getElementById('question-area');
let question = document.getElementById('question');

//question choises

let shuffledQuestions = [];
let currentQuestionIndex = [];
let removedQuestions = [];

//score

let score = 0;
let scoreText = document.getElementById('score');
let questionCounter = 0;
let finalScore = document.getElementById('final-score');
let finalText = document.getElementById('final-score-text');
let correctAnswerCounter = 0;

const scorePoints = 7;
const maxQuestion = 10;

//listeners

startButton.addEventListener('click', function() {
    runGame();
    myInterval = setInterval(countdown, 1000);
});

nextButton.addEventListener('click', function() {
    nextQuestion();
    myInterval = setInterval(countdown, 1000);
});

playAgain.addEventListener('click', resetGame);

function runGame () {
    console.log('Started');
    startButton.classList.add('hide');
    questionArea.classList.remove('hide');
    nextButton.classList.add('hide');
    currentQuestionIndex = [0];
    questionCounter++;
    questionTitle.innerText = `Question ${questionCounter} of ${maxQuestion}`;
    shuffle();
    countdown();
}

function displayQuestion(currentQuestion) {
    questionElement.innerText = currentQuestion.question;
    answerOne.innerText = currentQuestion.answer1;
    answerTwo.innerText = currentQuestion.answer2;
    answerThree.innerText = currentQuestion.answer3;
    answerFour.innerText = currentQuestion.answer4;

    answerOne.addEventListener('click', checkAnswer);
    answerTwo.addEventListener('click', checkAnswer);
    answerThree.addEventListener('click', checkAnswer);
    answerFour.addEventListener('click', checkAnswer);
}

function shuffle () {
    shuffledQuestions = questions.sort(function() {
        return Math.random() - 0.5;
    });
    displayQuestion(shuffledQuestions[currentQuestionIndex]);
    console.log('Shuffled');
}

function checkAnswer () {
    console.log('checking answer');
    clearInterval(myInterval);
    console.log(questions[0].correct); 
    if(this.innerHTML === questions[0].correct) {
        this.classList.add('btn-correct');
        console.log('Correct!');
        incrementScore(scorePoints);
    } else {
        this.classList.add('btn-wrong');
        console.log('Wrong!');
        for (let i = 0; i < answerButtons.length; i++) {
            if (answerButtons[i].innerHTML === questions[0].correct) {
                answerButtons[i].classList.add('btn-correct');
            }
        }
    }
    if (questionCounter === 10) {
        nextButton.innerHTML = 'End';
    }
    nextButton.classList.remove('hide');

    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].removeEventListener('click', checkAnswer);
    }
}

function incrementScore() {
    correctAnswerCounter++;
    score = (correctAnswerCounter * scorePoints);
    scoreText.innerText = score;
    console.log('Adding points');
    console.log('Total score is ' + correctAnswerCounter);
    return;
}

function nextQuestion() {
    console.log('Generating next question...');
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[1].classList.remove('btn-correct');
        answerButtons[1].classList.remove('btn-wrong');
    }
    removedQuestions.push(...questions.splise(0, 1));
    counter = 0;
    if (questionCounter === 10) {
        endGame();
        clearInterval(myInterval);
    } else {
        runGame();
    }
}

function endGame() {
    console.log('Calculating total score..');
    clearInterval(myInterval);
    questionArea.classList.add('hide');
    endGameArea.classList.remove('hide');
    finalScore = correctAnswerCounter * scorePoints;
    finalScore.innerHTML = `Congratulations! Your total score is: ${finalScore}.`;
    if (correctAnswerCounter <= 7) {
        finalScore.innerHTML = `Oh no! You only scored ${finalScore}. Better luck next time!`;
    }
}