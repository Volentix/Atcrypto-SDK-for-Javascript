import {BaseAdapter} from "../base";
import axios from "axios";
import {parseHistoryTransaction} from "./utils/parsers";

export class KusamaAdapter extends BaseAdapter{
    async history() {
        return new Promise(async  (resolve,reject)=>{
            axios.post(this.configs.cache + 'https://kusama.api.subscan.io/api/scan/transfers', {
                'X-API-Key': key
            }).then(result=>{
                if (result.length !== 0) {
                    const history=result.data.transfers.map(item => parseHistoryTransaction(item))
                    resolve({
                        history:history
                    })
                }else {
                    resolve({
                        history:[]
                    })
                }
            }).catch(error=>{
                reject({
                    error:error
                })
            })
        })
    }
}