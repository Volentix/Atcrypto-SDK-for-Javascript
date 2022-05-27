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


module.exports= class ATCrypto {
    constructor() {
        console.log("hello")
    }

    async history(chain, key, token, data = null){
        // console.log("Hello")
        const adapter=adapterFactory(chain)
        adapter.history()
    }
}