import{b as n}from"./chunk-HHJBCGAQ.mjs";import{a as t,b as r,c as o}from"./chunk-77SKA4HT.mjs";import s from"@aptos-labs/aptos-client";var i=class{constructor(e){this.network=e?.network??n,this.fullnode=e?.fullnode,this.faucet=e?.faucet,this.indexer=e?.indexer,this.client=e?.client??{provider:s},this.clientConfig=e?.clientConfig??{}}getRequestUrl(e){switch(e){case 0:if(this.fullnode!==void 0)return this.fullnode;if(this.network==="custom")throw new Error("Please provide a custom full node url");return r[this.network];case 2:if(this.faucet!==void 0)return this.faucet;if(this.network==="custom")throw new Error("Please provide a custom faucet url");return o[this.network];case 1:if(this.indexer!==void 0)return this.indexer;if(this.network==="custom")throw new Error("Please provide a custom indexer url");return t[this.network];default:throw Error(`apiType ${e} is not supported`)}}isIndexerRequest(e){return t[this.network]===e}isFullnodeRequest(e){return r[this.network]===e}isFaucetRequest(e){return o[this.network]===e}};export{i as a};
//# sourceMappingURL=chunk-CCUD52OF.mjs.map