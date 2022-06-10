const useDaytime = () => {
    const getDaytime = (name) => {
        let MyDate = new Date()
        let MyHours = MyDate.getHours()

        switch (true){
            case (MyHours >= 5) && (MyHours < 11): return 'Доброе утро, ' + name;
            break;
            case (MyHours >= 11) && (MyHours < 16): return 'Добрый день, ' + name;
            break;
            case (MyHours >= 16) && (MyHours <= 23): return 'Добрый вечер, ' + name;
            break;
            case (MyHours >= 0) && (MyHours < 5): return 'Доброй ночи, ' + name;
            break;
            default: return 'Здравствуйте, ' + name;
            break;
        }
    }
    return {getDaytime}
}

export default useDaytime