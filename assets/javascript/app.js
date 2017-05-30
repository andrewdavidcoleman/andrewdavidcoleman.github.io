$( document ).ready(function(){
  console.log("letsago");
});

// global variables
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var intervalId;



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<gameClock object>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var gameClock = {
  time: 60,
  start: function() {
    intervalId = setInterval(gameClock.count, 1000);
  },
  stop: function() {
    clearInterval(intervalId);
    console.log("stahhhhp!")
  },
  count: function() {
    gameClock.time--;
    var converted = gameClock.timeConverter(gameClock.time);
    console.log("clock running");
    $(".timer").html(converted);
     if (gameClock.time === 0) {
      gameClock.stop();
      }
     if (gameClock.time === 10) {
      $("#hidden-timer").slideDown(1000);
      audio.hurryup.play();
      }
     if (gameClock.time <= 10) {
      $(".timer").css("color", "red")
      $("#hidden-timer").css("display", "inherit")
      }
     if (gameClock.time === 0) {
      audio.death.play();
      setTimeout(function(){
        gameOver()
      }, 3000);
     }
  },
  timeConverter: function(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }
};
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<End of gameClock object>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<gameState object>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var gameState = {
  waiting: function(){
    $(".start-screen").show();
    $(".game-screen").hide();
    $(".game-over-screen").hide();
    $(".container").css({
      "margin-top": "20px",
      "height": "550px",
      });
    },
  play: function(){
    $(".start-screen").hide();
    $(".game-screen").show();
    $(".game-over-screen").hide();
    $(".container").css({
      "margin-top": "0px",
      "height": "1000px",
      });
   },
  results: function(){
    $(".start-screen").hide();
    $(".game-screen").hide();
    $(".game-over-screen").show();
    $(".container").css({
      "margin-top": "20px",
      "height": "550px",
      });
   },
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<End of game object>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>





// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<audio effects object>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var audio = {
 pipe: document.getElementById("pipe-sound"),
 coin: document.getElementById("coin-sound"),
 death: document.getElementById("death-sound"),
 gameover: document.getElementById("gameover-sound"),
 timelow: document.getElementById("timelow-sound"),
 worldclear: document.getElementById("worldclear-sound"),
 stageclear: document.getElementById("stageclear-sound"),
 powerup: document.getElementById("powerup-sound"),
 hurryup: document.getElementById("hurryup-sound"),
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<End of audio object>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<game action>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// screen displays waiting for the user to click the begin button
$(document).on("load", gameState.waiting());

// upon clicking the begin button the game screen displays and the timer begins running
$("#begin-button").click(function(){
  gameState.play();
  gameClock.start();
  audio.pipe.play();
  
});
// upon clicking the done button, the results screen displays


  function gameOver(){
  gameClock.stop();
  $("#hidden-timer").css("display", "none")
  gameState.results();
           // <<<<<<<<answers object, why doesn't it work when this is outside of the function
    var userAnswer = {
      question1: $('input[name=answersq1]:checked').val(),
      question2: $('input[name=answersq2]:checked').val(),
      question3: $('input[name=answersq3]:checked').val(),
      question4: $('input[name=answersq4]:checked').val(),
      question5: $('input[name=answersq5]:checked').val(),
    };
            // <<<<<<<<<<<End of answers object in side this function>>>>>>>>>>>>>
  console.log(userAnswer.question1);
  console.log(userAnswer.question2);
  console.log(userAnswer.question3);
  console.log(userAnswer.question4);
  console.log(userAnswer.question5);
  // evaluating users answers
  if (userAnswer.question1 === "Donkey Kong") {
    correct++;
  } else if(!userAnswer.question1){
    unanswered++
  } else {
    incorrect++;
  };

  if (userAnswer.question2 === "Princess Peach") {
    correct++;
  } else if(!userAnswer.question2){
    unanswered++
  } else {
    incorrect++;
  };

  if (userAnswer.question3 === "Chef") {
    correct++;
  } else if(!userAnswer.question3){
    unanswered++
  } else {
    incorrect++;
  };

  if (userAnswer.question4 === "Super Mario 64") {
    correct++;
 } else if(!userAnswer.question4){
    unanswered++
  } else {
    incorrect++;
  };

  if (userAnswer.question5 === "Jumpman") {
    correct++;
 } else if(!userAnswer.question5){
    unanswered++
  } else {
    incorrect++;
  };

// reactions based on how many questions the user got right
  if (correct === 5) {
    $("#game-over-phrase").html("Great job!");
    audio.worldclear.play();
  }
  if (correct === 4) {
    $("#game-over-phrase").html("So close! Try again!");
    audio.stageclear.play();
  }
  if (correct ===3) {
    $("#game-over-phrase").html("Not bad! Try again!");
    audio.gameover.play();
  }
  if (correct < 3) {
    $("#game-over-phrase").html("You can do better! Try again!");
    audio.gameover.play();
  }

$("#correct").html(correct);
$("#incorrect").html(incorrect);
$("#unanswered").html(unanswered);

};

$("#done-button").click(gameOver);

$("#retry-button").click(function(){
  audio.powerup.play();
  setTimeout(function(){location.reload()}, 1000);
});

$("input").click(function(){
  audio.coin.play();
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<end of game action>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>














