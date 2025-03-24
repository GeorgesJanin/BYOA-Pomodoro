let timeLeft;
let timerId = null;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const timerButtons = document.querySelectorAll('.timer-button');

// Initialize timer
function updateDisplay(minutes, seconds) {
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            updateDisplay(minutes, seconds);

            if (timeLeft === 0) {
                clearInterval(timerId);
                isRunning = false;
                playNotification();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    const activeButton = document.querySelector('.timer-button.active');
    timeLeft = parseInt(activeButton.dataset.time) * 60;
    updateDisplay(Math.floor(timeLeft / 60), timeLeft % 60);
}

function playNotification() {
    const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
    audio.play();
}

// Event Listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

timerButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!isRunning) {
            timerButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            timeLeft = parseInt(button.dataset.time) * 60;
            updateDisplay(Math.floor(timeLeft / 60), timeLeft % 60);
        }
    });
});

// Initialize the timer
timeLeft = 25 * 60; // 25 minutes in seconds
updateDisplay(25, 0); 