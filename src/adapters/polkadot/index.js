import {BaseAdapter} from "../base";
import axios from "axios";
import {DateTime} from "luxon/build/es6/luxon";
import {parseHistoryTransaction} from "./utils/parsers";

export class PolkadotAdapter extends BaseAdapter{
    async history({token,key}) {
        return new Promise(async (resolve, reject) => {
            axios.post('https://cache.volentix.io/https://polkadot.api.subscan.io/api/scan/transfers', {
                'X-API-Key': key
            }).then(function (result) {
                if (result.length !== 0) {
                    const history=result.data.transfers.map(item => parseHistoryTransaction(item,token,key) )
                    resolve({
                        history:history
                    })
                }else{
                    resolve({
                        history:[]
                    })
                }
            }).catch(function (error) {
                reject({
                    error:error
                })
            })
        })
    }

}