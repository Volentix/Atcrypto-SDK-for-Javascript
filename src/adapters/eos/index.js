import {BaseAdapter} from "../base";
import axios from "axios";
import {getTransactionDirection} from "../../utils";
import {parseHistoryTransaction} from "./utils/parsers";

export class EosAdapter extends BaseAdapter{
    async history({token,key,data}) {
        return new Promise(async (resolve, reject) => {
            axios.post(this.configs.cache + this.configs.eosHistoryApi + '/v1/history/get_actions', {
                'account_name': key,
                pos: data.position,
                offset: data.offset
            })
                .then(result=> {
                    if (result.length !== 0) {
                        const history=result.data.actions.reverse().map(item => parseHistoryTransaction(item,token,key))
                        resolve({
                            history: history
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