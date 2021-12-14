export const formatDate = (str) => {
    const ele = str.split('-')
    const newStr = ele.reverse().join('-')

    return newStr
}