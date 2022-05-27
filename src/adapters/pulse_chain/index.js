import axios from "axios";
import {BaseAdapter} from "../base";
import {parseHistoryTransaction} from "./utils/parsers";

export class PulsChainAdapter extends BaseAdapter{
    constructor(configs) {
        super(configs);
    }
    async history({token,key,data}) {
        return new Promise(async (resolve, reject) => {
            axios.get(this.configs.cache + 'https://api.solscan.io/account/transaction?address=' + key)
                .then(result => {
                    const history=result.data.data.filter(
                        element => element.parsedInstruction[0].type.toLowerCase() === 'sol-transfer'
                    ).map(item =>parseHistoryTransaction(item,token,key))
                    resolve({
                        history: history
                    })
                }).catch(function (error) {
                reject({
                    error: error
                })
            })
        })
    }
}