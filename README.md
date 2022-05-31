# ATCrypto SDK for Javascript

## How to install
if you want to test it locally by cloning from github once you have cloned it run

    npm install
    npm run build
    npm link
then go to the directory or project you want to test in run following command

    npm link atcrypto

then you can import it like this

    const  atcrypto=require("atcrypto")
    const atcryptoConfig = new  atcrypto.ATCryptoConfig({})
    const  atcryptoInstance = new  atcrypto.ATCrypto(atcryptoConfig)


### ATCryptoConfig Class
this class contains all of configs that are required currently from `store` or from `process.env[store.state.settings.network]`
#### Following are config object parameters that can be sent to `ATCryptoConfig `

    {
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
	}
in current lib class these values maps to
| ATCryptoConfig config parameter | current value in verto |
|--|--|
| cache | process.env[store.state.settings.network].CACHE |
| chainId |  |
| eosHistoryApi | process.env[store.state.settings.network].EOS_HISTORYAPI|
| demuxApi | process.env[store.state.settings.network].DEMUX_API|
| coinSwitvhApiKey | process.env[store.state.settings.network].COINSWITCH_APIKEY|
| eosTransactionExplorer | process.env[store.state.settings.network].EOS_TRANSACTION_EXPLORER|
| ethTransactionExplorer | process.env[store.state.settings.network].ETH_TRANSACTION_EXPLORER|
| evmTokens | store.state.tokens.evmTokens |
| evms | refer to array of evms that we have in constructor of of `Lib` class you can pass them as array |
| coins | store.state.settings.coins.godex.concat(store.state.settings.coins.oneinch).concat(store.state.settings.coins.defibox) |
| tokens | store.state.wallets.tokens |

### How to use SDK Instance
currently only history method is supported and and use can use like this

    const  atcrypto=require("atcrypto")
    ....
    const  atcryptoInstance = new  atcrypto.ATCrypto(atcryptoConfig)
    atcryptoInstance.history(chain, key, token, data=null)


