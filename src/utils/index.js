export function getTransactionDirection (from, to, nameOrKey) {
    let direction = 'incoming'

    if (nameOrKey === from) {
        direction = 'outgoing'
    }

    return direction
}

export function getTokenImage (type) {
    // let token = this.getAllCoins().find((o) => o.value.toLowerCase() === type.toLowerCase())
    return token ? (type.toLowerCase() === 'eth' ? 'https://s3.amazonaws.com/token-icons/eth.png' : token.image) : 'https://etherscan.io/images/main/empty-token.png'
}