//REMOVES "start" button from page..................................
$('#start').on('click', function () {
    $('#start').remove();
    game.loadQuestion();
})

///CHECKS entire document on load for '.answer-button' that is not on page. "e" is used to store an event
$(document).on('click', '.answer-button', function (e) {
    game.clicked(e);
})

//ARRAY of questions................................................
var questions = [{
    question: "What did Alfred Nobel develop?",
    answers: ["tnt", "dynamite", "c4"],
    correctAnswer: "dynamite",
    image: "assets/images/dynamite.png"
}, {
    question: "Which is a narrative poem by American writer?",
    answers: ["The Raven", "War and Peace", " The Great Gatsby"],
    correctAnswer: "The Raven!",
    image: "assets/images/edwardAllenPoe.jpg"

}, {
    question: "Famous painting by Sandro Botticelli?",
    answers: ["The Birth of Venus", "American Gothic", "The Scream"],
    correctAnswer: "The Birth of Venus",
    image: "assets/images/birthOfVenus.jpg"

}, {
    question: "Who was the first woman in history to win the best director award at the Oscars?",
    answers: ["Kathryn Bigelow", "Sofia Coppola", "Ava DuVernay"],
    correctAnswer: "Kathryn Bigelow",
    image: "assets/images/kathrynBigelow.jpg"
}];

console.log(questions);

//Game object and properties.......................................
var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30, //game counter
    correct: 0, //tracks correct reponses
    incorrect: 0, //tracks incorrect reponses

    //gane functions...................................................
    countDown: function () { //changing the timer
        game.counter--;
        $('#counter').html(game.counter);
        if (game.counter <= 0) {
            $('#counter').html("time up!");
            game.timeUp();
        }
    },
    loadQuestion: function () {    //loads question and multiple choice answers on page
        timer = setInterval(game.countDown, 1000);  //lowers counter on page per second

        $('#subwrapper').html('<h2>' + questions[game.currentQuestion].question + '</h2>');

        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) { //loops through array of available questions

            $('#subwrapper').append('<button class="answer-button"id="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button>');

        }
    },
    nextQuestion: function () {  //LOADS next question
        game.counter = 30;       //SETS timer back to 30 mins
        $("#counter").html(game.counter);  //display counter to html
        game.currentQuestion++;           // loops to next question with ++
        game.loadQuestion();              //runs function load question

    },
    timeUp: function () {
        clearInterval(timer); //timer stops, avoids going into the negative
        $("#subwrapper").html("<h1>OUT OF TIME!</h1>")
        $("#subwrapper").append('<h3>The Correct Response Was:' + questions[game.currentQuestion].correctAnswer + ' </h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },
    results: function () {

    },
    clicked: function (e) { // will clear time
        clearInterval(timer);
        if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }

    },
    answeredCorrectly: function () { // will generate win in html
        clearInterval(timer);          //clears timer upon guess
        game.correct++;                //adds to correct counter value array
        $("#subwrapper").html('<h1>Right Answer! </h1>') //will display in "Right Answer!"

        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
        //testing/debugging
        console.log("RIGHT ON!");
    },
    answeredIncorrectly: function () { //will generate win html
        clearInterval(timer);          //clears timer upon guess
        game.incorrect++;                //adds to correct counter value array
        $("#subwrapper").html('<h1>Wrong Answer! </h1>') //will display in "Wrong Answer!"
        $("#subwrapper").append('<h3>The Correct Response Was:' + questions[game.currentQuestion].correctAnswer + ' </h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
        //testing/debugging
        console.log("TRY AGAIN!");

    },
    reset: function () {

    }
}




