alert("This is a project I made for a Javascript course I am in, I hope you enjoy it :)");

var buttonColours = ["red", "blue", "green", "yellow"]; // Random color will be picked

var gamePattern = []; // Random button color will be stored here
var userClickedPattern = []; // User choices will be stored here

var started = false; // Will make sure game only starts once
var level = 0; // Keeps track of levels

$(document).keypress(function() { // Starts game one time
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    // Storing the chosen button into the pattern array
    // Playing sounds and animation to show it

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour); // Button elements as input to use their individual sounds
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    // ^ Checking answer function
    // Function contains nextSequence, so will get called if the button is correct
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // If answer correct, run function again to add another button to sequence
        if (userClickedPattern.length === gamePattern.length){ // Checking to make sure the length of user clicks matches the random array
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else { // If wrong button, restarts game and flashes red for fail
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver(); // Function resets game
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++; // Level goes up every time this is called
    $("#level-title").text("Level " + level); // Changes title to match level
    var randomNumber = Math.floor(Math.random() * 4); // Random number to pick random color
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); // Adding random color to the array

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) { // Each button click goes in as the name input
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false; // Resets all data and ends game
}







