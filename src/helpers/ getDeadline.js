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