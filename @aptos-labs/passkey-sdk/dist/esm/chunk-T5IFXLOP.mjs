import{a as d}from"./chunk-6FBKUTGF.mjs";import{a as R}from"./chunk-3UYBNX3P.mjs";var l={400:"Bad Request",401:"Unauthorized",403:"Forbidden",404:"Not Found",429:"Too Many Requests",500:"Internal Server Error",502:"Bad Gateway",503:"Service Unavailable"};async function c(o,a){let{url:r,method:i,body:u,contentType:s,params:e,overrides:t}=o,n={...t?.HEADERS,"x-aptos-client":`aptos-typescript-sdk/${R}`,"content-type":s??"application/json"};return t?.AUTH_TOKEN&&r.includes("faucet")&&(n.Authorization=`Bearer ${t?.AUTH_TOKEN}`),t?.API_KEY&&!r.includes("faucet")&&(n.Authorization=`Bearer ${t?.API_KEY}`),a.provider({url:r,method:i,body:u,params:e,headers:n,overrides:t})}async function T(o,a){let{url:r,path:i}=o,u=i?`${r}/${i}`:r,s=await c({...o,url:u},a.client),e={status:s.status,statusText:s.statusText,data:s.data,headers:s.headers,config:s.config,request:s.request,url:u};if(a.isIndexerRequest(r)){let n=e.data;if(n.errors)throw new d(o,e,`Indexer error: ${n.errors[0].message}`??`Indexer unhandled Error ${s.status} : ${s.statusText}`);e.data=n.data}if(e.status>=200&&e.status<300)return e;let t;throw e&&e.data&&"message"in e.data&&"error_code"in e.data?t=JSON.stringify(e.data):e.status in l?t=l[e.status]:t=`Unhandled Error ${e.status} : ${e.statusText}`,new d(o,e,`${a.isFullnodeRequest(r)?"Fullnode":"Faucet"} error: ${t}`)}export{c as a,T as b};
//# sourceMappingURL=chunk-T5IFXLOP.mjs.map