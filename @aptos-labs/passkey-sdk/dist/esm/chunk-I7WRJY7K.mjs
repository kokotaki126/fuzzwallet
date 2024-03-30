import{a as p,b as g,c as h}from"./chunk-V6JFR2CB.mjs";import{e as d,j as m}from"./chunk-LR65XHSF.mjs";import{b as s}from"./chunk-NL72WE3E.mjs";import{sha3_256 as f}from"@noble/hashes/sha3";import{secp256k1 as o}from"@noble/curves/secp256k1";import{HDKey as H}from"@scure/bip32";var i=class i extends p{constructor(e){super();let t=s.fromHexInput(e);if(t.toUint8Array().length!==i.LENGTH)throw new Error(`PublicKey length should be ${i.LENGTH}`);this.key=t}toUint8Array(){return this.key.toUint8Array()}toString(){return this.key.toString()}verifySignature(e){let{message:t,signature:a}=e,y=s.fromHexInput(t).toUint8Array(),v=f(y),x=a.toUint8Array();return o.verify(x,v,this.toUint8Array())}serialize(e){e.serializeBytes(this.key.toUint8Array())}static deserialize(e){let t=e.deserializeBytes();return new i(t)}static load(e){let t=e.deserializeBytes();return new i(t)}static isPublicKey(e){return e instanceof i}};i.LENGTH=65;var u=i,r=class r extends g{constructor(e){super();let t=s.fromHexInput(e);if(t.toUint8Array().length!==r.LENGTH)throw new Error(`PrivateKey length should be ${r.LENGTH}`);this.key=t}toUint8Array(){return this.key.toUint8Array()}toString(){return this.key.toString()}sign(e){let t=s.fromHexInput(e),a=f(t.toUint8Array()),y=o.sign(a,this.key.toUint8Array());return new c(y.toCompactRawBytes())}serialize(e){e.serializeBytes(this.toUint8Array())}static deserialize(e){let t=e.deserializeBytes();return new r(t)}static generate(){let e=o.utils.randomPrivateKey();return new r(e)}publicKey(){let e=o.getPublicKey(this.key.toUint8Array(),!1);return new u(e)}static fromDerivationPath(e,t){if(!d(e))throw new Error(`Invalid derivation path ${e}`);return r.fromDerivationPathInner(e,m(t))}static fromDerivationPathInner(e,t){let{privateKey:a}=H.fromMasterSeed(t).derive(e);if(a===null)throw new Error("Invalid key");return new r(a)}static isPrivateKey(e){return e instanceof r}};r.LENGTH=32;var S=r,n=class n extends h{constructor(e){super();let t=s.fromHexInput(e);if(t.toUint8Array().length!==n.LENGTH)throw new Error(`Signature length should be ${n.LENGTH}, recieved ${t.toUint8Array().length}`);this.data=t}toUint8Array(){return this.data.toUint8Array()}toString(){return this.data.toString()}serialize(e){e.serializeBytes(this.data.toUint8Array())}static deserialize(e){let t=e.deserializeBytes();return new n(t)}static load(e){let t=e.deserializeBytes();return new n(t)}static isSignature(e){return e instanceof n}};n.LENGTH=64;var c=n;export{u as a,S as b,c};
//# sourceMappingURL=chunk-I7WRJY7K.mjs.map