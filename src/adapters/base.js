export class BaseAdapter{
    constructor(configs) {
        this.configs=configs
    }
    async history(){
        throw "Not implemented"
    }
}