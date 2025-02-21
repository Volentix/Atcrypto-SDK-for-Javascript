import {BaseAdapter} from "../base";
import axios from "axios";
import {parseHistoryTransaction} from "./utils/parsers";


export class EthereumAdapter extends BaseAdapter{
    async history({chain,token,key,evm}){
        return new Promise(async (resolve, reject) => {
            const evmData = this.configs.getEvmData(token)
            axios
                .get(
                    this.configs.cache +
                    'https://api.covalenthq.com/v1/' + evmData.network_id +
                    '/address/' + key + '/transactions_v2/',
                    { auth: { username: 'ckey_a9e6f6ab90584877b86b151eef3' } }
                )
                .then(res => {
                    if (res.data.data.items) {
                        const history = res.data.data.items.filter(
                            element => element.successful
                        ).map((item) => parseHistoryTransaction(item,token,key,evmData,chain,this.configs))
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