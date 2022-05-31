import Web3 from "web3";

export function parseHistoryTransaction(item,token,key,evmData,chain,configs){
    let transaction = {}

    let date = new Date(item.block_signed_at)
    transaction.timeStamp = date.getTime() / 1000
    transaction.chain = token
    transaction.friendlyHash = item.tx_hash.substring(0, 6) + '...' + item.tx_hash.substr(item.tx_hash.length - 5)
    let decodedBlock = null
    if (item.log_events && item.value === '0') {
        decodedBlock = item.log_events.find(element => element.decoded && element.decoded.name === 'Transfer')
        if (decodedBlock) {
            transaction.to = decodedBlock.decoded.params.find(o => o.name === 'to').value
            transaction.amount = decodedBlock.decoded.params.find(o => o.name === 'value').value
            transaction.amount = Web3.utils.fromWei(transaction.amount.toString(), 'ether')
            transaction.symbol = 'N/A'
            transaction.image = ''
            if (configs.evmTokens[chain]) {
                let foundToken = configs.evmTokens[chain].find(o => o.address === item.to_address)
                transaction.symbol = foundToken ? foundToken.symbol : transaction.symbol
                transaction.image = foundToken ? foundToken.logoURI : transaction.image
            }
        }
    }
    if (!decodedBlock) {
        transaction.to = item.to_address
        transaction.amount = Web3.utils.fromWei(item.value.toString(), 'ether')
        transaction.symbol = evmData.nativeToken.toUpperCase()
        transaction.image = evmData.icon
    }
    transaction.hash = item.tx_hash
    transaction.explorerLink = evmData.explorer + '/' + transaction.hash
    transaction.from = item.from_address
    transaction.friendlyTo = transaction.to.length ? transaction.to.substring(0, 6) + '...' + transaction.to.substr(transaction.to.length - 5) : ''
    transaction.friendlyFrom = transaction.from.substring(0, 6) + '...' + transaction.from.substr(transaction.from.length - 5)
    transaction.time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })


    transaction.direction = self.getTransactionDirection(transaction.from, transaction.to, key)
    transaction.dateFormatted = date.toISOString().split('T')[0]
    transaction.amountFriendly = parseFloat(Math.abs(transaction.amount)).toFixed(6)
    transaction.active = false
    transaction.gasTotal = transaction.gas_spent
    transaction.dateFormatted = date.toISOString().split('T')[0]
    transaction.amountFriendly = parseFloat(transaction.amount).toFixed(6)
    return transaction
}