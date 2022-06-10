const useFileSize = () => {
    //Кастомный хук для размера файла
    const fileSize = (fileSize) => {
        if(fileSize > 1000) {
            fileSize =  fileSize / 1000 
            fileSize = Math.floor(fileSize)
            return fileSize += 'Kb'
        } else if(fileSize > 1000000) {
            fileSize = fileSize / 1000000
            fileSize = Math.floor(fileSize)
            return fileSize += 'Mb'
        } else if(fileSize > 1000000000) {
            fileSize = fileSize / 1000000000
            fileSize = Math.floor(fileSize)
            return fileSize += 'Gb'
        } else {
            return fileSize + 'b'
        }
    }

    return {fileSize}
}

export default useFileSize