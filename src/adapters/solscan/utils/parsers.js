import {getTransactionDirection} from "../../../utils";

export function parseHistoryTransaction(item, token, key) {
    let transaction = {}
    let date = new Date(a.blockTime * 1000)
    transaction.timeStamp = date.getTime() / 1000
    transaction.chain = token
    transaction.friendlyHash = item.txHash.substring(0, 6) + '...' + item.txHash.substr(item.txHash.length - 5)
    transaction.to = transaction.friendlyTo = item.parsedInstruction[0].programId
    transaction.hash = item.txHash
    transaction.explorerLink = 'https://solscan.io/tx/' + transaction.hash
    transaction.from = item.signer[0]
    transaction.time = date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
    transaction.image = 'https://solana.com/branding/new/exchange/exchange-black.png' // self.getTokenImage(amount.split(' ')[1])
    transaction.amount = item.slot * 0.000000001
    transaction.symbol = 'SOL'
    transaction.direction = getTransactionDirection(item.signer[0], item.parsedInstruction[0].programId, key)
    transaction.dateFormatted = date.toISOString().split('T')[0]
    transaction.amountFriendly = parseFloat(Math.abs(transaction.amount)).toFixed(6)
}