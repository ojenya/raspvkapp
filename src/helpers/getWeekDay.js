export function getWeekDay (){
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let date = new Date()
    let day = {day: days[date.getDay()]};
    return day

}