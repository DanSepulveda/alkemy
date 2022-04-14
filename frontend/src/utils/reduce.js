const reduce = (data, filter) => {
    const result = data.reduce((total, item) => {
        if (item.type === filter) {
            total += item.amount
        }
        return total
    }, 0)

    return result
}

export default reduce