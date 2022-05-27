import {BaseAdapter} from "../base";
import axios from "axios";

export class EosAdapter extends BaseAdapter{
    async history({token,key,data}) {
        return new Promise(async (resolve, reject) => {
            let actions = []
            axios.post(this.configs.cache + this.configs.eosHistoryApi + '/v1/history/get_actions', {
                'account_name': key,
                pos: data.position,
                offset: data.offset
            })
                .then(function (result) {
                    if (result.length !== 0) {
                        result.data.actions.reverse().map(a => {
                            // //console.log('split', a.action_trace.act.name === 'transfer' ? a.action_trace.act.data.quantity.toString().split(' ')[1].toLowerCase() : 'not transfer')
                            if (token === 'eos' && (
                                a.action_trace.act.name === 'transfer' &&
                                a.action_trace.receiver === key && typeof a.action_trace.act.data.from !== 'undefined' && typeof a.action_trace.act.data.to !== 'undefined')) {
                                // //console.log('walletlib history actions', a)

                                let amount = ''
                                switch (a.action_trace.act.name) {
                                    case 'transfer':
                                        amount = a.action_trace.act.data.to !== key ? '-' + a.action_trace.act.data.quantity : a.action_trace.act.data.quantity
                                        break
                                    case 'deposit':
                                        amount = a.action_trace.act.data.to !== key ? '-' + a.action_trace.act.data.amount : a.action_trace.act.data.amount
                                        break
                                    case 'rentcpu':
                                        amount = a.action_trace.act.data.to !== key ? '-' + a.action_trace.act.data.loan_payment : a.action_trace.act.data.loan_payment
                                        break
                                }

                                let tx = {}

                                let date = new Date(a.block_time)
                                tx.timeStamp = date.getTime() / 1000
                                tx.chain = token
                                tx.friendlyHash = a.action_trace.trx_id.substring(0, 6) + '...' + a.action_trace.trx_id.substr(a.action_trace.trx_id.length - 5)
                                tx.to = tx.friendlyTo = a.action_trace.act.data.to
                                tx.hash = a.action_trace.trx_id
                                tx.explorerLink = 'https://bloks.io/transaction/' + tx.hash
                                tx.from = tx.friendlyFrom = a.action_trace.act.data.from
                                tx.time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                                tx.image = self.getTokenImage(amount.split(' ')[1])
                                tx.amount = amount.split(' ')[0]
                                tx.memo = a.action_trace.act.data.memo
                                tx.symbol = amount.split(' ')[1]
                                tx.direction = self.getTransactionDirection(tx.from, tx.to, key)
                                tx.dateFormatted = date.toISOString().split('T')[0]
                                tx.amountFriendly = parseFloat(Math.abs(tx.amount)).toFixed(6)

                                actions.push(tx)
                            }
                        })
                        resolve({
                            history: actions
                        })
                    }else{
                        resolve({
                            history:[]
                        })
                    }
                }).catch(function (error) {
                reject({
                    error: error
                })
            })
        })
    }
}