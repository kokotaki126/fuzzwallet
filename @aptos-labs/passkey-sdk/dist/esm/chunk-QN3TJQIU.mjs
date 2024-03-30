import{m as g,v as i}from"./chunk-BQSE5HHW.mjs";import{b as a,c}from"./chunk-YE3DZD6T.mjs";import{b as n}from"./chunk-IKCBGNRD.mjs";async function l(o){let{aptosConfig:e}=o,{data:t}=await n({aptosConfig:e,originMethod:"getLedgerInfo",path:""});return t}async function h(o){let{aptosConfig:e,ledgerVersion:t,options:s}=o,{data:r}=await n({aptosConfig:e,originMethod:"getBlockByVersion",path:`blocks/by_version/${t}`,params:{with_transactions:s?.withTransactions}});return r}async function m(o){let{aptosConfig:e,blockHeight:t,options:s}=o,{data:r}=await n({aptosConfig:e,originMethod:"getBlockByHeight",path:`blocks/by_height/${t}`,params:{with_transactions:s?.withTransactions}});return r}async function C(o){let{aptosConfig:e,handle:t,data:s,options:r}=o;return(await a({aptosConfig:e,originMethod:"getTableItem",path:`tables/${t}/item`,params:{ledger_version:r?.ledgerVersion},body:s})).data}async function T(o){let{aptosConfig:e,payload:t,options:s}=o,{data:r}=await a({aptosConfig:e,originMethod:"view",path:"view",params:{ledger_version:s?.ledgerVersion},body:{function:t.function,type_arguments:t.typeArguments??[],arguments:t.functionArguments??[]}});return r}async function q(o){let{aptosConfig:e,limit:t}=o;return(await p({aptosConfig:e,query:{query:g,variables:{limit:t}},originMethod:"getChainTopUserTransactions"})).user_transactions}async function p(o){let{aptosConfig:e,query:t,originMethod:s}=o,{data:r}=await c({aptosConfig:e,originMethod:s??"queryIndexer",path:"",body:t,overrides:{WITH_CREDENTIALS:!1}});return r}async function f(o){let{aptosConfig:e}=o;return(await p({aptosConfig:e,query:{query:i},originMethod:"getProcessorStatuses"})).processor_status}async function w(o){let e=await f({aptosConfig:o.aptosConfig});return BigInt(e[0].last_success_version)}async function A(o){let{aptosConfig:e,processorType:t}=o,s={processor:{_eq:t.valueOf()}};return(await p({aptosConfig:e,query:{query:i,variables:{where_condition:s}},originMethod:"getProcessorStatus"})).processor_status[0]}export{l as a,h as b,m as c,C as d,T as e,q as f,p as g,f as h,w as i,A as j};
//# sourceMappingURL=chunk-QN3TJQIU.mjs.map