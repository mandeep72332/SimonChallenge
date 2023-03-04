
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern =[];

var started = false;

var level=0;

$(document).keypress(function(){
  if(!started) {
    $("level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.lenth === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else{
      playSound("wrong");
      $("body").addClass("game-over");
      $("level-title").text("Game Over, press any key to Restart");

      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
  }

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);
}

nextSequence();

// Create AnimationPress function

function animatePress(currentColour){

  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


//Create Audio function

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
