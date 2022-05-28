import {getTransactionDirection} from "../../../utils";

export function parseHistoryTransaction(item,token,key) {
    let transaction = {}

    let date = new Date(item.time)
    transaction.timeStamp = item.time
    // TO DO - LIST through all outputs and save them as separate transactions when key === spender
    // if (tx) return

    let spender = item.inputs[0].address
    let receiver = item.outputs[0].address
    transaction.chain = token
    transaction.friendlyHash = item.txid.substring(0, 6) + '...' + item.txid.substr(item.txid.length - 5)

    transaction.to = receiver
    transaction.amount = spender !== key ? item.outputs.find(o => o.address === key).value / 100000000 : item.outputs[0].value / 100000000
    transaction.symbol = token.toUpperCase()
    transaction.image = 'https://files.coinswitch.co/public/coins/btc.png'

    transaction.hash = item.txid
    transaction.explorerLink = 'https://www.blockchain.com/btc/block/' + transaction.txid
    transaction.from = spender
    transaction.friendlyTo = transaction.to.length ? transaction.to.substring(0, 6) + '...' + transaction.to.substr(transaction.to.length - 5) : ''
    transaction.friendlyFrom = transaction.from.substring(0, 6) + '...' + transaction.from.substr(transaction.from.length - 5)
    transaction.time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    transaction.direction = getTransactionDirection(transaction.from, transaction.to, key)
    transaction.dateFormatted = date.toISOString().split('T')[0]
    transaction.amountFriendly = parseFloat(Math.abs(transaction.amount)).toFixed(6)
    transaction.active = false
    transaction.gasTotal = transaction.fee
    transaction.dateFormatted = date.toISOString().split('T')[0]
    transaction.amountFriendly = parseFloat(transaction.amount).toFixed(6)

    return transaction
}