const useRandom = () => {
    //Кастомный хук для получения рандома

    //Решётка с рандомным числом (может кому-нибудь пригодится:))
    const random = () => {
        return '#' + Math.round(Math.random() * 10000)
    }
    //Рандомный ключ для рендеринга компонентов
    const randomKey = () => {
        let key = ''
        while(key.length <= 20) {
            const arr = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i']
            key += Math.round(Math.random() * 10) + arr[Math.round(Math.random() * 7)]
        }
        return key
    }
    return {random, randomKey}
}

export default useRandom