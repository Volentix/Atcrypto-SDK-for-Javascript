import axios from "axios";
import {BaseAdapter} from "../base";

export class SolScanAdapter extends BaseAdapter{
    constructor(configs) {
        super(configs);
    }
    async history() {
        console.log("Solscan Adapter History")
    }
}