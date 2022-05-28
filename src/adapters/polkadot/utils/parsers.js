import {DateTime} from "luxon/build/es6/luxon";

export function parseHistoryTransaction(item,toke,key){
    return {
        date: DateTime.fromSeconds(item.block_timestamp * 1000).toFormat( 'YYYY-MM-DD HH:mm'),
        transID: item.hash,
        from: item.from,
        to: item.to,
        typeTran: item.module,
        desc: '',
        amount: (item.amount / 10000000000) + ' DOT'
    }
}