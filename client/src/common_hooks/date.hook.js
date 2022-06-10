const useDate = () => {
    //Кастомный хук для получения текущей даты
    const getCurrentDate = () => {
        const date = new Date()
        let [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
        let [hour, minutes] = [date.getHours(), date.getMinutes()];
        if(day < 10) {
            day = `0${day}`
        }
        if(month < 10) {
            month = `0${month}`
        }
        if(hour < 10) {
            hour = `0${hour}`
        }
        if(minutes < 10) {
            minutes = `0${minutes}`
        }
        const now = `${day}.${month}.${year} ${hour}:${minutes}`
        return now
    } 
    const normalizeBirthDate = (date = 'some-thing') => {
        const dateArr = date.split('-')
        const year = dateArr[0]
        const month = dateArr[1]
        const day = dateArr[2]
        const final = day + '.' + month + '.' + year
        return final
    }
    return {getCurrentDate, normalizeBirthDate}
}

export default useDate