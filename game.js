
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];//buttons the game expects the user to click
var userClickedPattern = [];//the user clicked buttons

//game Level
var level=0;
var started=false;

//button clicked
$(".btin").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  //passing the user chosen last index to check answer
  checkAnswer(userClickedPattern.length-1);
})

//KeyPressed
$(document).keydown(function () {
	if(!started){
	nextSequence();
$("#level-title").text("Level "+level);
started=true;
}
});




//function generating the sequence of preesed buttons
function nextSequence() {
 userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level "+level);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
	if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
		
		//console.log("Success");
		//console.log(userClickedPattern[currentLevel]);
		console.log(gamePattern);
      if(userClickedPattern.length==gamePattern.length){
      	setTimeout(function(){
      		nextSequence();
      	},1000);
      }

	}
	else{
		//console.log("wrong");
		//console.log(userClickedPattern[currentLevel]);
		//console.log(gamePattern[currentLevel]);
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function(){
     	$("body").removeClass("game-over");
 },200);
     $("#level-title").text("Game Over, Press Any Key to Restart");
     startOver();
    
	}

}
 function startOver() {
 	level=0;
 	gamePattern=[];
 	started=false;

 }