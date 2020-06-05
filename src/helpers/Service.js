Date.prototype.getWeekNumber = function() {
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return week

};

export function getWeek() {
    var oddeven = new Date().getWeekNumber()
    if (oddeven % 2 == 1) {
        let weektype = "нижняя"
        return weektype
    } else {
        let weektype = "верхняя"
        return weektype
    }

}
export async function update(selectGroup, selectDay) {
    const res = await fetch("https://raw.githubusercontent.com/ojenya/tg/master/sevice/schedule_imei.json")
        .then(res => res.json())
        .then(result => {
            const getSchedule = result.filter(e => e.group_name === selectGroup.group && e.weekday === selectDay).filter(e => {
                if (e.week_type === "") {
                    return e
                }
                if (e.week_type === getWeek()) {
                    return e
                }
            }).sort(function(obj1, obj2) {
                return obj1.pair_start_time - obj2.pair_start_time;
            })
            return getSchedule
        })
        .then(result => {
            return [...result]
        })
        .catch(e => console.log(e))

    return res

}
// export function update(selectGroup, selectDay) {
//     fetch("https://raw.githubusercontent.com/ojenya/tg/master/sevice/schedule_imei.json")
//         .then(res => res.json())
//         .then(result => {
//             const getSchedule = result.filter(e => e.group_name === selectGroup && e.weekday === selectDay).filter(e => {
//                 if (e.week_type === "") {
//                     return e
//                 }
//                 if (e.week_type === getWeek()) {
//                     return e
//                 }
//             }).sort(function(obj1, obj2) {
//                 return obj1.pair_start_time - obj2.pair_start_time;
//             })
//             return getSchedule
//         })
// }