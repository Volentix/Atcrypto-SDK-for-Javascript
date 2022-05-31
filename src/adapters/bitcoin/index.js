import {BaseAdapter} from "../base";
import axios from "axios";
import {getTransactionDirection} from "../../utils";
import {parseHistoryTransaction} from "./utils/parsers";

export class BitcoinAdapter extends BaseAdapter {
    async history({chain,token, key, evmData}) {
        return new Promise(async (resolve, reject) => {
            axios
                .get(
                    this.configs.cache +
                    // 'https://chain.api.btc.com/v3/address/' + key + '/tx'
                    'https://api.blockchain.info/haskoin-store/btc/address/' + key + '/transactions/full?limit=100&offset=0'
                )
                .then(res => {
                    if (res.data) {
                        const history = res.data.filter(
                            element => element.inputs && element.outputs
                        ).map((item) => parseHistoryTransaction(item, token, key))
                        resolve({
                            history: history
                        })
                    }
                }).catch(error => {
                reject({
                    error: error
                })
            })
        })
    }
}