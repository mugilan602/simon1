var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var pressed = false;
var level = 0;

function isMobile() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

var clickEvent = isMobile() ? "touchstart" : "click";

$(document).on("keydown", function () {
  if (!pressed) {
    nextSequence();
    pressed = true;
    $("h1").text("Level 1");
  }
});

$(".btn").on(clickEvent, function (event) {
  event.stopPropagation();
  if (!pressed) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var len = userClickedPattern.length;
    checkAnswer(len - 1);
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over, Press any key to restart.");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  pressed = false;
  userClickedPattern = [];
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}
