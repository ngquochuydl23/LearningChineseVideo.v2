export function timeVttToMilisecond(timeVtt) {
    var date = new Date("0000-01-01T" + timeVtt);
    return date.getMilliseconds();
}