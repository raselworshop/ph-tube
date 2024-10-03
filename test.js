function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remaingSecond = parseInt(time % 3600);
    const minutes = parseInt(remaingSecond / 60);
    remaingSecond = remaingSecond % 60;
    return `${month} ${day} day ${hour} hour ${minutes} minute ${remaingSecond} second ago`
}
console.log(getTimeString(733467))