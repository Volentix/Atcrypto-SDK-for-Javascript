import {adapterFactory} from "./adapters";

export class ATCryptoConfig {
    constructor({
                    cache,
                    chainId,
                    eosHistoryApi,
                    demuxApi,
                    coinSwitvhApiKey,
                    eosTransactionExplorer,
                    ethTransactionExplorer,
                    evmTokens={},
                    evms=[],
                    coins=[],
                    tokens=[]
                }) {
        this.cache = cache
        this.chainId = chainId
        this.eosHistoryApi = eosHistoryApi
        this.demuxApi = demuxApi
        this.coinSwitvhApiKey = coinSwitvhApiKey
        this.eosTransactionExplorer = eosTransactionExplorer
        this.ethTransactionExplorer = ethTransactionExplorer
        this.evmTokens=evmTokens
        this.evms=evms
        this.coins=coins
        this.tokens=tokens
    }


}


export class ATCrypto {
    constructor(configs) {
        this.configs=configs
    }

    async history(chain, key, token, data = null){
        const adapter=adapterFactory(chain,this.configs)
        return adapter.history({
            chain:chain,
            key:key,
            token:token,
            data:data
        })
    }
}