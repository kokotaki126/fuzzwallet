import{b as c}from"./chunk-F7CR75CJ.mjs";import{f as e}from"./chunk-T7U4YWE7.mjs";import{d as r}from"./chunk-YE3DZD6T.mjs";import{e as s}from"./chunk-HHJBCGAQ.mjs";async function x(a){let{aptosConfig:t,accountAddress:i,amount:p,options:n}=a,u=n?.timeoutSecs||s,{data:d}=await r({aptosConfig:t,path:"fund",body:{address:c.from(i).toString(),amount:p},originMethod:"fundAccount"}),m=d.txn_hashes[0],o=await e({aptosConfig:t,transactionHash:m,options:{timeoutSecs:u,checkSuccess:n?.checkSuccess}});if(o.type==="user_transaction")return o;throw new Error(`Unexpected transaction received for fund account: ${o.type}`)}export{x as a};
//# sourceMappingURL=chunk-PD5I66D6.mjs.map