export class BaseAdapter{
    constructor(configs) {
        this.configs=configs
    }

    getEvmData (chain) {
        return this.configs.evms.find(o => o.chain === chain)
    }


    getUniqueTokens (coins) {
        let duplicates = []

        return coins.map((el) => {
            let search = coins.filter(o => el.value.toLowerCase() === o.value.toLowerCase())
            let value = search[0]

            if (search.length !== 1 && !duplicates.includes(el.value.toLowerCase())) {
                duplicates.push(el.value.toLowerCase())
            } else if (search.length !== 1) {
                value = null
            }
            return value
        }).filter(o => o != null)
    }


    getAllCoins (dex) {
        const coins = this.getUniqueTokens(this.configs.coins).filter(o => !(this.configs.tokens.filter(x => x.chain === 'eos').map(w => w.type.toLowerCase()).includes(o.value.toLowerCase())))

        this.configs.tokens.filter(o => o.chain === 'eos' && o.type !== 'verto').forEach((coin) => {
            coin.contract = (typeof coin.contract === 'undefined' || coin.contract === 'undefined' || !coin.contract) ? 'eosio.token' : coin.contract

            let row = {
                'label': coin.type.toUpperCase(),
                'name': coin.name,
                'value': coin.type,
                'contract': coin.contract,
                'precision': coin.precision,
                'image': coin.chain === 'eos' ? 'https://defibox.oss-accelerate.aliyuncs.com/eos/' + coin.contract + '-' + coin.type.toLowerCase() + '.png' : 'https://files.coinswitch.co/public/coins/' + coin.type.toLowerCase() + '.png',
                'dex': 'coinswitch',
                'amount': parseFloat(coin.amount),
                'amountUSD': coin.usd
            }

            if (dex !== 'coinswitch' || !coins.find(c => c.value.toLowerCase() === coin.type.toLowerCase())) {
                coins.unshift(row)
            }
        })
        return coins.sort(function (a, b) {
            return a.name ? -1 : 1
        })
    }
    getTokenImage (type) {
        let token = this.getAllCoins().find((o) => o.value.toLowerCase() === type.toLowerCase())
        return token ? (type.toLowerCase() === 'eth' ? 'https://s3.amazonaws.com/token-icons/eth.png' : token.image) : 'https://etherscan.io/images/main/empty-token.png'
    }

    async history(){
        throw "Not implemented"
    }
}