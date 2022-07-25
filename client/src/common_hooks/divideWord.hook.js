const useWord = () => {
    //Кастомный хук для уменьшения текста
    const divideWord = (word = '', num) => {
        let result = word.substring(0, num)
        if(word.length > num) {
            result += '...'
        }
        return result
    }
    const divideFilename = (filename = '', l = 6) => {
        let string = filename.split('.')[0]
        let ext = filename.split('.')[1]
        let result = string.substring(0, l)
        if(string.length > l) {
            result += '...'
            result += ext
        }
        return result
    }
    const firstLetter = (word = 'q') => {
        const firstLetter = word[0]
        word[0] = firstLetter.toUpperCase()
        return word
    }
    return {divideWord, divideFilename, firstLetter}
}

export default useWord


