// Variables to store timer and elapsed time
let timer;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

// Function to start the stopwatch
function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    document.getElementById('start').style.display = 'none';
    document.getElementById('stop').style.display = 'inline-block';
    document.getElementById('lap').style.display = 'inline-block';
    document.getElementById('reset').style.display = 'inline-block';
    document.getElementById('circle').classList.add('animate');
}

// Function to stop the stopwatch
function stopStopwatch() {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    document.getElementById('stop').style.display = 'none';
    document.getElementById('start').style.display = 'inline-block';
    document.getElementById('circle').classList.remove('animate');
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(timer);
    elapsedTime = 0;
    lapCounter = 1;
    document.getElementById('time').textContent = '00.00';
    document.getElementById('start').style.display = 'inline';
    document.getElementById('laps').innerHTML = '';
    document.getElementById('laps').style.display = 'none';
    document.getElementById('lapsBox').classList.remove('with-gradient');
    document.getElementById('stop').style.display = 'none';
    document.getElementById('lap').style.display = 'none';
    document.getElementById('line1').style.display = 'none';
    document.getElementById('line2').style.display = 'none';
    document.getElementById('line3').style.display = 'none';
    document.getElementById('line4').style.display = 'none';
    document.getElementById('reset').style.display = 'none';
    document.getElementById('circle').classList.remove('animate');
}

// Function to record a lap time
function lapTime() {
    if (lapCounter === 1) {
        document.getElementById('lapsBox').style.display = 'block';
        document.getElementById('laps').style.display = 'block';
        document.getElementById('line1').style.display = 'block';
        document.getElementById('line2').style.display = 'block';
    }
    const lapTimeString = document.getElementById('time').textContent;
    const lapDiv = document.createElement('div');
    lapDiv.innerHTML = `<p class="animate__animated animate__slideInDown animate__fast"><span class="lapCounter">Lap - ${lapCounter++}</span><span class="lapTime">${lapTimeString}</span></p>`;
    document.getElementById('laps').prepend(lapDiv);

    const lapsBox = document.getElementById('lapsBox');
    if (lapsBox.scrollHeight > lapsBox.clientHeight) {
        lapsBox.classList.add('with-gradient');
        document.getElementById('line1').style.display = 'none';
        document.getElementById('line2').style.display = 'none';
        document.getElementById('line3').style.display = 'block';
        document.getElementById('line4').style.display = 'block';
    } else {
        lapsBox.classList.remove('with-gradient');
    }
}

// Function to update the stopwatch time
function updateTime() {
    elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    let timeString =
        (seconds < 10 ? '0' : '') + seconds + '.' +
        (milliseconds < 10 ? '0' : '') + milliseconds;

    if (minutes > 0 || hours > 0) {
        timeString =
            (minutes < 10 ? '0' : '') + minutes + ':' + timeString;
    }

    if (hours > 0) {
        timeString =
            (hours < 10 ? '0' : '') + hours + ':' + timeString;
    }

    document.getElementById('time').textContent = timeString;
}

let keyPressed = {}; // Object to track keys currently pressed and handled

document.addEventListener('keydown', (event) => {
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');

    if (keyPressed[event.key]) {
        return; // If the key has already triggered an action, ignore further `keydown` actions
    }

    keyPressed[event.key] = true; // Mark the key as pressed and handled

    switch (event.key) {
        case ' ': // Stop button
            event.preventDefault();
            if (stopButton.style.display !== 'none') {
                stopStopwatch();
            }
            break;

        case 'Enter': // Reset button
            event.preventDefault();
            if (resetButton.style.display !== 'none') {
                resetStopwatch();
            }
            break;

        case 'Shift': // Lap button
            event.preventDefault();
            if (lapButton.style.display !== 'none') {
                lapTime();
            }
            break;

        default:
            break;
    }
});

document.addEventListener('keyup', (event) => {
    const startButton = document.getElementById('start');

    if (!keyPressed[event.key]) {
        return; // If the key hasn't triggered `keydown`, ignore this `keyup` action
    }

    keyPressed[event.key] = false; // Reset the key's state

    if (event.key === ' ') {
        event.preventDefault();
        if (startButton.style.display !== 'none') {
            startStopwatch();
        }
    }
});
