let playing = false;
let score;
let timeremaining;
let action;
let correctAnswer;

// If we click on the start/reset
document.getElementById("startReset").onclick = function () {
  // If we are playing
  if (playing === true) {
    // Reload page
    location.reload();
  } else {
    // If we are not playing
    // Change mode to playing
    playing = true;
    // Set score to 0
    score = 0;

    document.getElementById("scorevalue").innerHTML = score;
    // Show countdown box
    show("timeRemaining");

    // Note: Added some logic
    timeremaining = 60;
    document.getElementById("timeRemainingValue").innerHTML = timeremaining;

    // Hiding game over box
    hide("gameOver");

    // Change button: reset
    document.getElementById("startReset").innerHTML = "Reset Game";

    // Start countdown
    startCountDown();

    // Generate a new Q and A
    generateQA();
  }
};

// Functions section:

// Start counter
function startCountDown() {
  action = setInterval(function () {
    timeremaining -= 1;

    document.getElementById("timeRemainingValue").innerHTML = timeremaining;

    // To prevent the decrement counter from getting negative
    if (timeremaining === 0) {
      // Game over
      stopCountDown();
      show("gameOver");

      // Display game over
      document.getElementById("gameOver").style.display = "block";
      // Changing the text of gameOver
      document.getElementById("gameOver").innerHTML = "<p>* Game Over *</p><p>Your Score is " + score + ".</p>";

      hide("timeRemaining");
      hide("correct");
      hide("wrong");
      playing = false;

      document.getElementById("startReset").innerHTML = "Start Game";
    }
  }, 1000); // It's in milliseconds, but interval required is 1 second, so taken 1000
}

// Stop counter
function stopCountDown() {
  clearInterval(action);
}

// Hide element
function hide(id) {
  document.getElementById(id).style.display = "none";
}

// Show element
function show(id) {
  document.getElementById(id).style.display = "block";
}

// Generate Q and A
function generateQA() {
  const x = 1 + Math.round(Math.random() * 9); // Generate number between 1 to 9
  const y = 1 + Math.round(Math.random() * 9); // Generate number between 1 to 9
  correctAnswer = x * y;

  document.getElementById("question").innerHTML = x + "x" + y;
  const correctPosition = 1 + Math.round(3 * Math.random());
  // Fill any random box with the correct answer
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

  // Fill other boxes with wrong answers
  const answers = [correctAnswer];

  for (let i = 1; i < 5; i++) {
    if (i !== correctPosition) {
      let wrongAnswer;

      // To prevent generating the correct answer in two or more boxes
      // Try replacing the do-while with a while loop, it will give undefined values in the boxes
      do {
        wrongAnswer = (1 + Math.round(Math.random() * 9)) * (1 + Math.round(Math.random() * 9)); // Generate any random wrong answer
        // Fill box with wrong answer
      } while (answers.indexOf(wrongAnswer) > -1); // Note: No semicolon after the do-while loop

      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}

// Event handlers for answer boxes
for (let i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    // Check if we are playing
    if (playing === true) {
      if (this.innerHTML == correctAnswer) {
        // Correct answer
        // Increase score by 1
        score++;

        document.getElementById("scorevalue").innerHTML = score;

        // Hiding the wrong box and show the correct box
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);

        // Generate Q and A
        generateQA();
      } else {
        // Wrong answer
        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 1000);
      }
    }
  };
}
