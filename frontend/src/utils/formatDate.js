const formatDate = (date) => {
    let newDate = (new Date(date)).toLocaleDateString()
    newDate = newDate.split('/')
    if (newDate[0] < 10) {
        newDate[0] = `0${newDate[0]}`
    }
    if (newDate[1] < 10) {
        newDate[1] = `0${newDate[1]}`
    }
    newDate = newDate.join('/')
    return newDate
}

export default formatDate