let timer;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    document.getElementById('start').style.display = 'none';
    document.getElementById('stop').style.display = 'inline-block';
    document.getElementById('lap').style.display = 'inline-block';
    document.getElementById('reset').style.display = 'inline-block';
}

function stopStopwatch() {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    document.getElementById('stop').style.display = 'none';
    document.getElementById('resume').style.display = 'inline-block';
}

function resumeStopwatch() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    document.getElementById('resume').style.display = 'none';
    document.getElementById('stop').style.display = 'inline-block';
}

function resetStopwatch() {
    clearInterval(timer);
    elapsedTime = 0;
    lapCounter = 1;
    document.getElementById('time').textContent = '00.00';
    document.getElementById('laps').innerHTML = '';
    document.getElementById('laps').style.display = 'none';
    document.getElementById('start').style.display = 'inline-block';
    document.getElementById('stop').style.display = 'none';
    document.getElementById('resume').style.display = 'none';
    document.getElementById('lap').style.display = 'none';
    document.getElementById('reset').style.display = 'none';
}

function lapTime() {
    if (lapCounter === 1) {
        document.getElementById('laps').style.display = 'block';
    }
    const lapTimeString = document.getElementById('time').textContent;
    const lapDiv = document.createElement('div');
    lapDiv.textContent = `Lap ${lapCounter++}: ${lapTimeString}`;
    document.getElementById('laps').prepend(lapDiv);
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);  // Divide by 10 to get two digits

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