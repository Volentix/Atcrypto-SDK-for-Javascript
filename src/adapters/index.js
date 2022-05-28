import {PulsChainAdapter} from "./pulse_chain";
import {SolScanAdapter} from "./solscan";
import {BinanceSmartChainAdapter} from "./binance_smart_chain";
import {PolygonAdapter} from "./polygon";
import {FantomAdapter} from "./fantom";
import {AvalancheAdapter} from "./avalanche";
import {EthereumAdapter} from "./ethereum";
import {BitcoinAdapter} from "./bitcoin";
import {PolkadotAdapter} from "./polkadot";
import {KusamaAdapter} from "./kusama";
import {EosAdapter} from "./eos";

const CHAIN_ADAPTERS={
    tpls:{
        name:"PulseChain",
        adapter:PulsChainAdapter
    },
    sol:{
        name:"solscan",
        adapter:SolScanAdapter
    },
    eos:{
        name:"Eos",
        adapter:EosAdapter
    },
    bsc:{
        name:"Binance Smart Chain",
        adapter:BinanceSmartChainAdapter
    },
    matic:{
        name:"Polygon",
        adapter:PolygonAdapter
    },
    ftm:{
        name:"Fantom",
        adapter:FantomAdapter
    },
    avaxc:{
        name:"Avalanche C-Chain",
        adapter:AvalancheAdapter
    },
    eth:{
        name:"Ethereum",
        adapter:EthereumAdapter
    },
    btc:{
        name:"Bitcoin",
        adapter:BitcoinAdapter
    },
    dot:{
        name:"Polkadot",
        adapter:PolkadotAdapter
    },
    ksm:{
        name:"kusama",
        adapter:KusamaAdapter
    }

}

export function adapterFactory(chain) {
    const chainInfo=CHAIN_ADAPTERS[chain]
    if (chainInfo){
        return new chainInfo.adapter()
    }
}