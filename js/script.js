/**
 * Created by eric.cross on 8/20/2015.
 */

document.addEventListener('DOMContentLoaded', startTimer);


var totalTime = 0,
    lapTime = 0;
function startTimer(){
    setInterval(displayTime, 1);
    displayTime();
}

function displayTime(){
    var now = new Date(),
        h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds(),
        paused = false;

        // Added this on my own
        ms = now.getMilliseconds();

    timeString = formatHour(h) + ":" + padZero(m, 2) + ":" + padZero(s, 2) + ":" + padZero(ms, 3)  + getTimePeriod(h);
    document.querySelector("#current-time").innerHTML = timeString;


// Analog clock
    var canvas = document.querySelector("#clock");
    var context = canvas.getContext("2d");

    var clockRadius = 100;

    var clockX = canvas.width / 2;
    var clockY = canvas.height / 2;

    // Define Math.TAU, since it's not defined by default.
    Math.TAU = 2 * Math.PI;

    function drawArm(progress, armThickness, armLength, armColor){
        var armRadians = (Math.TAU * progress) - (Math.TAU/4),
            armLength = clockRadius;

        var targetX = clockX + Math.cos(armRadians) * armLength,
            targetY = clockY + Math.sin(armRadians) * armLength;

        context.lineWidth = armThickness;
        context.strokeStyle = armColor;


        context.beginPath();
        context.moveTo(clockX, clockY); // Start at the center
        context.lineTo(targetX, targetY); // Draw a line outwards
        context.stroke();
    }
    context.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas after every iteration

    drawArm(h / 12, 10, 0.50, '#000000');    // Hour
    drawArm(m / 60, 4, 0.75, '#000000');    // Minute
    drawArm(s / 60, 2, 1.00, '#FF0000');    // Second
    drawArm(ms / 1000, 1, 1.00, '#000000'); // MS
}



function padZero(num, size){
    var s = "0000" + num;
    return s.substr(s.length-size);
}

function formatHour(h){
    var hour = h%12;

    if (hour == 0){
        hour = 12;
    }
    return String(hour);
}

function getTimePeriod(h){
    return (h<12) ? "AM" : "PM";
}

function pauseTimer(){
    setTimeout(startTimer, 10);
}






