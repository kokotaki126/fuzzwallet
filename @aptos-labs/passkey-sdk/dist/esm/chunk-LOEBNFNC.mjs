import{a as o,b as s,c as t,d as r,e as n,f as i,g as a,i as g,j as c}from"./chunk-QN3TJQIU.mjs";var u=class{constructor(e){this.config=e}async getLedgerInfo(){return o({aptosConfig:this.config})}async getChainId(){return(await this.getLedgerInfo()).chain_id}async getBlockByVersion(e){return s({aptosConfig:this.config,...e})}async getBlockByHeight(e){return t({aptosConfig:this.config,...e})}async getTableItem(e){return r({aptosConfig:this.config,...e})}async view(e){return n({aptosConfig:this.config,...e})}async getChainTopUserTransactions(e){return i({aptosConfig:this.config,...e})}async queryIndexer(e){return a({aptosConfig:this.config,...e})}async getIndexerLastSuccessVersion(){return g({aptosConfig:this.config})}async getProcessorStatus(e){return c({aptosConfig:this.config,processorType:e})}};export{u as a};
//# sourceMappingURL=chunk-LOEBNFNC.mjs.map