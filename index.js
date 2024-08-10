const timer = document.getElementById("time");
const startButton = document.querySelector(".start");
const activities = document.querySelectorAll(".title");
const buttons = document.querySelectorAll("button");
const image = document.querySelector("img");

const pomodoroSeconds = 1500;
const shortBreakSeconds = 300;
const longBreakSeconds = 900;

let totalSeconds;
let interval;

// Sound for the buttons when clicked
function playSound() {
  let clickSound = new Audio("sounds/tickSound.mp3");
  clickSound.play();
}

buttons.forEach((button) => {
  button.addEventListener("click", playSound);
});

// Notification Sound
function alertSound() {
  let notificationSound = new Audio("sounds/alertsound.mp3");
  notificationSound.play();

  //   Playing sound for only 4 sec
  setTimeout(() => {
    notificationSound.pause();
    // Reset the audio back to 0 beginning
    notificationSound.currentTime = 0;
  }, 4000);
}

// Determing activity: Pomodoro, shortBreak or longBreak

activities.forEach(function (activity) {
  activity.addEventListener("click", () => {
    // Change background of selected button

    if (activity.classList.contains("pomo")) {
      totalSeconds = pomodoroSeconds;
      displayTimer(25, 0);
      image.setAttribute("src", "images/pomoimg.png");
    } else if (activity.classList.contains("short")) {
      totalSeconds = shortBreakSeconds;
      displayTimer(5, 0);
      image.setAttribute("src", "images/relaxing-img.png");
    } else {
      totalSeconds = longBreakSeconds;
      displayTimer(15, 0);
      image.setAttribute("src", "images/longbimg.png");
    }
    activitiesAnimations(activity);
    // Clear any running timer
    clearInterval(interval);
    interval = null;
  });
});

// Sets timer

function displayTimer(minutes, seconds) {
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes = minutes;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  } else {
    seconds = seconds;
  }

  timer.innerHTML = `${minutes}:${seconds}`;
}

function updateTimer() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  //   Change display of timer
  displayTimer(minutes, seconds);

  //   Set end time notification, alert sound and reset timer
  if (totalSeconds === 0) {
    alertSound();
    clearInterval(interval);
    interval = null;
  } else {
    totalSeconds--;
  }
}

startButton.addEventListener("click", () => {
  if (totalSeconds === undefined) {
    alert("Please select either pomodoro,short break or long break.");
    return;
  }
  playSound();
  // Start timer on click
  if (!interval) {
    interval = setInterval(updateTimer, 1000);
  }
});

function activitiesAnimations(evt) {
  // Remove animation that exist before applying the ones below
  activities.forEach((activity) => {
    activity.classList.remove("selected");
  });

  // Add animation to the selected activity
  evt.classList.add("selected");

  // Remove animation after a specific time.

  if (evt.classList.contains("pomo")) {
    setTimeout(() => {
      evt.classList.remove("selected");
    }, 1500000);
  } else if (evt.classList.contains("short")) {
    setTimeout(() => {
      evt.classList.remove("selected");
    }, 300000);
  } else {
    setTimeout(() => {
      evt.classList.remove("selected");
    }, 900000);
  }
}
