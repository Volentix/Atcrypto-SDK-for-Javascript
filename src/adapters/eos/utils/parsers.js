import {getTransactionDirection} from "../../../utils";

export function parseHistoryTransaction(item,token,key){
    // //console.log('split', a.action_trace.act.name === 'transfer' ? a.action_trace.act.data.quantity.toString().split(' ')[1].toLowerCase() : 'not transfer')
    if (token === 'eos' && (
        item.action_trace.act.name === 'transfer' &&
        item.action_trace.receiver === key && typeof item.action_trace.act.data.from !== 'undefined' && typeof item.action_trace.act.data.to !== 'undefined')) {
        // //console.log('walletlib history actions', a)

        let amount = ''
        switch (item.action_trace.act.name) {
            case 'transfer':
                amount = item.action_trace.act.data.to !== key ? '-' + item.action_trace.act.data.quantity : item.action_trace.act.data.quantity
                break
            case 'deposit':
                amount = item.action_trace.act.data.to !== key ? '-' + item.action_trace.act.data.amount : item.action_trace.act.data.amount
                break
            case 'rentcpu':
                amount = item.action_trace.act.data.to !== key ? '-' + item.action_trace.act.data.loan_payment : item.action_trace.act.data.loan_payment
                break
        }

        let transaction = {}

        let date = new Date(item.block_time)
        transaction.timeStamp = date.getTime() / 1000
        transaction.chain = token
        transaction.friendlyHash = item.action_trace.trx_id.substring(0, 6) + '...' + item.action_trace.trx_id.substr(item.action_trace.trx_id.length - 5)
        transaction.to = transaction.friendlyTo = item.action_trace.act.data.to
        transaction.hash = item.action_trace.trx_id
        transaction.explorerLink = 'https://bloks.io/transaction/' + transaction.hash
        transaction.from = transaction.friendlyFrom = item.action_trace.act.data.from
        transaction.time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        transaction.image = self.getTokenImage(amount.split(' ')[1])
        transaction.amount = amount.split(' ')[0]
        transaction.memo = item.action_trace.act.data.memo
        transaction.symbol = amount.split(' ')[1]
        transaction.direction = getTransactionDirection(transaction.from, transaction.to, key)
        transaction.dateFormatted = date.toISOString().split('T')[0]
        transaction.amountFriendly = parseFloat(Math.abs(transaction.amount)).toFixed(6)
        return transaction
    }
}