var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(".btn").on("click", function() {
  var userChosencolor = this.id;
  userClickedPattern.push(userChosencolor);

  playSound(userChosencolor);
  animatePress(userChosencolor);

  checkAnswer(userClickedPattern.length-1);

})

$(document).on("keydown", function() {
  if (started === false) {
    started = true;
    nextSequence();

  }
})

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100)
  $("h1").text("Level " + level);
  playSound(randomChosenColour);

  level++;
  userClickedPattern = [];
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over")
    $("h1").text("Game Over, press any Key to Restart")

    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
