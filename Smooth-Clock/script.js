const HAND_HOUR = document.querySelector("#hour");
const HAND_MINUTE = document.querySelector("#minute");
const HAND_SECOND = document.querySelector("#second");

function calculateSecondsDegrees(second) {
    return second * 6; // 360 / 60 - 1 second takes 6 degrees step
}
function calculateMinutesDegrees(minute, second) {
    // minute hand will be moving slowly towards the next minute
    // as the second hand progresses
    return minute * 6 + calculateSecondsDegrees(second) / 60;
}
function calculateHoursDegrees(hour, minute) {
    // hour hand also will be adjusted smoothly
    // with the progression of the minute hand
    return hour * 30 + minute * 0.5; // 360 / 60 / 12 - the hour hand will be
    // moved for 0.5 per minute
}

function getRotationStyle(degree) {
    return "rotate(" + degree + "deg)";
}
function ammendRotation() {
    var correction = 0;

    return function(rotation) {
        correction += rotation % 360 == 0 ? 360 : 0;
        return rotation + correction;
    };
}

var hrRotationCorrector = ammendRotation();
var minRotationCorrector = ammendRotation();
var secRotationCorrector = ammendRotation();
function rotateClock() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    HAND_HOUR.style.transform = getRotationStyle(hrRotationCorrector(calculateHoursDegrees(hours, minutes)));
    HAND_MINUTE.style.transform = getRotationStyle(minRotationCorrector(calculateMinutesDegrees(minutes, seconds)));
    HAND_SECOND.style.transform = getRotationStyle(secRotationCorrector(calculateSecondsDegrees(seconds)));
}

setInterval(rotateClock, 1000);
