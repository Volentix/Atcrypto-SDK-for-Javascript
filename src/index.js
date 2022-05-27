import {adapterFactory} from "./adapters";

class ATCryptoConfig {
    constructor({
                    cache,
                    chainId,
                    eosHistoryApi,
                    demuxApi,
                    coinSwitvhApiKey,
                    eEosTransactionExplorer,
                    ethTransactionExplorer
                }) {
        this.cache = cache
        this.chainId = chainId
        this.eosHistoryApi = eosHistoryApi
        this.demuxApi = demuxApi
        this.coinSwitvhApiKey = coinSwitvhApiKey
        this.eosTransactionExplorer = eEosTransactionExplorer
        this.ethTransactionExplorer = ethTransactionExplorer
    }


}


export class ATCrypto {
    constructor() {
        console.log("hello")
    }

    async history(chain, key, token, data = null){
        const adapter=adapterFactory(chain)
        return adapter.history()
    }
}