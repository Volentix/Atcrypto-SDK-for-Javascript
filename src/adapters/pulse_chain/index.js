import axios from "axios";
import {BaseAdapter} from "../base";

export class PulsChainAdapter extends BaseAdapter{
    constructor(configs) {
        super(configs);
    }
    async history() {
        console.log("PulseChain Adapter History")
    }
}