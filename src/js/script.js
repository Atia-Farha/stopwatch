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
    lapDiv.innerHTML = `<span class="lapCounter">Lap - ${lapCounter++}</span><span class="lapTime">${lapTimeString}</span>`;
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

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Save the event to trigger later
    deferredPrompt = e;
    
    // Optionally, show some UI to notify users that they can install the app (without custom button)
    console.log('PWA install prompt available!');
});

// Listen for the user to click on the install prompt (if it was deferred)
window.addEventListener('appinstalled', (e) => {
    // Log the successful installation
    console.log('PWA was installed');
});