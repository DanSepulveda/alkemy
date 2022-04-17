const getCategories = (transactions, type) => {
    let categories = []
    transactions.map(transaction => {
        if (!categories.includes(transaction.name) && transaction.type === type) {
            categories.push(transaction.name)
        }
    })
    return categories.sort()
}

export default getCategories