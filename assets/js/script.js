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

function resetGame() {
    console.log('Reseting game');
    score = ((correctAnswerCounter * scorePoints) - (correctAnswerCounter * scorePoints));
    endGameArea.classList.add('hide');
    questionCounter = (maxQuestion - 10);
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].classList.remove('btn-correct');
        answerButtons[i].classList.remove('btn-wrong');
    }
    nextButton.innerText = 'Next';
    restoreQuestions();
    correctAnswerCounter = 0;
    scoreText.innerText = `${correctAnswerCounter - correctAnswerCounter}`;
    runGame();
}

function restoreQuestions() {
    console.log('Restoring Questions');
    questions.push(...removedQuestions);
    removedQuestions.length = 0;
}

let questions = [
    {
        question : "When was the series premiered?",
        answer1: 'December 2013',
        answer2: 'January 2012',
        answer3: 'April 2010',
        answer4: 'February 2019',
        correct: 'December 2013',
    },
    {
        question : "How many members are in the Smith family?",
        answer1: 'Four members',
        answer2: 'Five members',
        answer3: 'Six members',
        answer4: 'Three members',
        correct: 'Four members',
    },
    {
        question : "Who is Rick's grandson?",
        answer1: 'Smith',
        answer2: 'Morty',
        answer3: 'Roland',
        answer4: 'Mark',
        correct: 'Morty',
    },
    {
        question : "How old is Morty's sister?",
        answer1: '14 years old',
        answer2: '21 years old',
        answer3: '17 years old',
        answer4: '19 years old',
        correct: '17 years old ',
    },
    {
        question: "Who is Morty's sister?",
        answer1: 'Sally',
        answer2: 'Sarah',
        answer3: 'Jane',
        answer4: 'Summer',
        correct: 'Summer',
    },
    {
        question: "Which is the dimension of the original Rick?",
        answer1: 'C-126',
        answer2: 'C-137',
        answer3: 'C-129',
        answer4: 'C-132',
        correct: 'C-137',
    },
    {
        question: "What Job does Beth have?",
        answer1: 'Novel Writer',
        answer2: 'Horse Surgeon',
        answer3: 'Chef',
        answer4: 'Astronomer',
        correct: 'Horse Surgeon',
    },
    {
        question: "What is the name of Jerrys gay lover alien parasite name?",
        answer1: 'Bery',
        answer2: 'Tery',
        answer3: 'Gary',
        answer4: 'Lary',
        correct: 'Gary',
    },
    {
        question: "What is the name of Jerrys favorite Rick?",
        answer1: 'Roofus',
        answer2: 'Doofus',
        answer3: 'Goofus',
        answer4: 'Rick G-506',
        correct: 'Doofus',
    },
    {
        question: "What is 'Schmeckle'?",
        answer1: 'Ricks favorite food',
        answer2: 'The name of fly-guards',
        answer3: 'A currency',
        answer4: 'Ricks Cat-person friend',
        correct: 'A currency',
    },
    {
        question: "What is the name of the planet that Mortys sex robot is from?",
        answer1: 'Smegmalon',
        answer2: 'Glaagablaaga',
        answer3: 'Gazorpazorp',
        answer4: 'Chundlopia',
        correct: 'Gazorpazorp',
    },
    {
        question: "What is the name of Ricks deceased wife?",
        answer1: 'Janet',
        answer2: 'Joyce',
        answer3: 'Ellen',
        answer4: 'Diane',
        correct: 'Diane',
    },
    {
        question: "What does Rick use to travel between dimensions and universes?",
        answer1: 'Space laser',
        answer2: 'Portal gun',
        answer3: 'Tardis',
        answer4: 'Universe Key',
        correct: 'Portal gun',
    },
    {
        question: "Who are Rick's two best friends?",
        answer1: 'Birdperson and Squanchy',
        answer2: 'Eagleperson and Scrunchy',
        answer3: 'Beakperson and Squinchy',
        answer4: 'Hawkperson and Sqelchy',
        correct: 'Birdperson and Squanchy',
    },
    {
        question: "What non-human species makes up half of Morty's son?",
        answer1: 'Gatarama',
        answer2: 'Gurglenstein',
        answer3: 'Gazorpazorp',
        answer4: 'Gaflumarorp',
        correct: 'Gazorpazorp',
    },
    {
        question: "What word should you never say to a Traflorkian?",
        answer1: 'Hello',
        answer2: 'Crunchugle',
        answer3: 'Mimsypop',
        answer4: 'Glip-Glop',
        correct: 'Glip-Glop',
    },
    {
        question: "What are the 'Ball Fondlers'?",
        answer1: "Rick and Morty's arch nemisis",
        answer2: "Rick and Morty's most hated TV show",
        answer3: "Rick and Morty's favourite TV show",
        answer4: 'A crime fighting team that fights crime',
        correct: "Rick and Morty's favourite TV show",
    },
    {
        question: "What is the name of the park that Rick builds inside an Australian homeless man?",
        answer1: 'Anatomy Park',
        answer2: 'Anatomical Fair',
        answer3: 'Anatomy Works',
        answer4: 'Anatomical World',
        correct: 'Anatomy Park',
    },
    {
        question: "What is Scary Terry's catchphrase?",
        answer1: "Here's looking at you",
        answer2: 'Kablam',
        answer3: 'Bitch',
        answer4: 'Dickhead',
        correct: 'Bitch',
    },
]